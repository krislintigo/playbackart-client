<template lang="pug">
el-select(
  v-model='input',
  filterable,
  placeholder='Выберите...',
  style='width: 100%; margin: 10px 0',
  @change='trackFranchise'
)
  el-option(
    v-for='franchise in franchises',
    :key='franchise',
    :label='franchise',
    :value='franchise'
  )
div(
  v-if='authStore.user.trackedFranchises',
  style='display: flex; flex-direction: column; align-items: flex-start; row-gap: 5px'
)
  el-check-tag(
    v-for='franchise in authStore.user.trackedFranchises',
    :key='franchise',
    :checked='authStore.user.trackedFranchises.includes(franchise)'
  )
    span {{ franchise }}
    el-popconfirm(
      title='Вы действительно хотите удалить?',
      width='285',
      confirm-button-text='Да',
      cancel-button-text='Нет',
      @confirm='untrackFranchise(franchise)'
    )
      template(#reference)
        el-button(
          :icon='ElIconClose',
          circle,
          size='small',
          text,
          style='margin-left: 5px; width: 15px; height: 15px'
        )
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
  if (authStore.user.trackedFranchises.includes(franchise)) return
  input.value = ''
  const _user = authStore.user.clone()
  _user.trackedFranchises.push(franchise)
  await _user.save()
}

const untrackFranchise = async (franchise: string) => {
  const _user = authStore.user.clone()
  _user.trackedFranchises = _user.trackedFranchises.filter(
    (f) => f !== franchise
  )
  await _user.save()
}
</script>

<style scoped></style>
