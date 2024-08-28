<script>
export default{
    data(){
        return {
            trendingArray: [],
        }
    },
    methods: {
        getTrendingList: function(){
            axios.get('https://api.themoviedb.org/3/trending/tv/week', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT"
                }
            })
            .then((response) => {
                // lista film
                this.trendingArray = response.data.results;
                // console.log(this.store.moviesList);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        }
    },
    created(){
        this.getTrendingList();
    }
}
</script>

<template>

</template>

<style scoped lang="scss">

</style>