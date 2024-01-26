<template lang="pug">
client-only
  el-dialog.dialog(
    v-model='dialog',
    append-to-body,
    width='95%',
    :style='{ maxWidth: maxWidth ?? "1300px" }',
    :lock-scroll='false',
    :close-on-click-modal='false'
  )
    template(#header)
      slot(name='header')
        h3.font-normal.text-2xl {{ title }}
    template(#default)
      slot(name='default')
    template(#footer)
      slot(name='footer')
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  maxWidth?: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// fix html scroll
watch(dialog, (open) => {
  document.documentElement.style.paddingRight = open
    ? window.innerWidth - document.documentElement.clientWidth + 'px'
    : ''
  document.documentElement.style.overflowY = open ? 'hidden' : ''
})
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.dialog .el-dialog__body {
  padding-top: 20px;
}

.dialog .el-rate__item {
  line-height: 0;
}
</style>
