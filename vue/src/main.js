import Vue from "vue";
import './plugins/snotify'
// import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import API from './scripts/api'

Vue.config.productionTip = false;
Vue.prototype.$API = API
Vue.use(VueAxios, axios)

new Vue({
  router,
  // vuetify,
  render: (h) => h(App),
}).$mount("#app");
