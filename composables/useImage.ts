export const useImage = (obj: any) => {
  const file = ref<File[]>([])

  const reader = new FileReader()
  reader.onload = () => {
    obj.name = file.value[0].name
    obj.buffer = reader.result
    obj.type = file.value[0].type
  }

  const preview = computed(() => {
    if (file.value.at(0)) {
      return obj.buffer
    }
    if (obj?.buffer) return obj.buffer
    return fileUrl(obj?.key)
  })

  const change = (target: 'upload' | 'clear') => {
    if (target === 'clear') {
      delete obj.name
      delete obj.buffer
      delete obj.type
      return
    }

    reader.readAsDataURL(file.value[0])
  }
  return { file, change, preview }
}
