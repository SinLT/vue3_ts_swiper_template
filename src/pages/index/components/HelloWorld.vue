<template>
  <div class="hello">
    <h1 @click="addNumber" ref="msgs" class="hello_h1">
      {{ msg }}{{ number }}{{ msgs?.clientHeight }}
    </h1>
    <swiper
      v-if="list.length > 0"
      :watchSlidesProgress="true"
      slidesPerView="auto"
      :centeredSlides="true"
      :autoplay="{ delay: 1000 }"
      :pagination="{ clickable: true }"
      class="iconfont"
    >
      <swiper-slide v-for="(item, index) of list" :key="index">
        <img :src="item" width="644" />
      </swiper-slide>
    </swiper>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-time-picker
      v-model="value2"
      placeholder="任意时间点"
    >
    </el-time-picker>
    <el-date-picker v-model="value3" type="date" placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRefs,
  onUnmounted,
  getCurrentInstance
} from 'vue'
import { ComponentInternalInstance } from '@vue/runtime-core'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      color: 'yellow',
      msgs: null,
      number: 0,
      list: [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=338617558,1462083275&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=338617558,1462083275&fm=26&gp=0.jpg'
      ],
      colorInterval: 0,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      value2: new Date(2016, 9, 10, 18, 40),
      value3: ''
    })

    const addNumber = () => {
      state.color = `#${Math.random()
        .toString()
        .slice(-6)}`
      state.number++
      proxy?.$message?.error('ni')
    }

    onMounted(async () => {
      try {
        const res = await proxy?.$api?.getAuthCheck()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
      state.colorInterval = window.setInterval(() => {
        state.color = `#${Math.random()
          .toString()
          .slice(-6)}`
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(state.colorInterval)
    })

    return {
      ...toRefs(state),
      addNumber
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello_h1 {
  color: v-bind(color);
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
