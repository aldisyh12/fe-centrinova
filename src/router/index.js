import {createWebHistory, createRouter} from "vue-router";
import Pages from "../helpers/Pages";
import Home from "@/views/Home";
import Landing from "@/views/Landing";
import Blog from "@/views/Blog";
import Post from "@/views/Post";
import Dashboard from "@/views/Dashboard";
import PublicPages from "@/helpers/PublicPages";
import VueCookies from "vue-cookies";

const routes = [
    {
        path: Pages.HOME,
        name: "Home",
        component: Home,
        children: [
            {
                path: Pages.LANDING,
                name: "Landing",
                component: Landing,
                children: [
                    {
                        path: "",
                        name: "Landing",
                        component: () => import("../components/landing/Index"),
                    }
                ]
            },
            {
                path: Pages.BLOG,
                name: "Blog",
                component: Blog,
                children: [
                    {
                        path: "",
                        name: "Blog",
                        component: () => import("../components/blog/Index.vue"),
                    }
                ]
            },
            {
                path: Pages.POST,
                name: "Post",
                component: Post,
                children: [
                    {
                        path: "",
                        name: "Post",
                        component: () => import("../components/post/Index.vue"),
                    }
                ]
            },
            {
                path: Pages.DASHBOARD,
                name: "Dashboard",
                component: Dashboard,
                children: [
                    {
                        path: "",
                        name: "Dashboard",
                        component: () => import("../components/dashboard/Index.vue"),
                    },
                    {
                        path: Pages.POST_CREATE,
                        name: "PostCreate",
                        component: () => import("../components/post-create/Index.vue"),
                    },
                    {
                        path: Pages.POST_EDIT,
                        name: "PostEdit",
                        component: () => import("../components/post-create/Edit.vue"),
                    }
                ]
            },
            {
                path: Pages.LOGIN_FORM,
                name: "Login",
                component: () => import("../views/Login.vue"),
            },
            {
                path: Pages.REGISTER,
                name: "Register",
                component: () => import("../views/Register.vue"),
            },
            {
                path: Pages.UPDATE_PASSWORD,
                name: "UpdatePassword",
                component: () => import("../views/UpdatePassword.vue"),
            },
        ]
    },
];
const router = new createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authRequired = !PublicPages.includes(to.path);
    const loggedIn = VueCookies.get("__MIH__BASE__SESSIONID__");

    if (authRequired && !loggedIn) {
        next(PublicPages);
    } else {
        next();
    }
});

export default router;
