<script>
import { RouterLink } from "vue-router";
import { store } from "../../store";
import SingleCardImage from "./card/SingleCardImage.vue";
import SingleCardInfo from "./card/SingleCardInfo.vue";

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
        <RouterLink :to="{ name: 'info', params: {media: (singleCard.title ? 'movie' : 'tv'), id: singleCard.id} }" class="text-decoration-none">
        <div class="card h-100 overflow-hidden">
                <div v-if="isHover" class="card-info h-100 d-flex flex-column justify-content-between">
                    <SingleCardInfo :singleCard="singleCard"/>
                </div>
                <div v-else class="card-image h-100" >
                    <SingleCardImage :singleCard="singleCard"/>
                </div>
            </div>
        </RouterLink>
    </article>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;
    article {
        width: calc(100% / 5);
        aspect-ratio: 3/4;
        cursor: pointer;

        .card-info {
            background-color: black;
            color: white;
        }
    }
</style>