import MainHome from './components/pages/MainHome.vue';
import MainMovies from './components/pages/MainMovies.vue';
import MainTv from './components/pages/MainTv.vue';
import MainCardsWrapper from './components/MainCardsWrapper.vue';

import { createRouter, createWebHistory } from 'vue-router';

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
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;  // Torna alla posizione precedente se stai usando il pulsante "indietro"
        } else {
          return { top: 0 }; // Scroll all'inizio
        }
    }
});
export { router };

