<script >
import AppMain from './components/AppMain.vue';

export default{
  data(){
      return {
          
      }
  },
  components: {
    AppMain
  }
}
</script>

<template>
  <AppMain />
</template>

<style lang="scss">
@use './styles/general.scss';
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>
