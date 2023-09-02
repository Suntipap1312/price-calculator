import { createApp } from 'vue'
import './style.css'
import route from './routes/router'
import App from './App.vue'

const app = createApp(App)
app.use(route)
    .mount('#app')
