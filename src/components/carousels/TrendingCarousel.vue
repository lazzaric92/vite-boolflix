<script>
import axios from 'axios';
import { store } from '../../store';

export default{
    data(){
        return {
            trendingArray: [],
            carouselArray: [],
            currentIndex: 1,
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
    <div class="col-12 d-flex justify-content-center">
        <template v-for="(arrayObj, index) in carouselArray">
            <article v-if="index === this.currentIndex" class="d-flex justify-content-between">
                <div class="article-info position-relative z-2 w-25 py-4 px-3 d-flex flex-column justify-content-around align-items-center">
                    <h1 class="fs-3 text-white text-center">{{ (arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name }}</h1>
                    <button class="btn btn-lg btn-outline-light">Maggiori informazioni </button>
                </div>
                <div class="article-img position-relative h-100 w-75 text-end">
                    <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                    <img :src="`https://image.tmdb.org/t/p/w1280/${arrayObj.backdrop_path}`" :alt="(arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name" class="h-100">
                </div>
            </article>
        </template>
    </div>
</template>

<style scoped lang="scss">
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
</style>