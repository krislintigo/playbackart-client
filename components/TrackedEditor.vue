<template lang="pug">
el-select.w-full.mb-4(
  v-model='input',
  filterable,
  placeholder='Добавить...',
  @change='track'
)
  el-option(v-for='item in items', :key='item', :label='item', :value='item')
el-collapse(v-model='activeTabs')
  el-collapse-item(
    v-for='(item, i) in _user[userTarget]',
    :key='item.name',
    :name='item.name'
  )
    template(#title)
      el-row(align='middle')
        OrderController(
          size='15',
          @up='changeOrder(i, "up")',
          @down='changeOrder(i, "down")'
        )
        h3.text-xl {{ item.name }}
    TextEditor(v-model='item.description')
    el-popconfirm(
      title='Вы действительно хотите удалить?',
      width='285',
      confirm-button-text='Да',
      cancel-button-text='Нет',
      @confirm='untrack(item.name)'
    )
      template(#reference)
        el-button.mt-3(type='danger') Удалить
</template>

<script setup lang="ts">
const props = defineProps<{
  filterTarget: 'developers' | 'franchises'
  userTarget: 'trackedDevelopers' | 'trackedFranchises'
}>()

const authStore = useAuthStore()
const queryFilters = useFilters()

const activeTabs = ref([])
const input = ref('')
const _user = ref(authStore.user.clone())

const items = computed(
  () =>
    queryFilters.filters?.[props.filterTarget]
      .map((i) => i.value)
      .filter(
        (i) => !!i && !_user.value[props.userTarget].find((t) => t.name === i)
      ) ?? []
)

const track = (item: string) => {
  input.value = ''
  _user.value[props.userTarget].push({
    name: item,
    description: '',
  })
}

const untrack = (item: string) => {
  _user.value[props.userTarget] = _user.value[props.userTarget].filter(
    (i) => i.name !== item
  )
  activeTabs.value = activeTabs.value.filter((tab) => tab !== item)
}

const changeOrder = (index: number, direction: 'up' | 'down') => {
  const temp = _user.value[props.userTarget][index]
  if (direction === 'up') {
    if (index === 0) return
    _user.value[props.userTarget][index] =
      _user.value[props.userTarget][index - 1]
    _user.value[props.userTarget][index - 1] = temp
  } else if (direction === 'down') {
    if (index === _user.value[props.userTarget].length - 1) return
    _user.value[props.userTarget][index] =
      _user.value[props.userTarget][index + 1]
    _user.value[props.userTarget][index + 1] = temp
  }
}

const save = _throttle(async () => {
  console.log('save tracked')
  try {
    await _user.value.save({ diff: props.userTarget })
    await _user.value.reset()
  } catch (e: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}, 5000)

const prevStringifiedItems = ref('')
watch(
  () => _user.value[props.userTarget],
  (newValue) => {
    if (JSON.stringify(newValue) === prevStringifiedItems.value) {
      console.log('skip update tracked')
      return
    }
    prevStringifiedItems.value = JSON.stringify(newValue)
    save()
  },
  { deep: true }
)
</script>

<style scoped></style>
