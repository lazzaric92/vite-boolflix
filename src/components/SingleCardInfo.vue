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
        },
        wordsLimit: function(text){
            const words = text.split(' ');
            let newText = '';
            for (let index = 0; index < 15; index++) {
                newText += words[index] + ' ';
            }
            return (newText.trim() + '...');
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
    <div class="card-body d-flex flex-column pb-1 pt-2">
        <p class="fs-6 mb-2 fw-bold text-center">{{ singleCard.title }} {{ singleCard.name }}</p>
        <p class="mb-2"> {{ singleCard.original_title }} {{ singleCard.original_name }}</p>
        <p class="mb-2"> {{ wordsLimit(singleCard.overview) }} </p>
        <ul class="list-group list-group-flush mt-auto">
            <li class="list-group-item ps-0">
                <p class="lang-icon mb-0" :class="`lang-icon-${singleCard.original_language}`" ></p>
            </li>
            <li class="list-group-item ps-0">
                <template v-for="(point, index) in adjustVote(singleCard.vote_average)" :key="point.index">
                    <font-awesome-icon v-if="(point === 0)" icon="fa-regular fa-star" size="xs" />
                    <font-awesome-icon v-else icon="fa-solid fa-star" size="xs" />
                </template>
            </li>
        </ul>        
    </div>

    <!-- <ul class="list-group list-group-flush">
        <li class="list-group-item">
            
        </li>
    </ul> -->
</template>

<style scoped lang="scss">
@use '../../node_modules/@textabledev/langs-flags-list/lang-flags.css';
@use '../styles/partials/variables' as *;

    .card-body {
        font-size: .8rem;

        ul.list-group-flush > .list-group-item{
            background-color: $my_bg-dark;
        }
    }

    .lang-icon {
        background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
    }

    .fa-star{
        color: orange;
    }
</style>