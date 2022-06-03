<template>
  <el-dialog v-model="dialog" width="95%" :lock-scroll="false">
    <template #header>
      <h3>{{target === 'create' ? 'Добавить' : 'Обновить'}} элемент</h3>
    </template>
    <el-form :model="item" ref="formRef" label-position="right" :label-width="110" :rules="rules">
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
      <el-form-item label="Жанры:" prop="genres">
        <el-input
          v-model="inputGenre"
          style="width: 300px;"
          @keyup.enter="handleGenreConfirm"
        />
        <el-button text style="margin: 0 10px" @click="handleGenreConfirm">Добавить</el-button>
        <el-tag
          v-for="genre in item.genres"
          :key="genre"
          size="large"
          type="info"
          style="margin-right: 10px;"
          closable
          @close="handleGenreDelete(genre)"
        >
          {{ genre }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Длительность:" prop="time">
        <div>
          <el-col>
            <el-input-number v-model="item.time.count" :min="1" />
            <h4 style="margin: 0;">Кол-во элементов</h4>
          </el-col>
          <el-col :push="2">
            <el-input-number v-model="item.time.duration" />
            <h4 style="margin: 0">Длительность (мин)</h4>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item label="Год выхода:" prop="year">
        <el-date-picker
          v-model="item.year"
          value-format="YYYY"
          type="year"
        />
      </el-form-item>
      <el-form-item :label="getDeveloperWordByType(item.type, 2) + ':'" prop="developers">
        <el-input
          v-model="inputDeveloper"
          style="width: 300px;"
          @keyup.enter="handleDeveloperConfirm"
        />
        <el-button text style="margin: 0 10px" @click="handleDeveloperConfirm">Добавить</el-button>
        <el-tag
          v-for="developer in item.developers"
          :key="developer"
          size="large"
          type="info"
          style="margin-right: 10px;"
          closable
          @close="handleDeveloperDelete(developer)"
        >
          {{ developer }}
        </el-tag>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="success"
        @click="target === 'create' ? confirmAction('create') : confirmAction('update')"
      >
        Подтвердить
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive, ref, inject, watch } from 'vue'
import { ElNotification } from 'element-plus'
import _ from 'lodash'
import { Close } from '@element-plus/icons-vue'
import { statuses, rules, types, rating, restrictions } from '@/data/static'
import { getDeveloperWordByType } from '@/utils/getDeveloperWordByType'
import { ItemsAPI } from '@/api/ItemsAPI'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  updatedItem: {
    type: Object,
    required: true
  }
})

const refetch = inject('refetch')

const emit = defineEmits({
  'update:modelValue': _ => true
})

const formRef = ref(null)
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

watch(() => dialog.value, open => {
  // fix html scroll
  document.documentElement.style.paddingRight =
    open ? window.innerWidth - document.documentElement.clientWidth + 'px' : ''
  document.documentElement.style.overflowY = open ? 'hidden' : 'scroll'

  // set target
  if (open) {
    if (props.target === 'create') {
      resetItem()
      item.type = types.find(type => type.path === location.pathname)?.value ?? ''
    } else {
      Object.assign(item, _.cloneDeep(props.updatedItem))
    }
  }
})

const inputGenre = ref('')
const inputDeveloper = ref('')

const handleGenreDelete = (tag) => {
  item.genres.splice(item.genres.indexOf(tag), 1)
}

const handleGenreConfirm = () => {
  if (inputGenre.value) {
    item.genres.push(inputGenre.value)
  }
  inputGenre.value = ''
}

const handleDeveloperDelete = (tag) => {
  item.developers.splice(item.developers.indexOf(tag), 1)
}

const handleDeveloperConfirm = () => {
  if (inputDeveloper.value) {
    item.developers.push(inputDeveloper.value)
  }
  inputDeveloper.value = ''
}

const confirmAction = async (action) => {
  try {
    await formRef.value.validate()
    try {
      const response = action === 'create'
        ? await ItemsAPI.add(item)
        : await ItemsAPI.update(props.updatedItem.id, item)
      dialog.value = false
      refetch()
      ElNotification.success({
        title: response.message,
        position: 'bottom-right'
      })
    } catch (e) {
      ElNotification.error({
        title: e.response.data.message,
        position: 'bottom-right'
      })
    }
  } catch (error) {
    ElNotification.error({
      title: 'Пожалуйста, заполните все поля',
      position: 'bottom-right'
    })
  }
}

const resetItem = () => {
  item.name = ''
  item.image = ''
  item.rating = 0
  item.status = ''
  item.type = ''
  item.restriction = ''
  item.genres = []
  item.time = {
    count: 0,
    duration: 0
  }
  item.year = ''
  item.developers = []
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
