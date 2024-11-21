<script>
import { RouterLink } from 'vue-router';
import HeaderSearch from './partials/HeaderSearch.vue';
import { store } from '../store';

export default{
    data(){
        return {
            store
        }
    },
    components: {
        HeaderSearch
    },
    methods: {
    },
    created(){
        this.store.trendingString = 'all';
    }
}
</script>

<template>
    <header class="fixed-top">
        <nav class="navbar border-bottom border-bottom-0" data-bs-theme="dark">
            <div class="container-fluid">
                <a href="#" class="navbar-brand fw-bold">Boolflix</a>
                <ul class="navbar-nav flex-row fw-bold">
                    <li class="nav-item px-lg-2" :class="$route.name === 'home' ? 'page_active' : ''">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item px-lg-2" :class="$route.name === 'movies' ? 'page_active' : ''">
                        <router-link class="nav-link" to="/movies">Film</router-link>
                    </li>
                    <li class="nav-item px-lg-2" :class="$route.name === 'tv' ? 'page_active' : ''">
                        <router-link class="nav-link" to="/tv">Serie TV</router-link>
                    </li>
                </ul>
                <HeaderSearch class="w-50" />
                <ul class="navbar-nav d-flex flex-row align-items-center fw-bold">
                    <li class="nav-item mb-0">
                        <select class="form-select mb-0">
                            <option value="it">IT</option>
                            <option value="en">EN</option>
                        </select>
                    </li>
                    <li class="nav-item py-1 px-3 ms-2 text-white">
                        <font-awesome-icon icon="fa-solid fa-circle-user" size="2x" />
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
    @use '../styles/partials/variables' as *;
    header {
        background-color: black;

        .navbar-brand {
            color: $my_logo-color;
        }

        li.page_active{
            .nav-link{
                color: white;
            }
        }

        .nav-link{
            cursor: pointer;
        }
    }

    .navbar-nav li:hover {
        color: white;
        background-color: #212529;
    }
</style>