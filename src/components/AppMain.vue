<script>
import axios from 'axios';
import { store } from "../store.js";
import MainSearch from './MainSearch.vue';
import MainCardsList from './MainCardsList.vue';

export default{
    data(){
        return {
            store,
        }
    },
    methods: {
        getResultsList: function(){
            // movies
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT"
                }
            })
            .then((response) => {
                this.store.moviesList = response.data.results;
                console.log(this.store.moviesList);
                this.store.resultsList = this.store.resultsList.concat(this.store.moviesList);
            })
            .catch(function (error) {
                console.log(error);
            });

            // tv-series
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT"
                }
            })
            .then((response) => {
                this.store.tvSeriesList = response.data.results;
                console.log(this.store.tvSeriesList);
                this.store.resultsList = this.store.resultsList.concat(this.store.tvSeriesList);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        getSearchResults: function(){
            this.store.resultsList = [];
            this.getResultsList();
        }
    },
    components: {
        MainSearch,
        MainCardsList
    }
}
</script>

<template>
    <main class="p-4">
        <MainSearch @search="getSearchResults"/>
        <MainCardsList />
    </main>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
</style>