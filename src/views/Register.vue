<template>
    <div class="register">
        <div class="form">
            <div class="formInner">
                <div id="username" class="formChild">
                    <span>Username / Email</span>
                    <input type="text" class="username"/>
                </div>

                <div id="password" class="formChild">
                    <span>Password</span>
                    <input type="password" class="password"/>
                </div>

                <div id="buttons" class="formChild">
                    <a class="btn btn-fill" @click="doRegister">Register</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        doRegister() {
            this.$swal("Oops!", "こんにちは World!", "error");
        },
    }
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
