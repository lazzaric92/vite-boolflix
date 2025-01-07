<script>
import { store } from "../../store.js";
import CardsListFilter from "./CardsListFilter.vue";
import CardsListSingleCard from "./CardsListSingleCard.vue";
import CardsListPagesButtons from "./CardsListPagesButtons.vue";
import CardsListPagesIndex from "./CardsListPagesIndex.vue";

export default{
    data(){
        return {
            store
        }
    },
    components: {
        CardsListFilter,
        CardsListSingleCard,
        CardsListPagesButtons,
        CardsListPagesIndex
    }
}
</script>

<template>
    <section class="h-100">
        <div v-if="this.store.resultsList.length > 0" class="container d-flex flex-column h-100">
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
            <!-- <CardsListPagesIndex v-if="this.store.resultsList.length > 0" /> -->
        </div>
        <div v-else class="container d-flex flex-column h-100">
            <p class="no-results text-white text-center mt-5">Nessun risultato</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
    p.no-results{
        font-size: 1.5rem;
        text-wrap: wrap;
    }
</style>