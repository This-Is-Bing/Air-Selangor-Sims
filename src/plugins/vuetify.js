// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'

// Vuetify
import { aliases, fa } from 'vuetify/iconsets/fa'
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        colors:{
          primary: "#FEFEFE", 
          secondary: "#4EADD6", 
          tertiary: "#2E728E", 
          quatenary: "#98D0E6", 
          quinary: "#D0E2E9",
          active: "#4EADD6", 
          inactive: "#A3AED0",
          block:"#00538C",
          nav:"#FEFEFE",
          main: "#EFF8FC",
          title: "#383E49",
          history_yellow: "#FFFDE9",
          history_yellow_border:"#DDA617",
          history_blue: "#CBEFFF",
          history_blue_border:"#0978AB",
          history_purple: "#EAE9FF",
          history_purple_border:"#751DE4",
          history_red: "#FFE9E9",
          history_red_border:"#E7544B",
        }
      },
      dark: {
        colors:{
          primary: "#FEFEFE", 
          secondary: "#00538C", 
          tertiary: "#2E728E", 
          quatenary: "#98D0E6", 
          quinary: "#D0E2E9",
          active: "#00538C", 
          inactive: "#A3AED0",
          block:"#00538C",
          nav: "#D0E2E9",
          main: "#98D0E6",
          title: "#383E49",
          history_yellow: "#FFFDE9",
          history_yellow_border:"#DDA617",
          history_blue: "#CBEFFF",
          history_blue_border:"#0978AB",
          history_purple: "#817AF3",
          history_purple_border:"#751DE4",
          history_red: "#FFE9E9",
          history_red_border:"#E7544B",
        }
      },
    },
  },
})
