<template>
    <div class="login">
        <div class="greeting">
            <h2>Welcome Back</h2>
            <img class="image" id="login" src="../assets/login.png"/>
        </div>
        <div class="users">
            <div class="title">
                Choose your Profile
            </div>
            <div class="body">
                <div class="user" v-for="user in users">
                    <div class="detail">
                        <div class="avatar">
                            <a>A</a>
                        </div>
                        <a class="name">{{ user.username }}</a>
                    </div>
                    <button @click="useProfile()" class="btn btn-fill">Use</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";

export default {
    name: "Login",
    setup() {
        const users = ref("");
        const app = getCurrentInstance();
        const sqlite = app?.appContext.config.globalProperties.$sqlite;

        onMounted(async () => {
            const ret = await sqlite.checkConnectionsConsistency();
            const isConn = (await sqlite.isConnection("database")).result;

            let db
            if (ret.result && isConn) {
                db = await sqlite.retrieveConnection("database");
            } else {
                db = await sqlite.createConnection("database", false, "no-encryption", 1);
            }
            await db.open();

            const query = await db.query("SELECT username FROM profile");

            users.value = query.values;
        });

        return { users };
    },
    methods: {
        async useProfile(e) {
            console.log(this.users);
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

.users {
    color: black;
    background-color: white;
    width: 100%;
    height: 100%;
    bottom: 0px;
    border-radius: 30px 30px 0px 0px;
    .title {
        padding-top: 20px;
    }
    .body {
        display: flex;
        padding: 20px;
        flex-direction: column;
        max-height: 450px;
        overflow-y: auto;
        .user {
            padding: 15px;
            border-radius: 20px;
            border: 1px solid gray;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
            align-items: center;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            .detail {
                display: flex;
                align-items: center;
                .name {
                    font-size: 1.1rem;
                }
                .avatar {
                    width: 45px;
                    height: 45px;
                    margin-right: 10px;
                    background-color: gray;
                    border-radius: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .btn-fill {
                font-size: 1.1rem;
                padding-inline: 30px;
            }
        }
    }
}
</style>
