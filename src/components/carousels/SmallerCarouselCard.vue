<script>
export default{
    data(){
        return {
            
        }
    },
    props: {
        item: Object,
    }
}
</script>

<template>
    <!-- <p class="text-warning ms-2">{{ item.title }} {{ item.name }}</p> -->
    <img :src="`https://image.tmdb.org/t/p/w342/${item.backdrop_path}`" :alt="(item.media_type === 'movie') ? item.title : item.name" class="h-100">
</template>

<style scoped lang="scss">

</style>