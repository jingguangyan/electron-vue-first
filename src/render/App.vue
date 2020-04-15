<template>
  <div id="app">
    <ul class="update-info">
      <li
        class="update-info-item"
        v-for="item of updateMessage"
        :key="item"
      >{{item}}</li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import { rendererOn } from '../common/ipc'
import { onMounted, ref } from '@vue/composition-api'
const updateInit = function () {
  // 设置下载超时定时器
  let timer = setTimeout(() => {
    timer = null
    this.$nextTick(() => {})
  }, 60 * 30 * 1000)

  // 清除定时器
  const clearTimer = () => {
    timer && clearTimeout(timer)
    timer = null
  }
  const updateMessage = ref([])
  const sendMsg = (msg) => {
    updateMessage.value.push(msg)
  }

  onMounted(() => {
    rendererOn('update-available', (event, info) => {
    // console.log('update-available', info)
      sendMsg('update-available')
    })

    rendererOn('update-progress', (event, progress) => {
    // console.log('update-progress', progress)
      sendMsg(progress)
    })

    rendererOn('update-downloaded', (event, info) => {
    // console.log('update-downloaded', info)
      clearTimer()
      sendMsg('update-downloaded')
    })

    rendererOn('update-not-available', (event, info) => {
    // console.log('update-not-available', info)
      clearTimer()
      sendMsg('update-not-available')
    })

    rendererOn('update-error', (event, err) => {
    // console.log('update-error', err)
      clearTimer()
      sendMsg(err)
    })
  })

  return updateMessage
}
export default {
  name: 'App',
  setup (props, ctx) {
    const updateMessage = updateInit()

    return {
      updateMessage
    }
  }
}
</script>

<style lang="less">

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  .size;
}

.update-info {
  height: 200px;
  border-bottom: 1px solid #ccc;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
