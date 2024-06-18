<script>
import { store } from "../store.js";
import SingleCardImage from "./SingleCardImage.vue";
import SingleCardInfo from "./SingleCardInfo.vue";

export default{
    data(){
        return {
            store,
            voteArray: [],
            isHover: false,
        }
    },
    methods: {
        
    },
    props: {
        singleCard: {
            type: Object,
            required: true
        }
    },
    components: {
        SingleCardImage,
        SingleCardInfo,
    }
}
</script>

<template>
    <article class="mb-4" @mouseover="isHover = true" @mouseleave="isHover = false">
        <div class="card h-100 overflow-hidden">
            <div v-if="isHover" class="card-info h-100 d-flex flex-column justify-content-between">
                <SingleCardInfo :singleCard="singleCard"/>
            </div>
            <div v-else class="card-image h-100" >
                <SingleCardImage :singleCard="singleCard"/>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
    article {
        width: calc(100% / 5);
        aspect-ratio: 3/4;
        cursor: pointer;

        .card-info {
            background-color: $my_bg-dark;
            color: white;
        }
    }
</style>