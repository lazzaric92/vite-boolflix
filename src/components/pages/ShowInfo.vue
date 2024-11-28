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
        adjustVote(vote){
            let newVote = vote / 2;
            if(!Number.isInteger(newVote) && newVote !== 5){
                newVote = Math.floor(newVote) + 1;
            }

            this.voteArray = [0, 0, 0, 0, 0];
            this.voteArray.fill(1, 0, newVote);
            return this.voteArray;
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
    <div class="col-12 h-100 mb-4">
        <div class="d-flex h-100">
            <!-- || info -->
            <div class="item-info h-100 d-flex flex-column justify-content-center ps-4 pe-2">
                <h1 class="mb-3 ps-2">{{(this.$route.params.media === 'movie') ? itemInfo.title : itemInfo.name }}</h1>
                <p class="text-secondary ps-2 mb-3 fs-3" v-if="itemInfo.title !== itemInfo.original_title || itemInfo.name !== itemInfo.original_name">{{ (this.$route.params.media_type === 'movie') ? itemInfo.original_title : itemInfo.original_name }}</p>
                <p v-if="itemInfo.tagline" class="fst-italic ps-2">{{ itemInfo.tagline }}</p>
                <p class="mb-3">{{ itemInfo.overview }}</p>

                <!-- # movie info -->
                <p v-if="this.$route.params.media === 'movie'" class="text-secondary">
                    <!-- year -->
                    <span class="me-2">{{ getYear(itemInfo.release_date) }}</span>
                    <span class="me-2 dot"></span>
                    <!-- runtime -->
                    <span>{{ itemInfo.runtime }} min</span>
                </p>

                <!-- # tv info -->
                <p v-else class="text-secondary">
                    <!-- year -->
                    <span class="me-2">{{ getYear(itemInfo.first_air_date) }}</span>
                    <span class="me-2">-</span>
                    <!-- status -->
                    <span v-if="itemInfo.in_production === 1 || itemInfo.status === 'Returning Series'" class="me-2">in produzione</span>
                    <span v-if="itemInfo.status === 'Ended'" class="me-2">conclusa</span>
                    <span v-if="itemInfo.status === 'Canceled'" class="me-2">cancellata</span>
                    <span class="me-2 dot"></span>
                    <!-- number of seasons -->
                    <span class="me-2">{{ itemInfo.number_of_seasons }} {{ (itemInfo.number_of_seasons === 1) ? 'stagione' : 'stagioni' }}</span>
                    <span class="me-2 dot"></span>
                    <!-- number of episodes -->
                    <span class="me-2">{{ itemInfo.number_of_episodes }} episodi</span>
                    <!-- runtime -->
                    <span v-if="itemInfo.episode_run_time.length > 0" class="me-2 dot"></span>
                    <span v-if="itemInfo.episode_run_time.length === 1" class="me-2">{{ itemInfo.episode_run_time[0] }} min</span>
                </p>

                <!-- # genres -->
                <p class="genres">
                    <span v-for="(genre, index) in itemInfo.genres">
                        <span class="text-decoration-underline fw-bold mb-3">{{ genre.name }}</span>
                        <span v-if="index < itemInfo.genres.length - 1" class="mx-2 dot"></span>
                    </span>
                </p>

                <p class="mb-5">
                <!-- # original language -->
                <span class="lang-icon me-3" :class="`lang-icon-${itemInfo.original_language}` "></span>
                
                <!-- # vote -->
                    <span v-for="(point, index) in adjustVote(itemInfo.vote_average)" :key="point.index">
                        <font-awesome-icon v-if="(point === 0)" icon="fa-regular fa-star" size="xs" />
                        <font-awesome-icon v-else icon="fa-solid fa-star" size="xs" />
                    </span>
                    <span class="ms-2">({{ itemInfo.vote_count }})</span>
                </p>
            </div>

            <!-- || image -->
            <div class="item-img h-100">
                <div class="dark_overlay position-absolute z-1 w-100 h-100"></div>
                <img v-if="itemInfo.backdrop_path == null" src="../../assets/img/mockup-movie-poster.jpeg" :alt="(this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name + ' has no poster'">
                <img v-else :src="`https://image.tmdb.org/t/p/w1280/${itemInfo.backdrop_path}`" :alt="(this.$route.params.media_type === 'movie') ? itemInfo.title : itemInfo.name" >
            </div>
        </div>
    </div>
    <div class="col-12 ps-4 pe-2 add_info">
        <!-- # homepage -->
        <p v-if="itemInfo.homepage" class="mb-4">
            <a class="text-white fst-italic" :href="itemInfo.homepage">Vai al sito</a>
        </p>

        <!-- # networks -->
        <div v-if="itemInfo.networks" class="networks mb-5">
            <p class="fs-5" v-if="itemInfo.networks.length > 0">Guarda su:</p>
            <!-- <span v-for="(network, index) in itemInfo.networks" :title="network.name">
                <span class="network-name fw-bold">{{ network.name }}</span>
                <span v-if="index < itemInfo.networks.length - 1" class="dot mx-3"></span>
            </span> -->
            <div class="networks mb-3">
                <div v-for="network in itemInfo.networks" class="d-inline-block mx-2" :title="network.name">
                    <img v-if="network.logo_path" :src="`https://image.tmdb.org/t/p/w154/${network.logo_path}`" :alt="network.name" >
                    <span v-else>{{ network.name }}</span>
                </div>
            </div>
        </div>

        <!-- # production -->
        <p v-if="itemInfo.created_by" class="mb-3">
            <span>Creato da:</span>
            <span v-for="author in itemInfo.created_by" class="ms-3 text-secondary">{{ author.name }}</span>
        </p>
        <p class="mb-3" v-if="itemInfo.production_companies.length > 0">
            <span class="me-3" v-if="itemInfo.created_by.length > 0">Prodotto da:</span>
            <span v-for="(studio, index) in itemInfo.production_companies" :title="studio.name">
                <span class="fw-bold text-secondary">{{ studio.name }}</span>
                <span v-if="index < itemInfo.production_companies.length - 1" class="dot mx-2 text-secondary"></span>
            </span>
        </p>
        <p v-if="itemInfo.production_countries" class="mb-5">
            <span v-if="itemInfo.production_countries.length > 0">Paesi:</span>
            <span v-for="country in itemInfo.production_countries" class="ms-3 text-secondary">{{ country.name }}</span>
        </p>

        <!-- # collection -->
        <div v-if="itemInfo.belongs_to_collection">
            <p>Questo titolo fa parte della collezione</p>
            <img :src="`https://image.tmdb.org/t/p/w185/${itemInfo.belongs_to_collection.poster_path}`" :alt="itemInfo.belongs_to_collection.name">
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../../node_modules/@textabledev/langs-flags-list/lang-flags.css';
@use '../../styles/partials/variables' as *;

span.dot::after{
    content: '\2022';
}

.item-info{
    width: 40%;
    color: white;

    .lang-icon {
        background-image: url(../../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
    }

    .fa-star{
        color: orange;
    }
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

.add_info{
    color: white;
}

.networks{
    img{
        filter: brightness(75%) drop-shadow(8px 8px 20px rgba(128, 128, 128, 0.7))
    }

    // .network-name{
    //     font-size: 1.1rem;
    // }
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