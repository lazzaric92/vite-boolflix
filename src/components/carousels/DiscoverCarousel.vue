<script>
import axios from 'axios';
export default{
    data(){
        return {
            discoverArray: [],
            carouselArray: [],
            no_slides: 25,
        }
    },
    props:{
        carouselTitle: String,
        discoverString : String,
    },
    methods: {
        getDiscoverList: function(){
            axios.get(`https://api.themoviedb.org/3/discover/${this.discoverString}`, {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT",
                }
            })
            .then((response) => {
                // lista film
                this.discoverArray = response.data.results;
                // console.log(this.discoverArray);
            })
            .catch((error) => {
                console.log(error);
            });            
        },
        getCarouselElements(){
            this.getDiscoverList();
            const checkingClock = setInterval(() => {
                // console.log('START');
                if(this.discoverArray.length > 0){
                    let index = 0;
                    while (index < this.no_slides){
                        this.carouselArray.push(this.discoverArray[index]);
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
        this.getCarouselElements();
    }
}

</script>

<template>
    <div class="row">
        <div class="col-12 mb-3">
            <h3 class="fs-4 text-white ms-3">{{ carouselTitle }}</h3>
        </div>
        <div class="col-12">
            <div class="d-flex w-100 position-relative">
                <div class="slide-arrow-wrapper prev d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-angle-left" class="slide-arrow"/>
                </div>

                <div class="carousel">
                    <div class="wrapper">
                        <article class="border border-light rounded" v-for="(item, index) in carouselArray">
                            <!-- <img :src="`https://image.tmdb.org/t/p/w342/${object.backdrop_path}`" :alt="(item.media_type === 'movie') ? item.title : item.name" class="h-100"> -->
                            <p>card</p>
                        </article>
                    </div>
                </div>
                
                <div class="slide-arrow-wrapper next d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-angle-right" class="slide-arrow"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

.slide-arrow-wrapper{
    cursor: pointer;
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);

    &.prev{
        top: 0;
        left: 0;
    }

    &.next{
        top: 0;
        right: 0;
    }

    .slide-arrow{
        color: white;
        opacity: .5;
        font-size: 1.2rem;
    }

    &:hover .slide-arrow{
        opacity: 1;
        scale: 1.5;
        transition: all .2s ease-in;
    }
}

.carousel {
    overflow-x: scroll;
    scrollbar-color: transparent transparent;
    width: 98vw;
    margin-left: auto;
    margin-right: auto;
}

.wrapper {
    width: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    display: grid;
    grid-gap: $my-gap;
    grid-auto-flow: column;
    
    article{
    width: calc(100vw / 5 - $my_gap * 5);
    aspect-ratio: 3/2;
    margin-right: 1rem;


        .article-img{
            overflow-x: clip;
        }
    }

    article:first-child{
        margin-left: $my_gap;
    }
}


</style>