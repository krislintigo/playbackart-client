<template lang="pug">
client-only
  el-dialog.dialog(
    v-model='dialog',
    append-to-body,
    width='95%',
    :fullscreen='width < DIALOG_BREAKPOINTS.fullscreen',
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
defineProps<{ maxWidth?: string; title: string }>()

const dialog = defineModel<boolean>({ required: true })

const { width } = useWindowSize()

// fix html scroll
watch(dialog, (open) => {
  document.documentElement.style.paddingRight = open
    ? window.innerWidth - document.documentElement.clientWidth + 'px'
    : ''
  document.documentElement.style.overflowY = open ? 'hidden' : ''
})
</script>

<style scoped lang="scss"></style>
