<script>
import HeaderSearch from './HeaderSearch.vue';

export default{
    data(){
        return {
            
        }
    },
    components: {
        HeaderSearch
    }
}
</script>

<template>
    <header class="fixed-top">
        <nav class="navbar border-bottom border-bottom-0" data-bs-theme="dark">
            <div class="container-fluid">
                <a href="#" class="navbar-brand fw-bold">Boolflix</a>
                <ul class="navbar-nav flex-row fw-bold">
                    <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link active">Home</a>
                    </li>
                    <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link">Film</a>
                    </li>
                    <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link">Serie TV</a>
                    </li>
                    <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link">Generi</a>
                    </li>
                    <li class="nav-item px-lg-2">
                        <a href="#" class="nav-link">Preferiti</a>
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
        background-color: $my_bg-dark;

        .navbar-brand {
            color: $my_logo-color;
        }
    }

    .navbar-nav li:hover {
        color: white;
        background-color: #212529;
    }
</style>