<script>
import { store } from "../store.js";
import MainCardsFilter from "./MainCardsFilter.vue";
import MainSingleCard from "./MainSingleCard.vue";
import MainPagesButtons from "./MainPagesButtons.vue";

export default{
    data(){
        return {
            store
        }
    },
    components: {
        MainCardsFilter,
        MainSingleCard,
        MainPagesButtons
    }
}
</script>

<template>
    <section class="h-100">
        <div class="container d-flex flex-column h-100">
            <MainCardsFilter />
            <div class="row" v-if="(this.store.radioValue === 'movies')">
                <MainSingleCard v-for="(result, id) in this.store.moviesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else-if="(this.store.radioValue === 'series')">
                <MainSingleCard v-for="(result, id) in this.store.tvSeriesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else>
                <MainSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <MainPagesButtons v-if="this.store.resultsList.length > 0" />
        </div>
    </section>
</template>

<style scoped lang="scss">

</style>