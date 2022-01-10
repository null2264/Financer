<template>
    <div class="navbar">
        <div class="navbar-inner">
            <a @click="back" class="btn btn-subtle back"><vue-feather type="chevron-left" size="30px"/><span>Back</span></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppLayoutBackBar",
    methods: {
        back() {
            this.$router.go(-1);
        },
    },
}
</script>

<style scoped lang="scss">
.navbar {
    height: 56px;
    width: stretch;
    box-shadow: 0px 2px 4px #00000080;
    .navbar-inner {
        display: flex;
        height: 100%;
        flex-direction: row;
        align-content: center;
        align-items: center;
        padding-inline: 3px;
        .btn.btn-subtle {
            display: flex;
            height: 100%;
            color: white !important;
            align-items: center;
            font-size: 1.3rem;
            &.back {
                padding-inline: 5px;
            }
        }
    }
}
</style>
