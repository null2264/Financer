<template>
    <AppLayoutBackBar fgColour="#000000" title="New Profile"/>
    <div>
        <slot />
    </div>
</template>

<script>
import AppLayoutBackBar from "@/layouts/AppLayoutBackBar";

export default {
    name: "AppLayoutRegister",
    components: {
        AppLayoutBackBar,
    },
}
</script>

<style scoped>
</style>
