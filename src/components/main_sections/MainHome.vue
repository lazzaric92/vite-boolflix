<script>
import { store } from '../../store';
import TrendingAll from '../carousels/TrendingAll.vue';


export default{
    data(){
        return {
            store
        }
    },
    components: {
        TrendingAll
    }
}
</script>

<template>
    <div class="row h-100">
        <TrendingAll />
    </div>
</template>

<style scoped lang="scss">

</style>