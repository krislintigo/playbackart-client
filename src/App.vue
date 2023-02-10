<template>
  <el-main class="main">
    <MainHeader />
    <el-divider />
    <router-view />
    <el-backtop />
  </el-main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400&family=Rubik:wght@300;400&display=swap');

html {
  overflow-y: scroll;
}

body, input, button, textarea, select {
  box-sizing: border-box;
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.main {
  max-width: 1500px;
  min-width: 1400px;
  margin: 0 auto;
}
</style>
<script setup>
import MainHeader from '@/components/MainHeader'
</script>
