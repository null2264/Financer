<template>
    <div class="login">
        <div class="greeting">
            <h2>Welcome Back</h2>
            <img class="image" id="login" src="../assets/login.png"/>
        </div>
        <form class="loginForm" @submit.prevent="doLogin">
            <div class="formInner">
                <div class="formChild">
                    <span>Username</span>
                    <input type="text" v-model="username" name="username" class="username"/>
                </div>

                <div class="formChild">
                    <span>Password</span>
                    <input type="password" v-model="password" name="password" class="password"/>
                    <a class="btn btn-subtle" href="#" style="padding-top:5px;">Forgot password?</a>
                </div>

                <div id="buttons" class="formChild">
                    <a class="btn btn-fill" @click="doLogin">Login</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
        }
    },
    setup() {
        const app = getCurrentInstance();
        const sqlite = app?.appContext.config.globalProperties.$sqlite;

        return { sqlite };
    },
    methods: {
        async doLogin(e) {
            if (!this.username || !this.password)
                return this.$swal("Oops!", "<b>Username</b> and/or <b>Password</b> can't be empty!", "error");

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

            const user = await db.query("SELECT * FROM profile WHERE username = ?", [this.username]);
            if (!user.values.length)
                return this.$swal("Oops!", `<b>Username</b> "${this.username}" is not exists`, "error");

            const curUser = user.values[0];

            if (curUser.password != this.password)
                return this.$swal("Oops!", `<b>Password</b> is incorrect`, "error");

            await sqlite.closeConnection("database");

            this.$router.push("/dashboard");
        },
    },
}
</script>

<style lang="scss">
.login {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .greeting {
        color: white;
        .image#login {
            height: 120px;
        }
        h2 {
            font-family: "Sansita", sans-serif;
            font-weight: normal;
            font-style: normal;
        }
    }
}

.loginForm {
    color: black;
    background-color: white;
    width: 100%;
    height: 100%;
    bottom: 0px;
    border-radius: 30px 30px 0px 0px;
    .formInner {
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
