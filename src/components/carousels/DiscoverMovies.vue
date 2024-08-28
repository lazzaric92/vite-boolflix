<script>
export default{
    data(){
        return {
            discoverArray: [],
        }
    },
    methods: {
        getDiscoverList: function(){
            axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT",
                }
            })
            .then((response) => {
                // lista film
                this.discoverArray = response.data.results;
            })
            .catch(function (error) {
                console.log(error);
            });            
        },
    },
    created(){
        this.getDiscoverList();
    }
}

</script>

<template>

</template>

<style scoped lang="scss">

</style>