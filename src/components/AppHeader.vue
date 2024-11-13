<script>
import { store } from '../store';
import HeaderSearch from './HeaderSearch.vue';

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
        setOnFalse(){
            this.store.onHomePage = false;
            this.store.onMoviesPage = false;
            this.store.onTvPage = false;
            this.store.searchModeOn = false;
        },
    },
    created(){
        this.store.onHomePage = true;
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
                    <li class="nav-item px-lg-2" :class="(this.store.onHomePage === true) ? 'page_active' : ''">
                        <a class="nav-link" @click="[setOnFalse(), (this.store.onHomePage = true)]">Home</a>
                    </li>
                    <li class="nav-item px-lg-2" :class="(this.store.onMoviesPage === true) ? 'page_active' : ''">
                        <a class="nav-link" @click="[setOnFalse(), (this.store.onMoviesPage = true)]">Film</a>
                    </li>
                    <li class="nav-item px-lg-2" :class="(this.store.onTvPage === true) ? 'page_active' : ''">
                        <a class="nav-link" @click="[setOnFalse(), (this.store.onTvPage = true)]">Serie TV</a>
                    </li>
                    <!-- <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link">Generi</a>
                    </li> -->
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

            a {
                color: white;
            }
        }

        a.nav-link{
            cursor: pointer;
        }
    }

    .navbar-nav li:hover {
        color: white;
        background-color: #212529;
    }
</style>