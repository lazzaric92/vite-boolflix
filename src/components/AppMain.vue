<script>
import axios from 'axios';
import { store } from "../store.js";

import MainCardsList from './MainCardsList.vue';

export default{
    data(){
        return {
            store,
        }
    },
    
    components: {
        MainCardsList
    }
}
</script>

<template>
    <main class="py-4 h-100">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <MainCardsList class="col-10 mx-auto" />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

    main {
        margin-top: 60px;
        overflow-y: auto;
    }
</style>