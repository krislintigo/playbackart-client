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
el-collapse(v-model='activeTabs')
  el-collapse-item(
    v-for='franchise in _user.trackedFranchises',
    :key='franchise.name',
    :name='franchise.name'
  )
    template(#title)
      h3(style='font-size: 20px') {{ franchise.name }}
    TextEditor(v-model='franchise.description')
    el-popconfirm(
      title='Вы действительно хотите удалить?',
      width='285',
      confirm-button-text='Да',
      cancel-button-text='Нет',
      @confirm='untrackFranchise(franchise.name)'
    )
      template(#reference)
        el-button(type='danger', style='margin-top: 10px') Удалить
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const queryFilters = useFilters()

const activeTabs = ref([])
const input = ref('')
const _user = ref(authStore.user.clone())

const franchises = computed(
  () =>
    queryFilters.filters?.franchises
      .map((i) => i.value)
      .filter(
        (i) => !!i && !_user.value.trackedFranchises.find((fr) => fr.name === i)
      ) ?? []
)

const trackFranchise = (franchise: string) => {
  input.value = ''
  _user.value.trackedFranchises.push({
    name: franchise,
    description: '',
  })
}

const untrackFranchise = (franchise: string) => {
  _user.value.trackedFranchises = _user.value.trackedFranchises.filter(
    (f) => f.name !== franchise
  )
  activeTabs.value = activeTabs.value.filter((tab) => tab !== franchise)
}

const save = _throttle(async () => {
  console.log('save tracked')
  try {
    await _user.value.save({ diff: 'trackedFranchises' })
    await _user.value.reset()
  } catch (e: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}, 5000)

const prevStringifiedFranchises = ref('')
watch(
  () => _user.value.trackedFranchises,
  (newValue) => {
    if (JSON.stringify(newValue) === prevStringifiedFranchises.value) {
      console.log('skip update tracked')
      return
    }
    prevStringifiedFranchises.value = JSON.stringify(newValue)
    save()
  },
  { deep: true }
)
</script>

<style scoped></style>
