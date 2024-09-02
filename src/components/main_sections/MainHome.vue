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
    },
}
</script>

<template>
    <div class="row h-100">
        <TrendingCarousel />
    </div>
</template>

<style scoped lang="scss">

</style>