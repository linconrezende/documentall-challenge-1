// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'fa'
  }
})
