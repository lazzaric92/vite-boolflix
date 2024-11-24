<script>
import { store } from '../../store';
import DiscoverCarousel from '../carousels/DiscoverCarousel.vue';
import GenreCarousel from '../carousels/GenreCarousel.vue';
import TrendingCarousel from '../carousels/TrendingCarousel.vue';


export default{
    data(){
        return {
            store
        }
    },
    components:{
        TrendingCarousel,
        DiscoverCarousel,
        GenreCarousel
    }
}
</script>

<template>
    <div class="row h-100">
        <TrendingCarousel trendingString="tv" minSlideNumber="0" maxSlideNumber="5" />
    </div>
    <DiscoverCarousel discoverString="tv" carouselTitle="I film più popolari" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie animate" genreId="16" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Crime" genreId="80" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie drammatiche" genreId="18" class="mb-5"/>
    <div class="row h-100">
        <TrendingCarousel trendingString="tv" minSlideNumber="5" maxSlideNumber="10" />
    </div>
    <GenreCarousel discoverString="tv" carouselTitle="Mistero" genreId="9648" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie sci-fi e fantasy" genreId="10765" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie per tutta la famiglia" genreId="10751" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie per i più piccoli" genreId="10762" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie documentario" genreId="99" class="mb-5"/>
</template>

<style scoped lang="scss">

</style>