<template>
  <div class="home">
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import {
  ref,
  onMounted,
  defineComponent
} from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const hello = ref(null)
    onMounted (() => {
      console.log(hello)
    })
    return {
      hello
    }
  }
})
</script>
