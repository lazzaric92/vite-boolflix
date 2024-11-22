<script>
export default{
    data(){
        return {
            
        }
    },
    props: {
        item: Object,
    }
}
</script>

<template>
    <div class="sm-c-card h-100 w-100">
        <img v-if="item.backdrop_path == null" src="../../assets/img/mockup-movie-poster.jpeg" :alt="(item.media_type === 'movie') ? item.title : item.name + ' has no poster'" class="w-100">
        <img v-else :src="`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`" :alt="(item.media_type === 'movie') ? item.title : item.name + ' Poster'">
        <div class="overlay d-flex flex-column-reverse">
            <p class="text-white">{{ item.title }} {{ item.name }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    div.sm-c-card{
        overflow: clip;
        border-radius: 12px;
        position: relative;

        img{
            height: 100%;
            object-fit: cover;
            object-position: center;
            overflow: clip;

        }

        &:hover img{
            transform: scale(1.1);
            transition: all .2s ease-in;
        }

        .overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            padding: 1rem;


            p{
                display: none;
                opacity: .9;
                margin-bottom: 0;
            }
        }

        &:hover .overlay{
            background-color: rgba(0, 0, 0, 0.6);

            p{
                display: block;
            }
        }
    }
</style>