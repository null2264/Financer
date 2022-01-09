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

        /*
        // Database creation example
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("db_tab3")).result;
        let db: SQLiteDBConnection
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_tab3");
        } else {
            db = await sqlite.createConnection("db_tab3", false, "no-encryption", 1);
        }
        await db.open();
        const query = `
        CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL
        );
        `
        const res = await db.execute(query);
        if(res.changes && res.changes.changes && res.changes.changes < 0) {
            throw new Error(`Error: execute failed`);
        }
        await sqlite.closeConnection("db_tab3");
        */

        router.isReady().then(() => {
            app.mount("#app");
        });
    }
    catch (e) {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`)
    }
});