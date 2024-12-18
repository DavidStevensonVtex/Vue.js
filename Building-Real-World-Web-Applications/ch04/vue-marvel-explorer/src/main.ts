// Listing 4.6 Importing the style.css file in the main.ts file in the vue-marvel-explorer/src folder

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
