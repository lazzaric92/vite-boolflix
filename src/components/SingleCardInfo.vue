<script>
import { store } from "../store.js";

export default{
    data(){
        return {
            store,
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
    <div class="card-body">
            <p class="card-title">{{ singleCard.title }} {{ singleCard.name }}</p>
            <p class="card-subtitle mb-2 text-body-secondary">{{ singleCard.original_title }} {{ singleCard.original_name }}</p>
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
</template>

<style scoped lang="scss">
@use '../../node_modules/@textabledev/langs-flags-list/lang-flags.css';

    .lang-icon {
        background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
    }

    .fa-star{
        color: orange;
    }
</style>