<script>
import axios from 'axios';
import { store } from '../../store';


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
        // nextPage: function(){
        //     let pages;
        //     switch (this.store.radioValue){
        //         case 'movies':
        //             pages = this.store.moviesListPages;
        //             break;
        //         case 'series':
        //             pages = this.store.tvSeriesListPages;
        //             break;
        //         case 'all':
        //             pages = this.store.totalPages -1;
        //             break;
        //         default:
        //             pages = this.store.totalPages;
        //     }

        //     if(this.store.currentPage < pages){
        //         this.store.currentPage++;
        //         this.updateSearchResults();
        //     } else {
        //         this.store.currentPage = pages;
        //         this.updateSearchResults();
        //     }
        //     console.log(this.store.currentPage, pages);
        // },
        // prevPage: function(){
        //     let pages;
        //     switch (this.store.radioValue){
        //         case 'movies':
        //             pages = this.store.moviesListPages;
        //             break;
        //         case 'series':
        //             pages = this.store.tvSeriesListPages;
        //             break;
        //         case 'all':
        //             pages = this.store.totalPages -1;
        //             break;
        //         default:
        //             pages = this.store.totalPages;
        //     }
        //     if(this.store.currentPage > 1 && this.store.currentPage <= pages){
        //         this.store.currentPage--;
        //         this.updateSearchResults();
        //     } else {
        //         this.store.currentPage = 1
        //         this.updateSearchResults();
        //     }
        //     console.log(this.store.currentPage, pages);
        // }
    },
    created(){
        
    }
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center mt-3 pb-3">
        <span >
            <font-awesome-icon icon="fa-solid fa-angles-left" />
        </span>
        <span class="me-4">
            <font-awesome-icon icon="fa-solid fa-angle-left" />
        </span>

        <span v-if="this.store.currentPage > 4">...</span>

        <!-- # movies -->
        <div v-if="this.store.radioValue === 'movies'">
            <template v-for="page in this.store.moviesListPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page">{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage >= (this.store.moviesListPages - 4)">...</span>
        </div>
        <!-- # tv series -->
        <div v-else-if="this.store.radioValue === 'tv'">
            <template v-for="page in this.store.tvSeriesListPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page">{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage >= (this.store.tvSeriesListPages - 4)">...</span>
        </div>
        <!-- # all -->
        <div v-else>
            <template v-for="page in this.store.totalPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page">{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage >= (this.store.totalPage - 4)">...</span>
        </div>

        <span class="ms-4">
            <font-awesome-icon icon="fa-solid fa-angle-right" />
        </span>
        <span >
            <font-awesome-icon icon="fa-solid fa-angles-right" />
        </span>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;
    // button {
    //     color: $my_bg-lightgrey;
    //     background-color: transparent;
    //     border: none;
    //     font-size: 1.3rem;
    // }

    span{
        margin: 0 .5rem;
        cursor: pointer;
        color: $my_bg-lightgrey;
        font-size: 1.1rem;
        
        &:hover{
            color: white;
            scale: 1.1;
        }

        &.active-page{
            color: $my_logo-color;
        }
    }
</style>