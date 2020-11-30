import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)
SwiperCore.use([Navigation, Pagination, Autoplay])
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
