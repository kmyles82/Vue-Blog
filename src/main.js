import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue' 
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueNoty from 'vuejs-noty'
import VueDisqus from 'vue-disqus'
import wysiwyg from "vue-wysiwyg";

import 'vuejs-noty/dist/vuejs-noty.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {});
Vue.use(VueDisqus);
Vue.use(VueNoty)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

const authData = localStorage.getItem('auth')

new Vue({
  router,
  data: {
    //authenticate user with cached data if it exists
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app')


