<script >
import "@fontsource/noto-sans-jp";
import { RouterLink, RouterView } from 'vue-router';
import AppMain from './components/AppMain.vue';
import AppHeader from './components/AppHeader.vue';

export default{
  data(){
      return {
          
      }
  },
  components: {
    AppHeader,
    AppMain,
  }
}
</script>

<template>
  <div class="my_bigger-container">
    <AppHeader />
    <AppMain />
  </div>
</template>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap.scss';
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
@use './styles/general.scss';
</style>