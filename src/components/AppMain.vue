<script>
import axios from 'axios';
import { store } from "../store.js";
import { RouterView } from 'vue-router';

export default{
    data(){
        return {
            store,
        }
    },
    
    components: {
        
    }
}
</script>

<template>
    <main class="py-4 h-100">
        <div class="container-fluid h-100">
            <RouterView>
            </RouterView>
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