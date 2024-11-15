<script>
import axios from 'axios';
import SmallerCarouselCard from './SmallerCarouselCard.vue';

export default{
    data(){
        return {
            discoverArray: [],
            carouselArray: [],
            tot_slides: 25,
            no_articles: 5,
            gap: 12,
            counter: 0,
            counterMax: null,
        }
    },
    props:{
        carouselTitle: String,
        discoverString : String,
    },
    components: {
        SmallerCarouselCard
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
                if(this.discoverArray.length > 0){
                    let index = 0;
                    while (index < this.tot_slides){
                        this.carouselArray.push(this.discoverArray[index]);
                        index++;
                    }
                    clearInterval(checkingClock);
                    console.log(this.carouselArray);
                }
            }, 500);
        },
        clickHandle(e){
            // DOM ELEMENTS
            const prevBtn = e.currentTarget.parentElement.children[0];
            const carouselEl = e.currentTarget.parentElement.children[1];
            const nextBtn = e.currentTarget.parentElement.children[2];
            const wrapperEl = carouselEl.children[0];
            const articleWidth = wrapperEl.children[0].offsetWidth;


            if(e.currentTarget.classList.contains('next')){
                if(this.counter < this.counterMax){
                    this.counter ++;
                }
                wrapperEl.scrollBy((this.gap * this.no_articles + articleWidth * this.no_articles + 80), 0);

                // nextBtn display
                if(this.counter >= this.counterMax){
                    nextBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'flex';
                }

                // prevBtn display
                prevBtn.style.display = 'flex';

            } else if(e.currentTarget.classList.contains('prev')){
                wrapperEl.scrollBy(-(this.gap * this.no_articles + articleWidth * this.no_articles + 80), 0);
                if(this.counter > 0){
                    this.counter--;
                }

                // prevBtn display
                if(this.counter === 0){
                    prevBtn.style.display = 'none';
                } else {
                    prevBtn.style.display = 'flex';
                };

                // nextBtn display
                nextBtn.style.display = 'flex';
            }
        },
        getCounterMax(){
            if(this.tot_slides % this.no_articles === 0){
                this.counterMax = this.tot_slides / this.no_articles - 1;
            } else {
                this.counterMax = Math.floor(this.tot_slides / this.no_articles);
            }
        }
    },
    created(){
        this.getCarouselElements();
        this.getCounterMax();
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
                <div class="slide-arrow-wrapper prev" @click="clickHandle">
                    <font-awesome-icon icon="fa-solid fa-angle-left" class="slide-arrow" />
                </div>

                <div class="carousel">
                    <div class="wrapper">
                        <article class="border border-light rounded" v-for="(obj, index) in carouselArray" @click="console.log(obj.title)">
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
    background-color: rgba(0, 0, 0, 0.5);

    &.prev{
        top: 0;
        left: 0;
        display: none;
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


        .article-img{
            overflow-x: clip;
        }
    }

    article:first-child{
        margin-left: $arrow-wrapper-width + $my_gap;
    }

    article:last-child{
        margin-right: $arrow-wrapper-width + $my_gap;
    }
}


</style>