<script>
import { store } from '../../store';
import TrendingCarousel from '../carousels/TrendingCarousel.vue';


export default{
    data(){
        return {
            store
        }
    },
    components: {
        TrendingCarousel
    }
}
</script>

<template>
    <TrendingCarousel trendingString="movie"/>
</template>

<style scoped lang="scss">

</style>