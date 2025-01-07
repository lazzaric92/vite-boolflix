<script>
import axios from 'axios';
import SmallerCarouselCard from './SmallerCarouselCard.vue';
import AppLoader from '../partials/AppLoader.vue';

export default{
    data(){
        return {
            discoverArray: [],
            carouselArray: [],
            tot_slides: 20,
            no_articles: 5,
            gap: 12,
            counterMax: null, // number of clicks to reach the end of the carousel,
            isLoading: false,
        }
    },
    props:{
        carouselTitle: String,
        discoverString : String,
    },
    components: {
        SmallerCarouselCard,
        AppLoader
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
            })
            .finally(() => {
                this.isLoading = false;
            });            
        },
        getCarouselElements(){
            this.getDiscoverList();
            const checkingClock = setInterval(() => {
                if(this.discoverArray.length > 0){
                    let index = 0;
                    while (index < this.tot_slides){
                        this.carouselArray.push(this.discoverArray[index]);
                        index++;
                    }
                    clearInterval(checkingClock);
                    // console.log(this.carouselArray);
                    this.checkArrows();
                }
            }, 500);
        },
        checkArrows(){
            // since the counter reset when refreshing the page but firefox maintain the carousel position, in this way the arrows display is fixed
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const wrapperEl = document.querySelector('.carousel > .wrapper');
            // wrapperEl is null in the beginning so this function needs to be called in the getCarouselElements function

            // nextBtn display
            if((Math.floor(wrapperEl.scrollLeft / wrapperEl.offsetWidth) + 1) >= this.counterMax){
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'flex';
            }

            // prevBtn display
            if(wrapperEl.scrollLeft <= 0){
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
            };
        },
        getCounterMax(){
            if(this.tot_slides % this.no_articles === 0){
                this.counterMax = this.tot_slides / this.no_articles - 1;
            } else {
                this.counterMax = Math.floor(this.tot_slides / this.no_articles);
            }
        },
        clickHandle(e){
            // DOM ELEMENTS
            const prevBtn = e.currentTarget.parentElement.children[0];
            const carouselEl = e.currentTarget.parentElement.children[1];
            const nextBtn = e.currentTarget.parentElement.children[2];
            const wrapperEl = carouselEl.children[0];
            const articleWidth = wrapperEl.children[0].offsetWidth;

            if(e.currentTarget.classList.contains('next')){
                // scroll behaviour
                wrapperEl.scrollBy((this.gap * this.no_articles + articleWidth * this.no_articles + 80), 0);

                // nextBtn display
                if(Math.floor(wrapperEl.scrollLeft / wrapperEl.offsetWidth) + 1 >= this.counterMax - 1){
                    nextBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'flex';
                }

                // prevBtn display
                prevBtn.style.display = 'flex';

            } else if(e.currentTarget.classList.contains('prev')){
                // scroll behaviour
                wrapperEl.scrollBy(-(this.gap * this.no_articles + articleWidth * this.no_articles + 80), 0);

                // prevBtn display
                if(wrapperEl.scrollLeft / wrapperEl.offsetWidth <= 1){
                    prevBtn.style.display = 'none';
                } else {
                    prevBtn.style.display = 'flex';
                };

                // nextBtn display
                nextBtn.style.display = 'flex';
            }
        }
    },
    created(){
        this.getCarouselElements();
        this.getCounterMax();
        this.isLoading = true;
    }
}

</script>

<template>
    <div v-if="isLoading === false" class="row">
        <div class="col-12 mb-3">
            <h3 class="fs-4 text-white ms-3">{{ carouselTitle }}</h3>
        </div>
        <div class="col-12">
            <div class="d-flex w-100 position-relative">
                <div class="slide-arrow-wrapper prev" @click="clickHandle">
                    <font-awesome-icon icon="fa-solid fa-angle-left" class="slide-arrow" />
                </div>

                <div class="carousel">
                    <div class="wrapper">
                        <article v-for="(obj, index) in carouselArray">
                            <SmallerCarouselCard :item="obj" />
                        </article>
                    </div>
                </div>
                
                <div class="slide-arrow-wrapper next" @click="clickHandle">
                    <font-awesome-icon icon="fa-solid fa-angle-right" class="slide-arrow" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="row">
        <div class="col-12">
            <AppLoader />
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
    width: $arrow-wrapper-width;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .slide-arrow{
        color: white;
        opacity: .5;
        font-size: 1.2rem;
    }
    
    &:hover{
        background-color: rgba(0, 0, 0, 0.8);
        transition: all .2s ease-in;

        .slide-arrow{
            opacity: 1;
            scale: 1.5;
            transition: all .2s ease-in;
        }
    }

    &.prev{
        top: 0;
        left: 0;
        display: none;
    }

    &.next{
        top: 0;
        right: 0;
    }
}

.carousel {
    overflow-x: auto;
    scrollbar-color: transparent transparent;
    width: 98vw;
    margin-left: auto;
    margin-right: auto;
}

.wrapper {
    width: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    display: grid;
    grid-gap: $my-gap;
    grid-auto-flow: column;
    
    article{
    width: calc((100vw - $my_gap * 6) / 6 );
    aspect-ratio: 3/2;
    margin-right: 1rem;
    cursor: pointer;
    border-radius: 12px;

        
    }

    article:first-child{
        margin-left: $arrow-wrapper-width + $my_gap;
    }

    article:last-child{
        margin-right: $arrow-wrapper-width + $my_gap;
    }
}


</style>