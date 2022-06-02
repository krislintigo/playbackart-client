<template>
  <el-dialog v-model="dialog" width="95%">
    <template #header>
      <h3>Добавить элемент</h3>
    </template>
    <el-form v-model="item" label-position="right" :label-width="100">
      <el-form-item label="Название:" prop="name">
        <el-input v-model="item.name" />
      </el-form-item>
      <el-form-item label="Фото:" prop="image">
        <el-input v-model="item.image" />
      </el-form-item>
      <el-form-item label="Рейтинг:">
        <el-rate v-model="item.rating" :max="10" show-text :texts="ratings" :colors="colors" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="confirmAppend">Подтвердить</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive } from 'vue'

const ratings = ['Хуже некуда', 'Ужасно', 'Очень плохо', 'Плохо', 'Более-менее',
  'Нормально', 'Хорошо', 'Отлично', 'Великолепно', 'Эпик вин!']
// const colors = ['#f56c6c', '#e6a23c', '#67c23a']
const colors = { 1: '#f56c6c', 2: '#f1755f', 3: '#ed8153', 4: '#e99047', 5: '#e6a23c' }

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits({
  'update:modelValue': _ => true
})

const item = reactive({
  name: '',
  image: '',
  rating: 0,
  status: '',
  type: '',
  restriction: '',
  genres: [],
  time: {
    count: 0,
    duration: 0
  },
  year: '',
  developers: []
})

const dialog = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmAppend = () => {
  console.log('confirmAppend')
  dialog.value = false
}
</script>

<style scoped>

</style>
<style>
.el-dialog__body {
  padding-top: 0;
}
</style>
