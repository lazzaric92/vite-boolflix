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
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                // lista film
                this.store.moviesList = response.data.results;
                console.log(this.store.moviesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
                // pagine
                this.store.moviesListPages = response.data.total_pages;
                this.store.totalPages = this.store.totalPages + this.store.moviesListPages;
                console.log(this.store.moviesListPages);
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
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                // serie tv
                this.store.tvSeriesList = response.data.results;
                console.log(this.store.tvSeriesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
                // pagine
                this.store.tvSeriesListPages = response.data.total_pages;
                this.store.totalPages = this.store.totalPages + this.store.tvSeriesListPages;
                console.log(this.store.tvSeriesListPages);
                console.log(this.store.totalPages);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        getSearchResults: function(){
            if(this.store.searchedString !== ""){
                this.store.resultsList = [];
                this.store.totalPages = 0;
                this.getMoviesList();
                this.getTVSeriesList();
            }
        },
        clearSearchInput: function(){
            this.store.searchedString = "";
        }
    },
}
</script>

<template>
    <div class="container">
            <div class="row align-items-center">
                <div class="col-10">
                    <div class="d-flex align-items-center border rounded">
                        <input type="search" class="form-control border-0" id="search-input" placeholder="Search"  v-model="this.store.searchedString" @keyup.enter="getSearchResults()">
                        <font-awesome-icon icon="fa-solid fa-xmark me-2" size="1x" @click="clearSearchInput()"/>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-outline-secondary" @click="getSearchResults()">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="1x"/>
                    </button>
                </div>
            </div>
        </div>
</template>

<style scoped lang="scss">
    div.col-10 div{
        background-color: #212529;

        &:hover .fa-xmark {
            color: #9ea1a6;
            cursor: pointer;
        }

        .form-control:focus {
            box-shadow: none;
        }


        #search-input {
            width: 95%;
        }
    }
</style>