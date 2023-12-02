// import { createApp } from 'vue'
import Vue from 'vue'
import jwt from './http'
jwt.init();
import App from './App.vue'
import router from './router.js'
import store from './store'
import './main.css'
import './tailwind.css'
import Editor from 'vue-editor-js/src/index'
Vue.use(Editor)
import AudioRecorder from 'vue-audio-recorder'

Vue.filter('truncate', (s, max) => {
  if (s.length < max) return s
  return s.toString().substring(0, max) + '...'
})

Vue.filter('getStatusLabel', (label) => {
  switch (label) {
    case 'REQUESTED':
      return 'درخواست مشاوره'    
    case 'RESERVED':
      return 'رزرو شده'
    case 'ACCEPTED':
      return 'قبول شده'
    case 'REJECTED':
      return 'رد شده'
    case 'IN_PROGRESS':
      return 'در حال اجرا'
    case 'CANCELED':
      return 'لغو شده'
    case 'FINISHED':
      return 'تموم شده'
    default:
      return label
  }
});




Vue.use(AudioRecorder)

import VueToast from 'vue-toast-notification';
import VueObserveVisibility from "vue-observe-visibility";
Vue.use(VueObserveVisibility);
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
//Vue.$toast.open({/* options */});
let instance = Vue.$toast.open('You did it!');

// Force dismiss specific toast
instance.dismiss();
// Dismiss all opened toast immediately
Vue.$toast.clear();

// import Vue from 'vue'
// import Editor from 'vue-editor-js/src/index' 

// import VueCompositionApi from '@vue/composition-api'

// Vue.use(VueCompositionApi)


// import './build.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
