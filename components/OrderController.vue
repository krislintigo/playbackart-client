<template lang="pug">
.flex.flex-col.mr-2
  el-icon(size='15', @click.stop='$emit("up")')
    ElIconArrowUp
  el-icon(size='15', @click.stop='$emit("down")')
    ElIconArrowDown
</template>

<script setup lang="ts">
defineProps<{ size: string }>()

defineEmits(['up', 'down'])
</script>

<style scoped></style>
