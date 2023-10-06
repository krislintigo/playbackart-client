<template lang="pug">
el-row.gap-y-5.w-full
  el-button(@click='appendSession') Добавить
  el-card.w-full(v-for='(session, i) in sessions', :key='i')
    template(#header)
      el-row(justify='space-between', align='middle')
        h2 Сессия {{ i + 1 }}
        el-button(
          v-if='sessions.length > 1',
          :icon='ElIconDelete',
          circle,
          type='danger',
          @click='removeSession(i)'
        )
    el-form(
      ref='form',
      :model='session',
      label-position='right',
      :label-width='120',
      :rules='rules'
    )
    el-form-item.mb-4(label='Длительность:', prop='time')
      .flex.flex-col
        el-input-number(v-model='session.duration', :min='0')
        h4.m-0.text-center
          span Длительность (мин)
          .text-xs(class='mt-[-7px]') {{ formatDuration(session.duration) }}
</template>

<script setup lang="ts">
import { type FormRules } from 'element-plus'

const rules: FormRules = {
  name: [
    {
      required: true,
      message: 'Введите название',
      trigger: 'change',
    },
  ],
  status: [
    {
      required: true,
      message: 'Выберите статус',
      trigger: 'change',
    },
  ],
}

const props = defineProps<{
  modelValue: Item['time']['sessions']
  config: any
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['parts'][number]): void
}>()

const form = ref<any>(null)

const sessions = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const appendSession = () => {
  sessions.value.push(_cloneDeep(EMPTY_SESSION_DATA))
}

const removeSession = (index: string | number) => {
  sessions.value.splice(index, 1)
}

const validate = async () => {
  try {
    await form.value.validate()
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ validate })
</script>

<style scoped></style>
