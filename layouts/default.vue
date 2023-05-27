<script setup lang="ts"></script>

<template lang="pug">
el-main.main
  MainHeader
  el-divider
  slot
  el-backtop
</template>

<style scoped lang="scss">
.main {
  max-width: 1500px;
  min-width: 1400px;
  margin: 0 auto;
}
</style>
