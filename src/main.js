// main.js

// Plugins
import { registerPlugins } from '@/plugins'

// Axios
import axios from 'axios'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

registerPlugins(app)

app.mount('#app')
