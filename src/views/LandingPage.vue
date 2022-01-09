<template>
    <div class="landing">
        <div class="promo">
            <img class="image" id="landing" src="../assets/landing1.png"/>
            <div class="desc">
                <div class="desc-title">
                    <h2>Welcome to <b>FINANCER</b>!</h2>
                </div>
                <p>
                    <span>Easily track your finance using our app</span>
                    <br/>
                    <span>Every outcame and income, track them as easy as one-two-three</span>
                </p>
            </div>
        </div>
        <div class="action">
            <router-link class="btn btn-fill" to="/register">Get Started</router-link>
            <router-link class="btn btn-subtle" to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPage"
}
</script>

<style lang="scss">
body {
    color: white;
}

.landing {
    height: 100%;
    .promo {
        margin-top: 80px;
        .desc {
            margin-top: 50px;
            color: white;
            padding-inline: 40px;
            .desc-title {
                padding-bottom: 2px;
            }
            p {
                color: #BEBCB0;
            }
            b {
                color: #3EC487;
            }
        }
        .image#landing {
            width: 240px;
        }
    }
}

div.landing {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

div.action {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 60px;
    align-content: center;
    width: stretch;
    padding-inline: 12px;
    .btn {
        padding-block: 10px;
    }
}
</style>
