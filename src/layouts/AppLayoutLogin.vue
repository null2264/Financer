<template>
    <AppLayoutBackBar />
    <div>
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
</style>
