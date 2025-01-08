<script>
import { store } from "../../store.js";
import CardsListFilter from "./CardsListFilter.vue";
import CardsListSingleCard from "./CardsListSingleCard.vue";
import CardsListPagesButtons from "./CardsListPagesButtons.vue";
import CardsListPagesIndex from "./CardsListPagesIndex.vue";
import AppLoader from "./AppLoader.vue";

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
        CardsListPagesIndex,
        AppLoader
    },
    methods: {
        updateMoviesList(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                this.store.moviesList = response.data.results;
                // console.log(this.store.moviesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.moviesList];
            })
            .catch((error) => {
                console.log(error);
                this.$router.push({name: 'not-found'});
            })
            .finally(() => {
                //
            });            
        },
        updateTVSeriesList(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                query: this.store.searchedString,
                language: "it-IT",
                page: this.store.currentPage
                }
            })
            .then((response) => {
                this.store.tvSeriesList = response.data.results;
                console.log(this.store.tvSeriesList);
                this.store.resultsList = [...this.store.resultsList, ...this.store.tvSeriesList];
            })
            .catch((error) => {
                console.log(error);
                this.$router.push({name: 'not-found'});
            })
            .finally(() => {
                //
            }); 
        },
        updateSearchResults(){
            if(this.store.searchedString !== ""){
                this.store.resultsList = [];
                this.updateMoviesList();
                this.updateTVSeriesList();
            }
        },
    },
}
</script>

<template>
    <section v-if="this.store.searchLoading === true" class="h-100">
        <AppLoader />
    </section>
    <section v-else class="h-100">
        <div v-if="this.store.resultsList.length > 0" class="container d-flex flex-column h-100">
            <CardsListFilter />
            <div class="row" v-if="(this.store.radioValue === 'movies')">
                <CardsListSingleCard v-for="(result, id) in this.store.moviesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else-if="(this.store.radioValue === 'tv')">
                <CardsListSingleCard v-for="(result, id) in this.store.tvSeriesList" :key="result.id" :singleCard = "result"/>
            </div>
            <div class="row" v-else>
                <CardsListSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <!-- <CardsListPagesButtons v-if="this.store.resultsList.length > 0" /> -->
            <CardsListPagesIndex v-if="this.store.resultsList.length > 0" />
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