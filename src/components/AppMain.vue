<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            message: 'Main',
            store
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
    <h1> {{ message }} </h1>
    <button @click="this.getMoviesList('Frankenstein')">CLICK ME</button>
</template>

<style scoped>

</style>