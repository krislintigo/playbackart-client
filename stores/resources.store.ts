import { defineStore, skipHydrate } from 'pinia'

export const useResources = defineStore('resources', () => {
  const objectUrls = ref<string[]>([])

  const trackObjectUrl = (url: string) => {
    objectUrls.value.push(url)
  }

  const clearObjectUrls = () => {
    for (const url of objectUrls.value) {
      URL.revokeObjectURL(url)
    }
    objectUrls.value = []
  }

  return {
    objectUrls: skipHydrate(objectUrls),
    trackObjectUrl,
    clearObjectUrls,
  }
})
