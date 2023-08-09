<template lang="pug">
el-radio-group(v-model='status')
  el-radio-button.status-radio-button(
    v-for='st in statuses',
    :key='st.value',
    :label='st.value',
    :class='[st.value]',
    :style='{ "--el-radio-button-checked-bg-color": st.color }'
  ) {{ st.title }}
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: Item['status'] }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['status']): void
}>()

const status = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.status-radio-button,
.el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}
</style>
