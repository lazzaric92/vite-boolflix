<script>
import { store } from "../../store.js";
import CardsListFilter from "./CardsListFilter.vue";
import CardsListSingleCard from "./CardsListSingleCard.vue";
import CardsListPagesButtons from "./CardsListPagesButtons.vue";

export default{
    data(){
        return {
            store
        }
    },
    components: {
        CardsListFilter,
        CardsListSingleCard,
        CardsListPagesButtons
    }
}
</script>

<template>
    <section class="h-100">
        <div class="container d-flex flex-column h-100">
            <CardsListFilter />
            <div class="row" v-if="(this.store.radioValue === 'movies')">
                <CardsListSingleCard v-for="(result, id) in this.store.moviesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else-if="(this.store.radioValue === 'series')">
                <CardsListSingleCard v-for="(result, id) in this.store.tvSeriesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else>
                <CardsListSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <CardsListPagesButtons v-if="this.store.resultsList.length > 0" />
        </div>
    </section>
</template>

<style scoped lang="scss">

</style>