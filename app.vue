<template lang="pug">
NuxtLayout
  NuxtPage
</template>

<style lang="scss">
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.el-form-item .el-form-item {
  margin-bottom: 18px !important;
}

.el-popconfirm__main {
  word-break: normal;
  text-align: left;
}

.el-popconfirm__icon {
  margin-right: 10px !important;
}
</style>
