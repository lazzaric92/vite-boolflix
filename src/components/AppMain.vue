<script>
import axios from 'axios';
import { store } from "../store.js";

import MainCardsWrapper from './MainCardsWrapper.vue';
import MainHome from './main_sections/MainHome.vue';
import MainMovies from './main_sections/MainMovies.vue';
import MainTv from './main_sections/MainTv.vue';

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
            <MainHome v-if="this.store.onHomePage === true"/>
            <MainMovies v-if="this.store.onMoviesPage === true"/>
            <MainTv v-if="this.store.onTvPage === true"/>
            <MainCardsWrapper v-if="this.store.searchModeOn === true" />
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