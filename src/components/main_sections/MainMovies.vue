<script>
import { store } from '../../store';


export default{
    data(){
        return {
            message: 'Movies',
            store
        }
    }
}
</script>

<template>
<h1> {{ message }} </h1>
</template>

<style scoped lang="scss">

</style>