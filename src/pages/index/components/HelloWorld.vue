<template>
  <div class="hello">
    <h1 @click="addNumber"
        ref="msgs">
      {{ msg }}{{ number }}{{ msgs?.clientHeight }}
    </h1>
    <swiper v-if="list.length > 0"
            :watchSlidesProgress="true"
            slidesPerView="auto"
            :centeredSlides="true"
            :autoplay="{ delay: 1000 }"
            :pagination="{ clickable: true }"
            class="iconfont">
      <swiper-slide v-for="(item, index) of list"
                    :key="index">
        <img :src="item"
             width="644" />
      </swiper-slide>
    </swiper>
    <a-select v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange">
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="disabled"
                       disabled>
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
    <a-empty :description="false" />
    <a-statistic-countdown title="Countdown"
                           :value="deadline"
                           style="margin-right: 50px"
                           @finish="onFinish" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
} from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup () {
    const state = reactive({
      value1: 'lucy',
      msgs: null,
      number: 0,
      list: [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=338617558,1462083275&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=338617558,1462083275&fm=26&gp=0.jpg',
      ],
      deadline: Date.now() + 6000
    })
    const api = getCurrentInstance()?.proxy?.$api

    const addNumber = () => {
      state.number++
    }

    const focus = () => {
      console.log('focus')
    }

    const handleChange = (value: string) => {
      console.log(`selected ${value}`)
    }

    const onFinish = () => {
      console.log('onFinish')
    }

    onMounted(async () => {
      const res = await api?.getAuthCheck()
      console.log(res)
    })

    return {
      ...toRefs(state),
      handleChange,
      focus,
      addNumber,
      onFinish
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
