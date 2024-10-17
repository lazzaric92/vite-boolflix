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
            <div class="d-flex">
                <div class="slide-arrow-wrapper d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-angle-left" class="slide-arrow"/>
                </div>
                <div class="wrapper d-flex">
                    <template v-for="(item, index) in carouselArray" >
                        <article class="border border-light rounded">
                            <!-- <img :src="`https://image.tmdb.org/t/p/w342/${object.backdrop_path}`" :alt="(item.media_type === 'movie') ? item.title : item.name" class="h-100"> -->
                            <p>card</p>
                        </article>
                    </template>
                </div>
                
                <div class="slide-arrow-wrapper d-flex align-items-center">
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

    .slide-arrow{
        color: transparent;
    }

    &:hover .slide-arrow{
        color: white;
    }
}

article{
    width: calc(100% / 5);
    aspect-ratio: 2;
    margin-right: 1rem;

    .article-img{
        overflow-x: clip;
    }
}

.wrapper {
    overflow-x: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;

    
}


</style>