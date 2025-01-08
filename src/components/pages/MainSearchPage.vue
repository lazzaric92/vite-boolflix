<script>
import { store } from '../../store';
import { router } from '../../router';
import CardsList from '../partials/CardsList.vue';

export default{
    data(){
        return {
            store
        }
    },
    components: {
        CardsList
    },
    created(){
        // after refreshing, search input and the page are blank -> redirection to home page
        if(this.store.searchedString === ''){
            this.$router.push({name: 'home'});
        }
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