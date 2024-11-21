<script>
import axios from 'axios';
import { store } from '../../store';

export default{
    data(){
        return {
            store,
            trendingArray: [],
            carouselArray: [],
            no_slides: 5,
            currentIndex: 0,
            carouselClock: null,
            isClockActive: false,
        }
    },
    props:{
        trendingString : String,
    },
    components: {
    },
    methods: {
        getTrendingList: function(){
            axios.get(`https://api.themoviedb.org/3/trending/${this.trendingString}/week`, {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT"
                }
            })
            .then((response) => {
                // lista film
                this.trendingArray = response.data.results;
                // console.log(this.trendingArray);
            })
            .catch((error) => {
                console.log(error);
            }); 
        },
        getCarouselElements(){
            this.getTrendingList();
            const checkingClock = setInterval(() => {
                // console.log('START');
                if(this.trendingArray.length > 0){
                    let index = 0;
                    while (index < this.no_slides){
                        this.carouselArray.push(this.trendingArray[index]);
                        index++;
                    }
                    clearInterval(checkingClock);
                    // console.log(this.carouselArray);
                    // console.log('STOP');
                }
            }, 500);
        },
        nextSlide(){
            if(this.currentIndex < this.no_slides - 1){
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },
        prevSlide(){
            if(this.currentIndex > 0){
                this.currentIndex--;
            } else {
                this.currentIndex = this.no_slides - 1;
            }
        },
        startCarouselClock(){
            if(this.isClockActive === false){
                this.carouselClock = setInterval(() => {
                    this.nextSlide();
                }, 3000);
                this.isClockActive = true;
            }
        },
        stopCarouselClock(){
            if(this.isClockActive === true){
                clearInterval(this.carouselArray);
                this.isClockActive = false;
            }
        },
        restartCarouselClock(){
            if(this.isClockActive === true){
                this.stopCarouselClock();
                this.startCarouselClock();
            }
            
        }
    },
    created(){
        this.getCarouselElements();
        this.startCarouselClock();
    }
}
</script>

<template>
    <div class="col-12">
        <div class="d-flex">
            <div class="slide-arrow-wrapper d-flex align-items-center justify-content-center">
                <font-awesome-icon icon="fa-solid fa-angle-left" @click="prevSlide()" class="slide-arrow"/>
            </div>
            <template v-for="(arrayObj, index) in carouselArray">
                <article v-if="index === this.currentIndex" class="flex-grow-1 d-flex justify-content-between mb-4">
                    <div class="article-info position-relative z-2 w-25 py-4 px-3 d-flex flex-column">
                        <div class="text-center h-75 d-flex flex-column justify-content-center align-items-center">
                            <h1 class="fs-3 text-white text-center mb-4">{{ (arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name }}</h1>
                            <h2 class="fs-4 text-secondary" v-if="arrayObj.title != arrayObj.original_title || arrayObj.name != arrayObj.original_name">{{ (arrayObj.media_type === 'movie') ? arrayObj.original_title : arrayObj.original_name }}</h2>
                        </div>
                        <div class="h-25 d-flex flex-column justify-content-center align-items-center">
                            <p class="text-white mb-4 fs-5"><font-awesome-icon icon="fa-solid fa-tag" class="me-2" /> {{ (arrayObj.media_type === 'movie') ? 'Film' : 'Serie TV' }}</p>
                            <button class="btn btn-lg">Maggiori informazioni </button>
                        </div>
                    </div>
                    <div class="article-img position-relative h-100 w-75 text-end">
                        <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                        <img :src="`https://image.tmdb.org/t/p/w1280/${arrayObj.backdrop_path}`" :alt="(arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name" class="h-100">
                    </div>
                </article>
            </template>
            <div class="slide-arrow-wrapper d-flex align-items-center justify-content-center">
                <font-awesome-icon icon="fa-solid fa-angle-right" @click="nextSlide()" class="slide-arrow"/>
            </div>
        </div>
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

    .slide-arrow-wrapper{
        cursor: pointer;
        width: 50px;

        .slide-arrow{
            color: white;
            font-size: 1.5rem;
            opacity: .3
        }

        &:hover .slide-arrow{
            opacity: 1;
            transform: scale(1.2);
            transition: all .2s ease-in;
        }
    }

    article{
        width: 90%;
        height: 600px;

        .article-info{
            box-shadow: 100px 0px 30px 0 black;

            button{
                border: 1px solid white;
                color: white;
                background-color: transparent;

                &:focus,
                &:hover{
                    transition: all .25s linear;
                    border: 1px solid black;
                    color: black;
                    background-color: white;
                }
            }

        }

        .dark_overlay{
            background: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 35%, rgba(255,255,255,0)50%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,1) 100%);
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