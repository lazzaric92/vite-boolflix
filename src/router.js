import { createRouter, createWebHistory } from 'vue-router';

import MainHome from './components/pages/MainHome.vue';
import MainMovies from './components/pages/MainMovies.vue';
import MainTv from './components/pages/MainMovies.vue';
import MainCardsWrapper from './components/MainCardsWrapper.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainHome
        },
        {
            path: '/movies',
            name: 'movies',
            component: MainMovies
        },
        {
            path: '/tv',
            name: 'tv',
            component: MainTv
        },
        {
            path: '/search',
            name: 'search',
            component: MainCardsWrapper
        },
    ]
});
export { router };

