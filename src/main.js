import { createApp } from 'vue'
import App from './App.vue'
import { library } from '../node_modules/@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/vue-fontawesome';
import { faStar as fasFaStar } from "../node_modules/@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "../node_modules/@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "../node_modules/@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "../node_modules/@fortawesome/free-solid-svg-icons";
import { faXmark } from "../node_modules/@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "../node_modules/@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "../node_modules/@fortawesome/free-solid-svg-icons";

library.add(fasFaStar, farFaStar, faMagnifyingGlass, faCircleUser, faXmark, faCircleArrowRight, faCircleArrowLeft);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
