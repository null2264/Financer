<template>
    <AppLayout>
        <router-view/>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { defineComponent, getCurrentInstance, onMounted } from "vue";
import { useSQLite } from "vue-sqlite-hook";

export default {
    name: "App",
    components: { AppLayout },
    setup() {
        const app = getCurrentInstance();
        const isModalOpen = app?.appContext.config.globalProperties.$isModalOpen;
        const contentMessage = app?.appContext.config.globalProperties.$messageContent;
        const jsonListeners = app?.appContext.config.globalProperties.$isJsonListeners;

        const onProgressImport = async (progress) => {
            if(jsonListeners.jsonListeners.value) {
                if(!isModalOpen.isModal.value) isModalOpen.setIsModal(true);
                contentMessage.setMessage(
                  contentMessage.message.value.concat(`${progress}\n`)
                );
            }
        }
        const onProgressExport = async (progress) => {
            if(jsonListeners.jsonListeners.value) {
                if(!isModalOpen.isModal.value) isModalOpen.setIsModal(true);
                contentMessage.setMessage(
                    contentMessage.message.value.concat(`${progress}\n`)
                );
            }
        }

        if( app != null) { 
            // !!!!! if you do not want to use the progress events !!!!!
            // since vue-sqlite-hook 2.1.1
            // app.appContext.config.globalProperties.$sqlite = useSQLite()
            // before
            // app.appContext.config.globalProperties.$sqlite = useSQLite({})
            // !!!!!                                               !!!!!
            app.appContext.config.globalProperties.$sqlite = useSQLite({
                onProgressImport,
                onProgressExport
            });
        }

        onMounted(async () => {
            const sqlite = app.appContext.config.globalProperties.$sqlite

            const ret = await sqlite.checkConnectionsConsistency();
            const isConn = (await sqlite.isConnection("database")).result;

            let db
            if (ret.result && isConn) {
                db = await sqlite.retrieveConnection("database");
            } else {
                db = await sqlite.createConnection("database", false, "no-encryption", 1);
            }
            await db.open();

            app?.appContext.config.globalProperties.$existingConn.setExistConn(true);
        })
        return;
    }
};
</script>

<style lang="scss">
@import url("static/scss/app.scss");

* {
    -webkit-tap-highlight-color: transparent;
}

body {
    margin: 0;
}

body, html, #app {
    height: 100%;
}

#app {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.swal2-popup {
    font-family: "Roboto", Helvetica, Arial, sans-serif!important;
}

.btn {
    text-decoration: none;
    font-size: 1rem;
    border: 0px;
}

.btn.btn-fill {
    color: white;
    background-color: #3EC487;
    padding: 8px 50px;
    border-radius: 50px;
    font-size: 1.2rem;
}

.btn.btn-subtle {
    color: #3EC487 !important;
    background-color: transparent !important;
}

input[type="text" i], input[type="password" i] {
    color: #7E7B72;
    height: 1.7rem;
    border-radius: 7px;
    border-color: #BEBCB0;
    border-width: 1px;
    box-shadow: none;
    padding-inline: 8px;
}
</style>
