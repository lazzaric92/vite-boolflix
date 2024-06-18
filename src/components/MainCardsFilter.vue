<script>
import { store } from "../store.js";

export default{
    data(){
        return {
            store
        }
    },
    methods: {
        changeRadioValue: function(value){
            this.store.radioValue = value;
        }
    },
}
</script>

<template>
    <div v-if="this.store.resultsList.length > 0" class="mb-5 mt-3">
        <input type="radio" id="all" value="all" name="list-shown" :class="(this.store.radioValue === 'all') ? 'active' : ''" @click="changeRadioValue('all')"/>
        <label for="all" class="fw-bold py-2 px-4 me-3">All</label>

        <input type="radio" id="movies" value="movies" name="list-shown" :class="(this.store.radioValue === 'movies') ? 'active' : ''" @click="changeRadioValue('movies')"/>
        <label for="movies" class="fw-bold py-2 px-4 me-3">Movies</label>

        <input type="radio" id="tv-series" value="tvSeries" name="list-shown" :class="(this.store.radioValue === 'series') ? 'active' : ''" @click="changeRadioValue('series')"/>
        <label for="tv-series" class="fw-bold py-2 px-4 me-3">TV Series</label>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;

    input[type="radio"] {
        opacity: 0;
        position: fixed;
        width: 0;
    }

    label {
        display: inline-block;
        background-color: transparent;
        font-size: .8rem;
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