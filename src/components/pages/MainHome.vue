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
    },
}
</script>

<template>
    <div class="row h-100">
        <TrendingCarousel trendingString="all" minSlideNumber="0" maxSlideNumber="5" />
    </div>
    <DiscoverCarousel discoverString="movie" carouselTitle="Film del momento" class="mb-5"/>
    <DiscoverCarousel discoverString="tv" carouselTitle="Serie TV da guardare" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie TV animate" genreId="16" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film drammatici" genreId="18" class="mb-5"/>
    <div class="row h-100">
        <TrendingCarousel trendingString="all" minSlideNumber="5" maxSlideNumber="10" />
    </div>
    <GenreCarousel discoverString="movie" carouselTitle="Film romantici" genreId="10749" class="mb-5"/>
    <GenreCarousel discoverString="tv" carouselTitle="Serie TV d'azione" genreId="10759" class="mb-5"/>
    <GenreCarousel discoverString="movie" carouselTitle="Film crime e thriller" genreId="80" class="mb-5"/>
</template>

<style scoped lang="scss">

</style>