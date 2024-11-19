<script>
import { store } from '../../store';
import TrendingCarousel from '../carousels/TrendingCarousel.vue';


export default{
    data(){
        return {
            store
        }
    },
    components:{
        TrendingCarousel
    }
}
</script>

<template>
    <TrendingCarousel trendingString="tv"/>
</template>

<style scoped lang="scss">

</style>