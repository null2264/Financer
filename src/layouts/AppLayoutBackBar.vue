<template>
    <div class="navbar">
        <div class="navbar-inner" :style="cssVars">
            <a @click="back" class="btn btn-subtle back">
                <vue-feather type="chevron-left" size="30px"/>
                <span>Back</span>
            </a>
            <span class="title" v-if="title != null">{{ title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppLayoutBackBar",
    props: {
        fgColour: {
            type: String,
            default: "#FFFFFF",
        },
        title: {
            type: String,
            default: null,
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    },
    computed: {
        cssVars() {
            return {
                "--fg-back-navbar": this.fgColour,
            }
        },
        title() {
            return this.title
        }
    },
}
</script>

<style scoped lang="scss">
.navbar {
    height: 56px;
    width: stretch;
    box-shadow: 0px 2px 4px #00000025;
    margin-bottom: 6px;
    .navbar-inner {
        display: flex;
        height: 100%;
        flex-direction: row;
        align-content: center;
        align-items: center;
        padding-inline: 3px;
        color: var(--fg-back-navbar) !important;
        font-size: 1.3rem;
        .btn.btn-subtle {
            display: flex;
            height: 100%;
            color: inherit !important;
            align-items: center;
            font-size: inherit;
            &.back {
                padding-inline: 5px;
            }
        }
        .title {
            margin-left: 20px;
        }
    }
}
</style>
