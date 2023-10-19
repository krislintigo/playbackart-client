<template lang="pug">
.flex.flex-col.items-center
  .inline-flex.items-center
    span {{ title }}
    el-tooltip(
      v-if='tooltip',
      effect='dark',
      :content='tooltip',
      placement='top'
    )
      el-icon.ml-1(:size='14')
        ElIconWarning
  h2.text-xl.font-light.m-0 {{ content }}
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tooltip?: string
  content: string | number
}>()
</script>

<style scoped lang="scss"></style>
