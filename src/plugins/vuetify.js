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
    themes: {
      light: {
        colors:{
          primary: "#FEFEFE", 
          secondary: "#4EADD6", 
          tertiary: "#2E728E", 
          quatenary: "#98D0E6", 
          quinary: "#D0E2E9", 
          inactive: "#A3AED0",
          block:"#00538C"
        }
      },
      dark: {
        colors:{
          primary: "#FEFEFE", 
          secondary: "#4EADD6", 
          tertiary: "#2E728E", 
          quatenary: "#98D0E6", 
          quinary: "#D0E2E9", 
        }
      },
    },
  },
})
