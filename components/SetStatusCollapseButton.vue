<template lang="pug">
el-collapse.set-status-collapse(:class='[currentStatus]')
  el-collapse-item
    template(#title)
      el-row.gap-x-3(align='middle')
        el-icon(size='large')
          component(:is='statuses.find((s) => s.value === currentStatus).icon')
        h3.font-medium.text-base {{ statuses.find((s) => s.value === currentStatus).title }}
    el-row(
      v-for='status in statuses.filter((i) => i.value !== currentStatus)',
      :key='status.value',
      align='middle',
      :class='status.value'
    )
      el-button(
        text,
        :style='{ fontSize: "18px", color: status.color }',
        @click='$emit("update", status.value)'
      )
        el-row.gap-x-3(justify='space-between', align='middle')
          el-icon(size='large')
            component(:is='status.icon')
          h3.font-medium.text-base {{ status.title }}
</template>

<script setup lang="ts">
defineProps<{ currentStatus: Item['status'] }>()

defineEmits<{ (e: 'update', value: string): void }>()
</script>

<style scoped lang="scss"></style>
<style lang="scss">
@import 'assets/css/main.scss';

.set-status-collapse,
.set-status-collapse > .el-collapse-item > .el-collapse-item__wrap {
  border: 0;
}

.set-status-collapse > .el-collapse-item > .el-collapse-item__header {
  padding: 0 15px;
  border-radius: 2px;
  border-bottom: 0;
}

.set-status-collapse
  > .el-collapse-item
  > .el-collapse-item__wrap
  > .el-collapse-item__content {
  @apply flex flex-col;
  padding: 10px 0 0 2px;
  row-gap: 10px;
}

@each $status, $color in $statuses {
  .set-status-collapse.#{$status} .el-collapse-item__header {
    background: map-get($color, 'light-3');
  }
}
</style>
