<script>
import { store } from "../store.js";

export default{
    data(){
        return {
            store,
        }
    },
    props: {
        singleCard: {
            type: Object,
            required: true
        }
    },
}
</script>

<template>
    <article class="col-3 mb-3">
        <div class="card h-100">
            <div class="card-image">
                <p v-if="singleCard.poster_path == null"> {{ singleCard.title }} {{ singleCard.name }} has no poster</p>
                <img v-else :src="`https://image.tmdb.org/t/p/w342/${singleCard.poster_path}`" class="card-img-top h-100" :alt="`${singleCard.title}${singleCard.name} Poster`">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ singleCard.title }} {{ singleCard.name }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ singleCard.original_title }} {{ singleCard.original_name }}</h6>
                <p class="lang-icon mb-0" :class="`lang-icon-${singleCard.original_language}`" </p>


                <!-- <p class="card-text fs-6">{{ singleCard.original_language }}</p> -->
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ singleCard.vote_average }}</li>
            </ul>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '../../node_modules/@textabledev/langs-flags-list/lang-flags.css';

.card-image {
    height: 389.5px;

    p{
        text-align: center;
        margin-top: 1rem;
    }
}

.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>