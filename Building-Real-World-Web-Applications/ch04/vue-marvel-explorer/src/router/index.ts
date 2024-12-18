// Listing 4.33 Adding errhandling to the index.ts file in the vue-marvel-explorer/src/router folder

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import SearchView from "../views/SearchView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:page?',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/search',
            name: 'search',
            // route level code-splitting
            // this generates a separate chunk (Search.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/SearchView.vue'),
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('../views/ErrorView.vue')
        }
    ],
})

export default router
