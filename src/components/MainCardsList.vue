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
    <section class="h-100">
        <div class="container d-flex flex-column h-100">
            <div class="row">
                <MainSingleCard v-for="(result, id) in this.store.resultsList" :key="result.id" :singleCard = "result"/>
            </div>
            <div v-if="this.store.resultsList.length > 0" class="d-flex justify-content-between align-itms-center mt-auto">
                <button>
                    <font-awesome-icon icon="fa-solid fa-circle-arrow-left" />
                </button>
                <button>
                    <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    button {
        color: #8b8e91;
        background-color: transparent;
        border: none;
        font-size: 1.3rem;
    }
</style>