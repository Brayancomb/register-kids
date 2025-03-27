import { createWebHistory, createRouter } from "vue-router";

import Login from '../views/Login.vue';
import Register from '../views/RegisterKid.vue';
import Dashboard from "../views/Dashboard.vue";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router