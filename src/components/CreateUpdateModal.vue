<template>
  <el-dialog v-model="dialog" width="95%">
    <template #header>
      <h3>Добавить элемент</h3>
    </template>
    <el-form v-model="item" label-position="right" :label-width="110">
      <el-form-item label="Название:" prop="name">
        <el-input v-model="item.name" />
      </el-form-item>
      <el-form-item label="Фото:" prop="image">
        <el-input v-model="item.image" />
      </el-form-item>
      <el-form-item label="Рейтинг:" prop="rating">
        <el-rate v-model="item.rating" :max="10" show-text :texts="rating.texts" :colors="rating.colors" />
        <el-button style="margin-left: 5px;" :icon="Close" size="small" circle text @click="item.rating = 0" />
      </el-form-item>
      <el-form-item label="Статус:" prop="status">
        <el-radio-group v-model="item.status">
          <el-radio-button
            v-for="status in statuses"
            :key="status.value"
            :label="status.value"
            :style="{'--el-radio-button-checked-bg-color': status.color}"
          >
            {{status.title}}
          </el-radio-button>
        </el-radio-group>
        <el-button style="margin-left: 5px;" :icon="Close" size="small" circle text @click="item.status = ''" />
      </el-form-item>
      <el-form-item label="Тип:" prop="type">
        <el-radio-group v-model="item.type">
          <el-radio-button
            v-for="type in types"
            :key="type.value"
            :label="type.value"
          >
            {{type.title}}
          </el-radio-button>
        </el-radio-group>
        <el-button style="margin-left: 5px;" :icon="Close" size="small" circle text @click="item.type = ''" />
      </el-form-item>
      <el-form-item label="Ограничение:" prop="restriction">
        <el-radio-group v-model="item.restriction">
          <el-radio-button
            v-for="restriction in restrictions"
            :key="restriction"
            :label="restriction"
           />
        </el-radio-group>
        <el-button style="margin-left: 5px;" :icon="Close" size="small" circle text @click="item.restriction = ''" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="confirmAppend">Подтвердить</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive } from 'vue'
import { Close } from '@element-plus/icons-vue'
import statuses from '@/data/statuses'

const rating = {
  texts: ['Хуже некуда', 'Ужасно', 'Очень плохо', 'Плохо', 'Более-менее',
    'Нормально', 'Хорошо', 'Отлично', 'Великолепно', 'Эпик вин!'],
  colors: {
    1: '#f56c6c',
    2: '#f1755f',
    3: '#ed8153',
    4: '#e99047',
    5: '#e6a23c',
    6: '#dec03b',
    7: '#d2d73b',
    8: '#add03b',
    9: '#89c93a',
    10: '#67c23a'
  }
}
const types = [
  {
    value: 'movie',
    title: 'Фильм'
  },
  {
    value: 'series',
    title: 'Сериал'
  },
  {
    value: 'game',
    title: 'Игра'
  },
  {
    value: 'book',
    title: 'Книга'
  }
]
const restrictions = ['G', 'PG', 'PG-13', 'R-17', 'R+']

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

.el-rate__item {
  line-height: 0;
}

.el-radio-button__original-radio:checked+.el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}
</style>
