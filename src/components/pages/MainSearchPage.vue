<script>
import { store } from '../../store';
import CardsList from '../partials/CardsList.vue';

export default{
    data(){
        return {
            store
        }
    },
    
    components: {
        CardsList
    }
}
</script>

<template>
    <div class="row h-100">
        <CardsList class="col-10 mx-auto" />
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;
</style>