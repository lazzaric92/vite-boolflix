<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { router } from '../../router.js';
import { store } from '../../store.js';

export default{
    data(){
        return {
            store
        }
    },
    methods: {
        getMoviesList: function(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString.trim(),
                language: "it-IT",
                page: 1
                }
            })
            .then((response) => {
                // lista film
                this.store.moviesList = response.data.results;
                // console.log(this.store.moviesList);
                console.log(response.data);
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
                // pagine
                this.store.moviesListPages = response.data.total_pages;
                console.log(this.store.moviesListPages);
            })
            .catch((error) => {
                console.log(error);
                this.$route.push({name: 'not-found'});
            })
            .finally(() => {
                this.store.searchLoading = false;
            });            
        },
        getTVSeriesList: function(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: 1
                }
            })
            .then((response) => {
                // serie tv
                this.store.tvSeriesList = response.data.results;
                // console.log(this.store.tvSeriesList);
                console.log(response.data);
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
                // pagine
                this.store.tvSeriesListPages = response.data.total_pages;
                console.log(this.store.tvSeriesListPages);
                console.log(this.store.totalPages);
            })
            .catch((error) => {
                console.log(error);
                this.$route.push({name: 'not-found'});
            })
            .finally(() => {
                this.store.searchLoading = false;
            });  
        },
        getTotalPages(){
            if(this.store.moviesListPages >= this.store.tvSeriesListPages){
                this.store.totalPages = this.store.moviesListPages;
            } else {
                this.store.totalPages = this.store.tvSeriesListPages;
            }
        },
        getSearchResults: function(){
            if(this.store.searchedString !== ""){
                this.store.resultsList = [];
                this.currentPage = 1;
                this.store.totalPages = 0;
                this.getMoviesList();
                this.getTVSeriesList();
                this.getTotalPages();
            }
        },
        clearSearchInput: function(){
            this.store.searchedString = "";
        },
        startSearch(){
            const searchBtn = document.getElementById('search-btn');
            this.store.searchLoading = true;
            searchBtn.click();
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-10">
                <div class="d-flex align-items-center border rounded">
                    <input type="search" class="form-control border-0" id="search-input" placeholder="Search"  v-model="this.store.searchedString" @keyup.enter="startSearch()">
                    <font-awesome-icon icon="fa-solid fa-xmark me-2" size="1x" v-if="this.store.searchedString.trim().length > 0" @click="clearSearchInput()"/>
                </div>
            </div>
            <div class="col-2">
                <RouterLink to="/search" id="search-btn" @click="getSearchResults()">
                    <button class="btn btn-outline-secondary" >
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="1x"/>
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

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
            caret-color: $my_logo-color;
        }
    }
</style>