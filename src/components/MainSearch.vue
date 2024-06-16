<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            store,
        }
    },
    methods: {
        
    }
}
</script>

<template>
    <div class="container mb-5">
            <div class="row align-items-center">
                <div class="col-10">
                    <div class="form-floating">
                        <input type="search" class="form-control" id="search-input" placeholder="Search" v-model="this.store.searchedString">
                        <label for="search-input">Search</label>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" @click="$emit('search')">CLICK ME</button>
                </div>
            </div>
        </div>
</template>

<style scoped lang="scss">

</style>