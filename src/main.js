// local
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AppLayout from "./layouts/AppLayout";

// packages
import { createApp } from "vue";
import VueFeather from "vue-feather";
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";
import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useState } from "@/composables/state";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

applyPolyfills().then(() => {
    jeepSqlite(window);
});

window.addEventListener("DOMContentLoaded", async () => {
    const platform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite)

    const app = createApp(App)
        .use(store)
        .use(router)
        .component("AppLayout", AppLayout)
        .component(VueFeather.name, VueFeather)
        .use(VueSweetalert2);

    /* SQLite Global Variables*/

    // Only if you want to use the onProgressImport/Export events
    const [jsonListeners, setJsonListeners] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [message, setMessage] = useState("");
    app.config.globalProperties.$isModalOpen = {isModal: isModal, setIsModal: setIsModal};
    app.config.globalProperties.$isJsonListeners = {jsonListeners: jsonListeners, setJsonListeners: setJsonListeners};
    app.config.globalProperties.$messageContent = {message: message, setMessage: setMessage};

    //  Existing Connections Store
    const [existConn, setExistConn] = useState(false);
    app.config.globalProperties.$existingConn = {existConn: existConn, setExistConn: setExistConn};

    try {
        if(platform === "web") {
            // Create the "jeep-sqlite" Stencil component
            const jeepSqlite = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepSqlite);
            await customElements.whenDefined("jeep-sqlite");
            // Initialize the Web store
            await sqlite.initWebStore();
        }

        // Init the database
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("database")).result;
        let db
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("database");
        } else {
            db = await sqlite.createConnection("database", false, "no-encryption", 1);
        }
        await db.open();

        // Meta table
        // - version: Keep track of db version (incase the db structure changed in the future)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS financer (
                version TEXT NOT NULL UNIQUE
            );
        `);

        const res = await db.query("SELECT * FROM financer;");

        if (!res.values.length) {
            console.log("Welcome to Financer!");
            await db.execute(`
                INSERT OR IGNORE INTO financer (version)
                VALUES ('0.0.0');
            `);
        } else {
            console.log("Welcome back!");
            /*
             TODO: Do migration check
             - If version doesn't matched check if there's migration script
               - If migration script exists, try running it
               - Else do nothing
             - Edit meta table's version to match current version
            */
        }

        // Assuming there's no migration needed
        await db.execute(`
            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER NOT NULL PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NUT NULL
            );
        `);

        await sqlite.closeConnection("database");

        router.isReady().then(() => {
            app.mount("#app");
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`)
    }
});
