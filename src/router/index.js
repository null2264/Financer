import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: () => import("@/views/LandingPage.vue"),
        meta: {
            layout: "AppLayoutLanding",
            background: "#536FFE"
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            layout: "AppLayoutLogin",
            background: "#3EC487"
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
            layout: "AppLayoutLoggedIn"
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.afterEach((to, from) => {
    document.body.style.backgroundColor = to.meta.background || "#FFFFFF"
})

export default router
