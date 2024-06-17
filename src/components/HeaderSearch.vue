<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            store,
        }
    },
    methods: {
        getMoviesList: function(){
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
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
                // this.store.resultsList = this.store.resultsList.concat(this.store.moviesList);
            })
            .catch(function (error) {
                console.log(error);
            });            
        },
        getTVSeriesList: function(){
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
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
                // this.store.resultsList = this.store.resultsList.concat(this.store.tvSeriesList);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        getSearchResults: function(){
            this.store.resultsList = [];
            this.getMoviesList();
            this.getTVSeriesList();
        }
    },
}
</script>

<template>
    <div class="container">
            <div class="row align-items-center">
                <div class="col-10">
                    <input type="search" class="form-control" id="search-input" placeholder="Search"  v-model="this.store.searchedString" @keyup.enter="getSearchResults()">
                </div>
                <div class="col-2">
                    <button class="btn btn-outline-secondary" @click="getSearchResults()">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="s" />
                    </button>
                </div>
            </div>
        </div>
</template>

<style scoped lang="scss">

</style>