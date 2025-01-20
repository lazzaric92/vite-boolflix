<script>
import { store } from '../../store';
import axios from 'axios';

export default{
    data(){
        return {
            store,
            radioInputs: [
                {
                    'id': 0,
                    'val': 'all',
                    'label': 'Tutti'
                },
                {
                    'id': 1,
                    'val': 'movies',
                    'label': 'Film'
                },
                {
                    'id': 2,
                    'val': 'tv',
                    'label': 'Serie TV'
                },
            ]
        }
    },
    methods: {
        changeRadioValue: function(value){
            this.store.radioValue = value;
            this.store.moviesList = [];
            this.store.tvSeriesList = [];
            this.store.resultsList = [];
            this.updateMoviesList();
            this.updateTvSeriesList();
        },
        updateMoviesList(){
            let page;
            if(this.store.currentPage < this.store.moviesListPages){
                page = this.store.currentPage;
            } else {
                page = this.store.moviesListPages;
            };

            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: page
                }
            })
            .then((response) => {
                this.store.moviesList = response.data.results;
                // console.log(this.store.moviesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
            })
            .catch((error) => {
                console.log(error);
                this.$router.push({name: 'not-found'});
            })
            .finally(() => {
                //
            });            
        },
        updateTvSeriesList(){
            let page;
            if(this.store.currentPage < this.store.tvSeriesListPages){
                page = this.store.currentPage;
            } else {
                page = this.store.tvSeriesListPages;
            };

            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: page
                }
            })
            .then((response) => {
                this.store.tvSeriesList = response.data.results;
                // console.log(this.store.tvSeriesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
            })
            .catch((error) => {
                console.log(error);
                this.$router.push({name: 'not-found'});
            })
            .finally(() => {
                //
            }); 
        },
    },
}
</script>

<template>
    <div v-if="this.store.resultsList.length > 0" class="mb-5 mt-3">
        <template v-for="radInp in radioInputs" key="input.id">
            <input type="radio" name="list-shown" :id=radInp.id :value=radInp.val :class="(this.store.radioValue === radInp.val) ? 'active' : ''" @click="changeRadioValue(radInp.val)"/>
            <label :for=radInp.id class="fw-bold py-2 px-4 me-3">{{ radInp.label }}</label>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

    input[type="radio"] {
        opacity: 0;
        position: fixed;
        width: 0;
    }

    label {
        display: inline-block;
        background-color: transparent;
        font-size: .9rem;
        border: 2px solid $my_bg-lightgrey;
        border-radius: 32px;
        cursor: pointer;
        color: white;
    }

    input[type="radio"]:checked + label,
    input[type="radio"].active + label,
    input[type="radio"]:focus + label {
        border-color: $my_logo-color;
        background-color: $my_logo-color;
        color: black;
    }
</style>