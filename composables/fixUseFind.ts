import type { UnwrapNestedRefs } from 'vue'

export const fixUseFind = <T extends UnwrapNestedRefs<Record<any, any>>>(
  storeResponse: T,
) => {
  const refData = toRefs(storeResponse)

  const data = ref<unknown[]>([])
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
