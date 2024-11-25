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
        <div class="d-flex">
            <div class="item-info">
                <h1 class="text-center">{{ (this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name }}</h1>
            </div>
            <div class="item-img">
                <div class="dark-overlay position-absolute z-1 w-100 h-100"></div>
                <img :src="`https://image.tmdb.org/t/p/w1280/${itemInfo.backdrop_path}`" :alt="(this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name" >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-info{
    width: 40%;
}

.item-img{
    width: 60%;
    position: relative;

    img{
        width: 100%;
        object-fit: cover;
        object-position: center;
        overflow-x: clip;
    }

    .dark_overlay{
        top: 0;
        left: 0;
        background: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 15%, rgba(0,0,0,0.7) 25%, rgba(255,255,255,0)50%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,1) 100%);
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