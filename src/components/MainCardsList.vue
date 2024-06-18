<script>
import { store } from "../store.js";
import MainSingleCard from "./MainSingleCard.vue";
import MainPagesButtons from "./MainPagesButtons.vue";

export default{
    data(){
        return {
            store
        }
    },
    methods: {
        
    },
    components: {
        MainSingleCard,
        MainPagesButtons
    }
}
</script>

<template>
    <section class="h-100">
        <div class="container d-flex flex-column h-100">
            <div v-if="this.store.resultsList.length > 0" class="mb-5 mt-3">
                <input type="radio" id="all" value="all"/>
                <label for="all" class="fw-bold py-2 px-4 me-3">All</label>

                <input type="radio" id="movies" value="movies"/>
                <label for="movies" class="fw-bold py-2 px-4 me-3">Movies</label>

                <input type="radio" id="tv-series" value="tvSeries"/>
                <label for="tv-series" class="fw-bold py-2 px-4 me-3">TV Series</label>
            </div>
            <div class="row">
                <MainSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <MainPagesButtons v-if="this.store.resultsList.length > 0" />
        </div>
    </section>
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

    input[type="radio"]:focus + label {
        border-color: $my_logo-color;
        background-color: $my_logo-color;
        color: black;
    }
</style>