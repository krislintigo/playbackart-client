<template lang="pug">
el-upload.avatar-uploader(
  v-if='!preview',
  :show-file-list='false',
  method='get',
  :on-success='onSuccess'
)
  el-icon.avatar-uploader-icon
    ElIconPlus
.image-container(
  v-else,
  @mouseover='showControl = true',
  @mouseleave='showControl = false'
)
  img.avatar.transition-all(
    :src='preview',
    :class='showControl ? "opacity-60 blur-[1px]" : "opacity-100"'
  )
  transition(name='el-fade-in-linear')
    .absolute.w-full.h-full.inset-0.flex.justify-center.items-center(
      v-show='showControl'
    )
      el-button(link, size='large', @click='remove')
        el-icon(:size='20')
          ElIconDelete
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const showControl = ref(false)

const image = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const preview = computed(() => image.value.preview || fileUrl(image.value.key))

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const onSuccess = async (_, uploadFile) => {
  image.value.name = uploadFile.name
  image.value.buffer = await toBase64(uploadFile.raw)
  image.value.preview = URL.createObjectURL(uploadFile.raw)
}

const remove = () => {
  image.value = _cloneDeep(EMPTY_FILE_DATA)
}

// const beforeUpload = (rawFile) => {
//   console.log(rawFile)
//   if (rawFile.size / 1024 / 1024 > 2) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
//   return true
// }
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.image-container {
  @apply w-40 relative rounded-md;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload {
  @apply image-container;
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  @apply w-40 h-60;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
