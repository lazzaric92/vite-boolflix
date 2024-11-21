<script>
import { store } from '../../store';


export default{
    data(){
        return {
            store,
            radioInputs: [
                {
                    'id': 0,
                    'val': 'all',
                    'label': 'All'
                },
                {
                    'id': 1,
                    'val': 'movies',
                    'label': 'Movies'
                },
                {
                    'id': 2,
                    'val': 'series',
                    'label': 'TV Series'
                },
            ]
        }
    },
    methods: {
        changeRadioValue: function(value){
            this.store.radioValue = value;
        }
    },
}
</script>

<template>
    <div v-if="this.store.resultsList.length > 0" class="mb-5 mt-3">
        <template v-for="radInp in radioInputs" key="input.id">
            <input type="radio" name="list-shown" :id=radInp.id :value=radInp.val :class="(this.store.radioValue === radInp.val) ? 'active' : ''" @click="changeRadioValue(radInp.val)"/>
            <label :for=radInp.id class="fw-bold py-2 px-4 me-3">{{ radInp.label }}</label>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables' as *;

    input[type="radio"] {
        opacity: 0;
        position: fixed;
        width: 0;
    }

    label {
        display: inline-block;
        background-color: transparent;
        font-size: .8rem;
        border: 2px solid $my_bg-lightgrey;
        border-radius: 32px;
        cursor: pointer;
        color: white;
    }

    input[type="radio"]:checked + label,
    input[type="radio"].active + label,
    input[type="radio"]:focus + label {
        border-color: $my_logo-color;
        background-color: $my_logo-color;
        color: black;
    }
</style>