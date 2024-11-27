<script>
import axios from 'axios';

export default{
    data(){
        return {
            itemInfo: [],
        }
    },
    methods: {
        getInfo(){
            axios.get(`https://api.themoviedb.org/3/${this.$route.params.media}/${this.$route.params.id}`, {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT",
                }
            })
            .then((response) => {
                // console.log(response.data);
                this.itemInfo = response.data;
                console.log(this.itemInfo);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(function(){
                //
            }); 
        },
        getYear(date){
            const dateArray = date.split('-');
            return dateArray[0];
        },
        printInfo(){
            // console.log(this.$route.params.id, this.$route.params.media);
        },
    },
    created(){
        this.printInfo();
        this.getInfo();
    }
}
</script>

<template>
    <div class="col-12 h-100">
        <div class="d-flex h-100">
            <!-- info -->
            <div class="item-info h-100 d-flex flex-column justify-content-center ps-4 pe-2">
                <h1 class="mb-3 ps-2">{{(this.$route.params.media === 'movie') ? itemInfo.title : itemInfo.name }}</h1>
                <h2 class="text-secondary ps-2 " v-if="itemInfo.title !== itemInfo.original_title || itemInfo.name !== itemInfo.original_name">{{ (this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name }}</h2>
                <p v-if="itemInfo.tagline" class="fst-italic ps-2">{{ itemInfo.tagline }}</p>
                <p class="mb-3">{{ itemInfo.overview }}</p>
                <p v-if="this.$route.params.media === 'movie'">
                    <span class="me-2">{{ getYear(itemInfo.release_date) }}</span>
                    <span>{{ itemInfo.runtime }} min</span>
                </p>
                <p v-else>
                    <span class="me-2">{{ getYear(itemInfo.first_air_date) }}</span>
                    <span class="me-2">-</span>
                    <span v-if="itemInfo.in_production === 1 || itemInfo.status === 'Returning Series'" class="me-2">in produzione</span>
                    <span v-if="itemInfo.status === 'Ended'" class="me-2">conclusa</span>
                    <span v-if="itemInfo.status === 'Canceled'" class="me-2">cancellata</span>
                    <span class="me-2">{{ itemInfo.number_of_seasons }} {{ (itemInfo.number_of_seasons === 1) ? 'stagione' : 'stagioni' }}</span>
                    <span class="me-2">{{ itemInfo.number_of_episodes }} episodi</span>
                    <span v-if="itemInfo.episode_run_time.length === 1" class="me-2">{{ itemInfo.episode_run_time[0] }} min</span>
                </p>

            </div>

            <!-- image -->
            <div class="item-img h-100">
                <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                <img v-if="itemInfo.backdrop_path == null" src="../../assets/img/mockup-movie-poster.jpeg" :alt="(this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name + ' has no poster'">
                <img v-else :src="`https://image.tmdb.org/t/p/w1280/${itemInfo.backdrop_path}`" :alt="(this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name" >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-info{
    width: 40%;
    color: white;
}

.item-img{
    width: 60%;
    position: relative;

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        overflow-x: clip;
    }

    .dark_overlay{
        top: 0;
        left: 0;
        background: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,0.7) 20%, rgba(255,255,255,0)50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,1) 100%);
    }
}
</style>

<!-- 
! TV
poster_path  |  backdrop_path
name
original_name*
overview
created_by -- array
genres -- array
networks
homepage*
first_air_date
number_of_seasons
number_of_episodes
episode_run_time*
in_production*
origin_country -- array
original_language
production_companies -- array
production_countries -- array
seasons -- array
status*
tagline*
vote_average
vote_count

? spoken_languages

! MOVIE
poster_path  |  backdrop_path
title
original_title*
overview
homepage*
genres -- array
origin_country -- array
original_language
production_companies -- array
production_countries -- array
release_date
runtime
status
tagline*
vote_average
vote_count
belongs_to_collection

? spoken_languages
-->