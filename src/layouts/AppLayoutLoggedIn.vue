<template>
    <div>
        <header class="header">
            <div>
                <div class="avatar">
                    <a>P</a>
                </div>
                <div class="balance">
                    <h2>Current Balance</h2>
                    <div class="current-balance">
                        <span class="amount">$420.69</span>
                        <span class="wallets">(PayPal, Dana, OVO)</span>
                    </div>
                </div>
            </div>

            <div>
                <a href="#"><vue-feather type="more-horizontal" size="24px" class="menu"/></a>
            </div>
        </header>
        <AppLayoutBottomToolbar />
        <slot />
    </div>
</template>

<script>
import AppLayoutBottomToolbar from "@/layouts/AppLayoutBottomToolbar";

export default {
    name: "AppLayoutLoggedIn",
    components: {
        AppLayoutBottomToolbar,
    },
}
</script>

<style scoped>
.header {
    height: 21vh;
    color: white;
    background-color: #3EC487;
    border-radius: 0 0 30px 30px;
    padding: 23px;
    /* flex stuff */
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.header .menu {
    color: #656F77;
}

.header div {
    display: flex;
}

.header div .balance {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.header div .balance h2 {
    margin: 0;
}

.balance .current-balance .amount {
    padding-right: 10px;
}

.balance .current-balance .wallets {
    color: #E3E3E3;
}

.avatar {
    width: 50px;
    height: 50px;
    color: black;
    background: white;
    border-radius: 100%;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
}
</style>
