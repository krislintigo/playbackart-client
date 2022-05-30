<template>
  <el-main class="main">
    <MainHeader />
    <router-view />
  </el-main>
</template>

<style>
body, input, button, textarea, select {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.main {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
<script setup>
import MainHeader from '@/components/MainHeader'
</script>
