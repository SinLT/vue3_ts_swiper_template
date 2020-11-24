import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Select } from 'ant-design-vue'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import api from '@/api'
import 'swiper/swiper-bundle.min.css'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: any
  }
}

const app = createApp(App)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)
SwiperCore.use([Navigation, Pagination, Autoplay])
app.use(store)
app.use(router)
app.use(Select)
app.config.globalProperties.$api = api

app.mount('#app')
