<script>
import { store } from "../store.js";
import MainSingleCard from "./MainSingleCard.vue";
import MainPagesButtons from "./MainPagesButtons.vue";

export default{
    data(){
        return {
            store
        }
    },
    methods: {
        
    },
    components: {
        MainSingleCard,
        MainPagesButtons
    }
}
</script>

<template>
    <section class="h-100">
        <div class="container d-flex flex-column h-100">
            <div class="row">
                <MainSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <MainPagesButtons v-if="this.store.resultsList.length > 0" />
        </div>
    </section>
</template>

<style scoped lang="scss">
    
</style>