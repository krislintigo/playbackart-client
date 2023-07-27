<template lang="pug">
.w-full.h-60(v-show='progress', v-loading='progress')
el-image.mt-5(
  v-show='!progress',
  :src='src',
  @load='progress = false',
  @error='onError'
)
  template(#error)
    el-row
      el-icon(:size='size')
        ElIconPictureRounded
</template>

<script setup lang="ts">
const props = defineProps<{ src: string; size: number }>()
const emit = defineEmits(['error'])

const progress = ref(true)

const onError = () => {
  progress.value = false
  if (!props.src) return
  emit('error')
}
</script>

<style scoped></style>
