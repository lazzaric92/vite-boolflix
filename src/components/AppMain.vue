<script>
import axios from 'axios';
import { store } from "../store.js";

export default{
    data(){
        return {
            message: 'Main'
        }
    }
}
</script>

<template>
    <h1> {{ message }} </h1>
</template>

<style scoped>

</style>