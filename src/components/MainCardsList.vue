<script>
import { store } from "../store.js";
import MainSingleCard from "./MainSingleCard.vue"

export default{
    data(){
        return {
            store
        }
    },
    components: {
        MainSingleCard
    }
}
</script>

<template>
    <section>
        <div class="container">
            <div class="row">
                <MainSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

</style>