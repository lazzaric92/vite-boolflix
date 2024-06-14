<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            message: 'Main',
            store,
            searchedString: '',
        }
    },
    methods: {
        getMoviesList: function(title){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: title,
                language: "it-IT"
                }
            })
            .then((response) => {
                this.store.moviesList = response.data.results;
                console.log(this.store.moviesList);
            })
            .catch(function (error) {
                console.log(error);
            });  
        }
    }
}
</script>

<template>
    <main class="p-4">
        <div class="container mb-5">
            <div class="row align-items-center">
                <div class="col-10">
                    <div class="form-floating">
                        <input type="search" class="form-control" id="search-input" placeholder="Search" v-model="searchedString">
                        <label for="search-input">Search</label>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" @click="this.getMoviesList(searchedString)">CLICK ME</button>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-3" v-for="(movie, id) in this.store.moviesList" :key="movie.id">
                    <article class="card mb-3">
                        <!-- <img src="..." class="card-img-top" alt="..."> -->
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">{{ movie.original_title }}</h6>
                            <p class="card-text fs-6">{{ movie.original_language }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ movie.vote_average }}</li>
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