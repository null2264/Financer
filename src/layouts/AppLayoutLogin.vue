<template>
    <div class="login">
        <AppLayoutBackBar />
        <slot />
    </div>
</template>

<script>
import AppLayoutBackBar from "@/layouts/AppLayoutBackBar";

export default {
    name: "AppLayoutLogin",
    components: {
        AppLayoutBackBar,
    },
}
</script>

<style scoped>
.login {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
