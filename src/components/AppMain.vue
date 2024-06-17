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
    <main class="p-4">
        <MainCardsList />
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