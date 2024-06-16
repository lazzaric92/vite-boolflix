<script>
import axios from 'axios';
import { store } from "../store.js";
import MainSearch from './MainSearch.vue'

export default{
    data(){
        return {
            message: 'Main',
            store,
        }
    },
    methods: {
        getMoviesResults: function(){
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
        },
        getTVSeriesResults: function(){
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
            this.getMoviesResults();
            this.getTVSeriesResults();
        }
    },
    components: {
        MainSearch
    }
}
</script>

<template>
    <main class="p-4">
        <MainSearch @search="getSearchResults"/>

        <div class="container">
            <div class="row">
                <div class="col-3" v-for="(result, id) in this.store.resultsList" :key="result.id">
                    <article class="card mb-3">
                        <!-- <img src="..." class="card-img-top" alt="..."> -->
                        <div class="card-body">
                            <h5 class="card-title">{{ result.title }} {{ result.name }}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">{{ result.original_title }} {{ result.original_name }}</h6>
                            <p class="card-text fs-6">{{ result.original_language }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ result.vote_average }}</li>
                        </ul>
                    </article>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
</style>