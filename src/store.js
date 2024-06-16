import { reactive } from "vue";

export const store = reactive({
    searchText: "",
    loading: true,
    searchedString: "",
    moviesList: [],
    tvSeriesList: [],
    resultsList: []
});