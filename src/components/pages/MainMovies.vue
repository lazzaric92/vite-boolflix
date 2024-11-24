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
    components: {
        TrendingCarousel,
        DiscoverCarousel,
        GenreCarousel
    }
}
</script>

<template>
    <div class="row h-100">
        <TrendingCarousel trendingString="movie" minSlideNumber="0" maxSlideNumber="5" />
    </div>
    <DiscoverCarousel discoverString="movie" carouselTitle="I film più popolari" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film per famiglie" genreId="10751" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film drammatici" genreId="18" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film romantici" genreId="10749" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film horror" genreId="27" class="mb-5"/>
    <div class="row h-100">
        <TrendingCarousel trendingString="movie" minSlideNumber="5" maxSlideNumber="10" />
    </div>
    <GenreCarousel discoverString="movie" carouselTitle="I migliori film animati" genreId="16" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film comici" genreId="35" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film fantasy" genreId="14" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Documentari" genreId="99" class="mb-5"/>
</template>

<style scoped lang="scss">

</style>