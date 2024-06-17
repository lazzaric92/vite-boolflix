<script>
import { store } from "../store.js";


export default{
    data(){
        return {
            store,
            voteArray: [],
        }
    },
    methods: {
        adjustVote: function(vote){
            let newVote = vote / 2;
            if(!Number.isInteger(newVote) && newVote !== 5){
                newVote = Math.floor(newVote) + 1;
            }

            this.voteArray = [0, 0, 0, 0, 0];
            this.voteArray.fill(1, 0, newVote);
            return this.voteArray;
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
                <img v-if="singleCard.poster_path == null" class="card-img-top h-100" src="../assets/img/mockup-movie-poster.jpeg" :alt="`${singleCard.title}${singleCard.name} has no poster`"></img>
                <img v-else :src="`https://image.tmdb.org/t/p/w342/${singleCard.poster_path}`" class="card-img-top h-100" :alt="`${singleCard.title}${singleCard.name} Poster`">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ singleCard.title }} {{ singleCard.name }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ singleCard.original_title }} {{ singleCard.original_name }}</h6>
                <p class="lang-icon mb-0" :class="`lang-icon-${singleCard.original_language}`" </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <template v-for="(point, index) in adjustVote(singleCard.vote_average)" :key="point.index">
                        <font-awesome-icon v-if="(point === 0)" icon="fa-regular fa-star" size="xs" />
                        <font-awesome-icon v-else icon="fa-solid fa-star" size="xs" />
                    </template>
                </li>
            </ul>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '../../node_modules/@textabledev/langs-flags-list/lang-flags.css';

.card-image {
    height: 375px;
}

.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}

.fa-star{
    color: orange;
}
</style>