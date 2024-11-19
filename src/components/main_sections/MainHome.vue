<script>
import { store } from '../../store';
import DiscoverCarousel from '../carousels/DiscoverCarousel.vue';
import TrendingCarousel from '../carousels/TrendingCarousel.vue';


export default{
    data(){
        return {
            store
        }
    },
    components: {
        TrendingCarousel,
        DiscoverCarousel
    },
}
</script>

<template>
    <div class="row h-100">
        <TrendingCarousel trendingString="all"/>
    </div>
    <DiscoverCarousel discoverString="movie" carouselTitle="Film che potrebbero interessarti" class="mb-5"/>
    <DiscoverCarousel discoverString="tv" carouselTitle="Serie TV da guardare" class="mb-5"/>
</template>

<style scoped lang="scss">

</style>