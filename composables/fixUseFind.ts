export const fixUseFind = (storeResponse: any): any => {
  const refData = toRefs(storeResponse)

  const data = ref<any[]>([])
  const total = ref(0)

  watch(
    () => storeResponse.haveLoaded,
    async (haveLoaded) => {
      if (!haveLoaded) return

      const request = await storeResponse.request
      if (!request) return
      data.value = request.data
      total.value = request.total
    },
  )

  return reactive({ ...refData, data, total })
}
