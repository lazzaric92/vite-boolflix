import { reactive } from "vue";

export const store = reactive({
    searchText: "",
    loading: true,
    searchedString: "",
    moviesList: [],
    tvSeriesList: [],
    resultsList: [],
    currentPage: 1,
    moviesListPages: 0,
    tvSeriesListPages: 0,
    totalPages: 0,
    radioValue: 'all',
});