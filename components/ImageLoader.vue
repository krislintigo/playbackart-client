<template lang="pug">
el-upload.w-40.avatar-uploader(
  v-model:file-list='file',
  :show-file-list='false',
  method='get',
  :on-success='onSuccess'
)
  img.avatar(v-if='preview', :src='preview')
  el-icon.avatar-uploader-icon(v-else)
    ElIconPlus
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const image = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const file = ref<any>()
const preview = ref('')

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const onSuccess = async (_, uploadFile) => {
  console.log(uploadFile)
  preview.value = URL.createObjectURL(uploadFile.raw)
  image.value.name = uploadFile.name
  image.value.buffer = await toBase64(uploadFile.raw)
  console.log(image.value)
  console.log('preview', preview.value)
}

// const beforeAvatarUpload = (rawFile) => {
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
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
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
