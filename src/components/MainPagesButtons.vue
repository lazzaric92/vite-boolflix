<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            store
        }
    },
    methods: {
        updateMoviesList: function(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                this.store.moviesList = response.data.results;
                console.log(this.store.moviesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
            })
            .catch(function (error) {
                console.log(error);
            });            
        },
        updateTVSeriesList: function(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                this.store.tvSeriesList = response.data.results;
                console.log(this.store.tvSeriesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        updateSearchResults: function(){
            if(this.store.searchedString !== ""){
                this.store.resultsList = [];
                this.updateMoviesList();
                this.updateTVSeriesList();
            }
        },
        nextPage: function(){
            if(this.store.currentPage < this.store.totalPages - 1){
                this.store.currentPage++;
                this.updateSearchResults();
            } else {
                this.store.currentPage = this.store.totalPages - 1
            }
        },
        prevPage: function(){
            if(this.store.currentPage > 1 && this.store.currentPage < this.store.totalPages){
                this.store.currentPage--;
                this.updateSearchResults();
            } else {
                this.store.currentPage = 1
            }
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-between align-itms-center mt-auto">
        <button>
            <font-awesome-icon icon="fa-solid fa-circle-arrow-left" @click="prevPage()"/>
            <!-- <font-awesome-icon icon="fa-solid fa-angle-left" @click="prevPage()"/> -->
        </button>
        <button>
            <font-awesome-icon icon="fa-solid fa-circle-arrow-right" @click="nextPage()" />
            <!-- <font-awesome-icon icon="fa-solid fa-angle-right" @click="nextPage()"/> -->
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
    button {
        color: $my_bg-lightgrey;
        background-color: transparent;
        border: none;
        font-size: 1.3rem;
    }
</style>