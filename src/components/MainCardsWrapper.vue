<script>
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
    <div class="row h-100">
        <MainCardsList class="col-10 mx-auto" />
    </div>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
</style>