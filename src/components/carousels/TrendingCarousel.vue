<script>
import axios from 'axios';
import { store } from '../../store';
import { RouterLink } from 'vue-router';
import AppLoader from '../partials/AppLoader.vue';

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
            isLoading: false,
        }
    },
    props:{
        trendingString : String,
        minSlideNumber: String,
        maxSlideNumber: String,
    },
    components: {
        AppLoader
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
                this.$router.push({name: 'not-found'});
            })
            .finally(() => {
                this.isLoading = false;
            }); 
        },
        getCarouselElements(){
            this.getTrendingList();
            const checkingClock = setInterval(() => {
                // console.log('START');
                if(this.trendingArray.length > 0){
                    for(let index = Number.parseInt(this.minSlideNumber); index < Number.parseInt(this.maxSlideNumber); index++){
                        this.carouselArray.push(this.trendingArray[index]);
                    }
                }
                    clearInterval(checkingClock);
                    // console.log(this.carouselArray);
                    // console.log('STOP');
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
        this.isLoading = true;
    }
}
</script>

<template>
    <div v-if="isLoading === false" class="col-12">
        <div class="d-flex">
            <div class="slide-arrow-wrapper d-flex align-items-center justify-content-center">
                <font-awesome-icon icon="fa-solid fa-angle-left" @click="prevSlide()" class="slide-arrow"/>
            </div>

            <!-- article -->
            <template v-for="(arrayObj, index) in carouselArray">
                <article v-if="index === this.currentIndex" class="flex-grow-1 d-flex justify-content-between mb-4">

                    <!-- info -->
                    <div class="article-info position-relative z-2 w-25 py-4 px-3 d-flex flex-column">
                        <div class="text-center h-75 d-flex flex-column justify-content-center align-items-center">
                            <h1 class="fs-3 text-white text-center mb-4">{{ (arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name }}</h1>
                            <h2 class="fs-4 text-secondary" v-if="arrayObj.title != arrayObj.original_title || arrayObj.name != arrayObj.original_name">{{ (arrayObj.media_type === 'movie') ? arrayObj.original_title : arrayObj.original_name }}</h2>
                        </div>
                        <div class="h-25 d-flex flex-column justify-content-center align-items-center">
                            <p v-if="$route.name === 'home'" class="text-white mb-4 fs-5"><font-awesome-icon icon="fa-solid fa-tag" class="me-2" /> {{ (arrayObj.media_type === 'movie') ? 'Film' : 'Serie TV' }}</p>
                            <RouterLink :to="{ name: 'info', params: {media: arrayObj.media_type, id: arrayObj.id} }">
                                <button class="btn btn-lg">Maggiori informazioni </button>
                            </RouterLink>
                        </div>
                    </div>

                    <!-- image -->
                    <div class="article-img position-relative h-100 w-75 text-end">
                        <RouterLink :to="{ name: 'info', params: {media: arrayObj.media_type, id: arrayObj.id} }">
                            <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                            <img :src="`https://image.tmdb.org/t/p/w1280/${arrayObj.backdrop_path}`" :alt="(arrayObj.media_type === 'movie') ? arrayObj.title : arrayObj.name" class="h-100 w-100 ">
                        </RouterLink>
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
    <div v-else class="col-12">
        <AppLoader />
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
            background: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 15%, rgba(0,0,0,0.7) 25%, rgba(255,255,255,0)50%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,1) 100%);
            
        }

        .article-img{
            object-fit: cover;
            object-position: center;
            overflow-x: clip;
            box-shadow: 20px 0px 30px 20px rgb(0,0,0,) inset;
            
            img{
                object-fit: cover;
                object-position: center;
            }
        }
    }

    .bg_active{
        background-color: $my_logo-color;
    }

    .carousel-dot {
        cursor: pointer;
    }
</style>