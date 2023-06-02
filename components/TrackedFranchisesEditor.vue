<template lang="pug">
h3(style='margin: 0 0 5px') Здесь будут отслеживаемые франшизы
el-select(
  v-model='input',
  filterable,
  placeholder='Выберите...',
  @change='trackFranchise'
)
  el-option(
    v-for='franchise in franchises',
    :key='franchise',
    :label='franchise',
    :value='franchise'
  )
div {{ authStore.user?.trackedFranchises }}
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const queryFilters = useFilters()

const input = ref('')

const franchises = computed(
  () =>
    queryFilters.filters?.franchises.map((i) => i.value).filter((i) => i) ?? []
)

const trackFranchise = async (franchise: string) => {
  const _user = authStore.user.clone()
  _user.trackedFranchises.push(franchise)
  await _user.save()
  input.value = ''
}

// watchEffect(() => {
//   if (!authStore.user) return
//   trackedFranchises.value = authStore.user.trackedFranchises
// })
</script>

<style scoped></style>
