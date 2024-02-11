<template lang="pug">
el-upload.avatar-uploader(
  v-if='!preview',
  :show-file-list='false',
  method='get',
  :on-success='onSuccess'
)
  el-icon.avatar-uploader-icon
    ElIconPlus
  el-button.mt-2.absolute.top-0.right-2(
    type='primary',
    circle,
    text,
    :icon='ElIconCopyDocument',
    @click.stop='uploadFromClipboard'
  )
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
const IMAGE_TYPES = ['image/png', 'image/jpeg']

const { trackObjectUrl } = useResources()

const image = defineModel<any>({ required: true })

const showControl = ref(false)

const preview = computed(() => image.value.preview || fileUrl(image.value.key))

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const upload = async (file: File) => {
  image.value.name = file.name
  image.value.buffer = await toBase64(file)
  image.value.preview = URL.createObjectURL(file)
  trackObjectUrl(image.value.preview)
}

const onSuccess = async (_: any, uploadFile: any) =>
  await upload(uploadFile.raw)

const uploadFromClipboard = async () => {
  const [clipboard] = await navigator.clipboard.read()
  const mimeType = clipboard.types.find((type) => IMAGE_TYPES.includes(type))
  if (!mimeType) return

  const blob = await clipboard.getType(mimeType)
  const file = new File([blob], 'image.png', { type: mimeType })
  await upload(file)
}

const remove = () => {
  image.value = _cloneDeep(EMPTY_FILE_DATA)
}
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
