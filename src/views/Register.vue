<template>
    <div class="register">
        <div class="form">
            <form class="formInner" @submit.prevent="doRegister">
                <div class="formChild">
                    <span>Username</span>
                    <input type="text" v-model="username" name="username" class="username"/>
                </div>

                <div class="formChild">
                    <span>Password</span>
                    <input type="password" v-model="password" name="password" class="password"/>
                </div>

                <div id="buttons" class="formChild">
                    <button class="btn btn-fill">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data () {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        doRegister(e) {
            if (!this.username || !this.password)
                this.$swal("Oops!", "<b>Username</b> and/or <b>Password</b> can't be empty!", "error");
            else
                this.$swal("Registered", `${this.username}:${this.password}`, "success");
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
}
</style>
