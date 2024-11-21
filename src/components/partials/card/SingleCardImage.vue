<script>
import { store } from '../../../store';


export default{
    data(){
        return {
            store
        }
    },
    props: {
        singleCard: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <img v-if="singleCard.poster_path == null" class="card-img-top h-100" src="../../../assets/img/mockup-movie-poster.jpeg" :alt="(singleCard.media_type === 'movie') ? singleCard.title : singleCard.name + ' has no poster'"></img>
    <img v-else :src="`https://image.tmdb.org/t/p/w342/${singleCard.poster_path}`" class="card-img-top h-100" :alt="(singleCard.media_type === 'movie') ? singleCard.title : singleCard.name + ' Poster'">
</template>

<style scoped lang="scss">
</style>