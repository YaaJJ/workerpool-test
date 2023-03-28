<script setup>
import { onMounted, ref, watch } from "vue";
import workerpool from 'workerpool'
const spell = ref('111')
onMounted(() => {
  const pool = workerpool.pool('/myWorker.js')  //拿到public中的worker文件
  pool
    .exec('handlePinyin', ['测试拼音'])   //第一个参数调用worker线程中要调用的方法名,第二个参数是一个数组,数组中每一项是调用的方法接受的参数
    .then(result => {
      spell.value = result   //result是worker线程中调用的方法的返回结果
    })
    .catch(error => {
      console.log(error)  //调用worker线程时报出的错误,建议一定要加上这个,不然真的可能看不到报错信息
    })
    .then(() => {
      pool.terminate()  //worker线程执行完结束线程
    })
  console.log(spell.value, '直接输出');
});
watch(spell,() => {
  console.log(spell.value,'worker执行结束后输出');
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
