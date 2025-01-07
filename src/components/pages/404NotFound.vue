<script>
export default{
    data(){
        return {
        
        }
    }
}
</script>

<template>
    <section class="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <h2 class="text-uppercase mb-4">404</h2>
        <p class="text-uppercase">pagina non trovata</p>
    </section>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

section {
    font-family: cursive;
    
    h2{
        color: $my_logo-color;
        font-size: 5rem;
    }

    p{
        color: white;
        font-size: 2rem;
    }
}
</style>