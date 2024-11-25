<script>
import axios from 'axios';

export default{
    data(){
        return {
            itemInfo: [],
        }
    },
    methods: {
        getInfo(){
            axios.get(`https://api.themoviedb.org/3/${this.$route.params.media}/${this.$route.params.id}`, {
                params: {
                api_key: "861729733fec3d9d72d05bb5c85381e2",
                language: "it-IT",
                }
            })
            .then((response) => {
                // console.log(response.data);
                this.itemInfo = response.data;
                console.log(this.itemInfo);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(function(){
                //
            }); 
        },
        printInfo(){
            // console.log(this.$route.params.id, this.$route.params.media);
        },
    },
    created(){
        this.printInfo();
        this.getInfo();
    }
}
</script>

<template>
    
</template>

<style scoped lang="scss">

</style>