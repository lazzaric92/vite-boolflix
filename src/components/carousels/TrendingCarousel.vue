<script>
import axios from 'axios';
import { store } from '../../store';

export default{
    data(){
        return {
            trendingArray: [],
            carouselArray: [],
            currentIndex: 0,
            store
        }
    },
    components: {
    },
    methods: {
        getTrendingList: function(){
            axios.get(`https://api.themoviedb.org/3/trending/${this.store.trendingString}/week`, {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT"
                }
            })
            .then((response) => {
                // lista film
                this.trendingArray = response.data.results;
                console.log(this.trendingArray);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        getCarouselElements(){
            this.getTrendingList();
            const checkingClock = setInterval(() => {
                // console.log('START');
                if(this.trendingArray.length > 0){
                    let index = 0;
                    while (index < 5){
                        this.carouselArray.push(this.trendingArray[index]);
                        index++;
                    }
                    clearInterval(checkingClock);
                    console.log(this.carouselArray);
                    // console.log('STOP');
                }
            }, 500);
        }
    },
    created(){
        this.getCarouselElements()
    }
}
</script>

<template>
    <div class="col-12 d-flex flex-column align-items-center">
        <template v-for="(arrayObj, index) in carouselArray">
            <article v-if="index === this.currentIndex" class="d-flex justify-content-between mb-4">
                <div class="article-info position-relative z-2 w-25 py-4 px-3 d-flex flex-column">
                    <div class="text-center h-75 d-flex flex-column justify-content-center align-items-center">
                        <h1 class="fs-3 text-white text-center mb-4">{{ (arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name }}</h1>
                        <h2 class="fs-4 text-secondary" v-if="arrayObj.title != arrayObj.original_title || arrayObj.name != arrayObj.original_name">{{ (arrayObj.media_type === 'movie') ? arrayObj.original_title : arrayObj.original_name }}</h2>
                    </div>
                    <div class="h-25 d-flex justify-content-center align-items-center">
                        <button class="btn btn-lg btn-outline-light">Maggiori informazioni </button>
                    </div>
                </div>
                <div class="article-img position-relative h-100 w-75 text-end">
                    <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                    <img :src="`https://image.tmdb.org/t/p/w1280/${arrayObj.backdrop_path}`" :alt="(arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name" class="h-100">
                </div>
            </article>
        </template>
        <div class="w-100 d-flex justify-content-center align-items-center pt-2">
            <template v-for="(arrayObj, index) in carouselArray">
                <div class="carousel-dot rounded-circle p-1 mx-3" :class="(index === this.currentIndex) ? 'bg_active' : 'bg-white'" @click="this.currentIndex = index">
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

    article{
        width: 90%;
        height: 600px;

        .article-info{
            box-shadow: 100px 0px 30px 0 black;
        }

        .dark_overlay{
            background: linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%);
        }

        .article-img{
            overflow-x: clip;
        }
    }

    .bg_active{
        background-color: $my_logo-color;
    }

    .carousel-dot {
        cursor: pointer;
    }
</style>