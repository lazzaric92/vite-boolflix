<script>
export default{
    data(){
        return {
            message: 'Info'
        }
    },
    methods: {
        printInfo(){
            // console.log(this.$route.params.id, this.$route.params.media);
        }
    },
    created(){
        this.printInfo();
    }
}
</script>

<template>
    <h1> {{ message }} </h1>
</template>

<style scoped lang="scss">

</style>