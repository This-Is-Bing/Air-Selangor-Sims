import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import moment from 'moment-timezone'
moment.tz.setDefault("Asia/Kuala_Lumpur");

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

