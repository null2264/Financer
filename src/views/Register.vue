<template>
    <div class="register">
        <form class="form" @submit.prevent="doRegister">
            <div class="formChild">
                <span>Username</span>
                <input type="text" v-model="username" name="username" class="username"/>
            </div>

            <div id="buttons" class="formChild">
                <button class="btn btn-fill">Create new Profile</button>
            </div>
        </form>
    </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
    name: "Register",
    data() {
        return {
            username: "",
        }
    },
    setup() {
        const app = getCurrentInstance();
        const sqlite = app?.appContext.config.globalProperties.$sqlite;

        return { sqlite };
    },
    methods: {
        async doRegister(e) {
            if (!this.username)
                return this.$swal("Oops!", "<b>Username</b> can't be empty!", "error");

            const sqlite = this.sqlite;

            const ret = await sqlite.checkConnectionsConsistency();
            const isConn = (await sqlite.isConnection("database")).result;

            let db
            if (ret.result && isConn) {
                db = await sqlite.retrieveConnection("database");
            } else {
                db = await sqlite.createConnection("database", false, "no-encryption", 1);
            }
            await db.open();

            console.log([this.username, this.password]);
            try {
                await db.run("INSERT INTO profile (username) VALUES (?);", [this.username]);
                this.$swal("Registered", `Profile named '${this.username}' has been created`, "success");
            }
            catch (e) {
                console.log(e);
                this.$swal("Oops!", `<b>Profile</b> named '${this.username}' is already exists`, "error");
            };

            await sqlite.closeConnection("database");
        },
    },
}
</script>

<style lang="scss">
.register {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .form {
        box-sizing: border-box;
        width: 100%;
        padding: 12px;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;
        .formChild {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 20px;
            flex-wrap: wrap;
            input, .btn {
                width: stretch;
            }
            .btn.btn-subtle {
                text-align: left;
            }
        }
    }
}
</style>
