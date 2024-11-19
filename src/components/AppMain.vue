<script>
import axios from 'axios';
import { store } from "../store.js";

import MainCardsWrapper from './MainCardsWrapper.vue';
import MainHome from './pages/MainHome.vue';
import MainMovies from './pages/MainMovies.vue';
import MainTv from './pages/MainTv.vue';

export default{
    data(){
        return {
            store,
        }
    },
    
    components: {
        MainCardsWrapper,
        MainHome,
        MainMovies,
        MainTv,
    }
}
</script>

<template>
    <main class="py-4 h-100">
        <div class="container-fluid h-100">
            <router-view>
                <MainHome class="overflow-y-scroll"/>
                <MainMovies class="overflow-y-scroll"/>
                <MainTv class="overflow-y-scroll"/>
                <MainCardsWrapper  />
            </router-view>
            <!-- <MainHome v-if="this.store.onHomePage === true" class="overflow-y-scroll"/>
            <MainMovies v-if="this.store.onMoviesPage === true" class="overflow-y-scroll"/>
            <MainTv v-if="this.store.onTvPage === true" class="overflow-y-scroll"/>
            <MainCardsWrapper v-if="this.store.searchModeOn === true" /> -->
        </div>
    </main>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

    main {
        margin-top: 60px;
        overflow-y: auto;
    }
</style>