<script>
import axios from 'axios';
import { store } from '../../store';


export default{
    data(){
        return {
            store,
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
                this.store.searchLoading = true;
                this.store.resultsList = [];
                this.updateMoviesList();
                this.updateTVSeriesList();
                setTimeout(() => {
                    this.store.searchLoading = false;
                }, 1000)
            }
        },
        setCurrentPage(page){
            this.store.currentPage = page;
            this.updateSearchResults();
        },
        clickHandle(e){
            console.log(e.currentTarget);
            let totPages;
            switch (this.store.radioValue) {
                    case 'movies':
                        totPages = this.store.moviesListPages;
                        break;
                    case 'tv':
                        totPages = this.store.tvSeriesListPages;
                        break;
                    default:
                        totPages = this.store.totalPages;
                        break;
                }

            if(e.currentTarget.classList.contains('first')){
                this.store.currentPage = 1;
                this.updateSearchResults();
            }
            else if(e.currentTarget.classList.contains('prev')){
                if(this.store.currentPage > 0){
                    if(this.store.currentPage > totPages){
                        this.store.currentPage = totPages - 1;
                    } else {
                        this.store.currentPage--;
                    }
                    this.updateSearchResults();
                }
            }
            else if(e.currentTarget.classList.contains('next')){
                if(this.store.currentPage < totPages){
                    this.store.currentPage++;
                    this.updateSearchResults();
                }
            }
            else if(e.currentTarget.classList.contains('last')){
                switch (this.store.radioValue) {
                    case 'movies':
                        this.store.currentPage = this.store.moviesListPages;
                        break;
                    case 'tv':
                        this.store.currentPage = this.store.tvSeriesListPages;
                        break;
                    default:
                        this.store.currentPage = this.store.totalPages;
                        break;
                }
                this.updateSearchResults();
            }
            else if(e.currentTarget.classList.contains('dots') || e.currentTarget.classList.contains('active-page')){
                return;
            }
        }
    },
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center mt-3 pb-3">
        <span class="first" @click="clickHandle">
            <font-awesome-icon icon="fa-solid fa-angles-left" />
        </span>
        <span class="me-4 prev" @click="clickHandle">
            <font-awesome-icon icon="fa-solid fa-angle-left" />
        </span>

        <span v-if="this.store.currentPage > 4" class="dots">...</span>

        <!-- # movies -->
        <div v-if="this.store.radioValue === 'movies'">
            <template v-for="page in this.store.moviesListPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage" @click="setCurrentPage(page)">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page" @click="clickHandle">{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)" @click="setCurrentPage(page)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage > this.store.moviesListPages + 3" @click="setCurrentPage(this.store.moviesListPages)" class="active-page">{{ this.store.moviesListPages }}</span>

            <span v-if="this.store.currentPage < (this.store.moviesListPages - 4)" class="dots">...</span>
        </div>
        <!-- # tv series -->
        <div v-else-if="this.store.radioValue === 'tv'">
            <template v-for="page in this.store.tvSeriesListPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage" @click="setCurrentPage(page)" :class="(this.store.currentPage > this.store.tvSeriesListPages && page === this.store.tvSeriesListPages) ? 'active-page' : ''">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page" >{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)" @click="setCurrentPage(page)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage > this.store.tvSeriesListPages + 3" @click="setCurrentPage(this.store.tvSeriesListPages)" class="active-page">{{ this.store.tvSeriesListPages }}</span>

            <span v-if="this.store.currentPage < (this.store.tvSeriesListPages - 4)" class="dots">...</span>
        </div>
        <!-- # all -->
        <div v-else>
            <template v-for="page in this.store.totalPages">
                <span v-if="page > (this.store.currentPage - 4) && page < this.store.currentPage" @click="setCurrentPage(page)">{{ page }}</span>
                <span v-if="page === this.store.currentPage" class="active-page" @click="clickHandle">{{ page }}</span>
                <span v-if="page > this.store.currentPage && page < (this.store.currentPage + 4)" @click="setCurrentPage(page)">{{ page }}</span>
            </template>
            <span v-if="this.store.currentPage < (this.store.totalPages - 4)" class="dots">...</span>
        </div>

        <span class="ms-4 next" @click="clickHandle">
            <font-awesome-icon icon="fa-solid fa-angle-right" />
        </span>
        <span class="last" @click="clickHandle">
            <font-awesome-icon icon="fa-solid fa-angles-right" />
        </span>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

    span{
        margin: 0 .5rem;
        color: $my_bg-lightgrey;
        font-size: 1.1rem;
        cursor: default;
        
        &:not(.dots){
            cursor: pointer;

            &:hover{
                color: white;
                scale: 1.1;
            }
        }


        &.active-page{
            color: $my_logo-color;
        }
    }
</style>