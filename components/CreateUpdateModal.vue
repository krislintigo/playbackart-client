<template>
  <el-dialog v-model="dialog" width="95%" :lock-scroll="false" class="dialog">
    <template #header>
      <h3>{{ target === 'create' ? 'Добавить' : 'Обновить' }} элемент</h3>
    </template>
    <el-form
      ref="formRef"
      :model="_item"
      label-position="right"
      :label-width="120"
      :rules="rules"
    >
      <el-form-item label="Название:" prop="name">
        <el-input v-model="_item.name" />
      </el-form-item>
      <el-form-item label="Фото:" prop="image">
        <el-input v-model="_item.image" />
      </el-form-item>
      <el-form-item label="Рейтинг:" prop="rating">
        <el-rate
          v-model="_item.rating"
          :max="10"
          show-text
          :texts="rating.texts"
          :colors="rating.colors"
        />
        <el-button
          style="margin-left: 5px"
          :icon="ElIconClose"
          size="small"
          circle
          text
          @click="_item.rating = 0"
        />
      </el-form-item>
      <el-form-item label="Статус:" prop="status">
        <el-radio-group v-model="_item.status">
          <el-radio-button
            v-for="status in statuses"
            :key="status.value"
            :label="status.value"
            :style="{ '--el-radio-button-checked-bg-color': status.color }"
          >
            {{ status.title }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Тип:" prop="type">
        <el-radio-group v-model="_item.type">
          <el-radio-button
            v-for="type in types"
            :key="type.value"
            :label="type.value"
          >
            {{ type.title }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Ограничение:" prop="restriction">
        <el-radio-group v-model="_item.restriction">
          <el-radio-button
            v-for="restriction in restrictions"
            :key="restriction"
            :label="restriction"
          />
        </el-radio-group>
        <el-button
          style="margin-left: 5px"
          :icon="ElIconClose"
          size="small"
          circle
          text
          @click="_item.restriction = ''"
        />
      </el-form-item>
      <el-form-item label="Жанры:" prop="genres">
        <el-input
          v-model="inputGenre"
          style="width: 300px; margin-bottom: 5px"
          @keyup.enter="handleGenreConfirm"
        />
        <el-button
          text
          circle
          :icon="ElIconMore"
          style="margin-left: 5px"
          @click="splitAndWrite('genre')"
        />
        <el-button text style="margin: 0 10px" @click="handleGenreConfirm"
          >Добавить</el-button
        >
        <el-tag
          v-for="genre in _item.genres"
          :key="genre"
          size="large"
          type="info"
          style="margin-right: 10px"
          closable
          @close="handleGenreDelete(genre)"
        >
          {{ genre }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Длительность:" prop="time">
        <el-row justify="space-between">
          <el-col :span="11">
            <el-input-number v-model="_item.time.count" :min="1" />
            <h4 style="margin: 0">Кол-во элементов</h4>
          </el-col>
          <el-col :span="12" :push="1">
            <el-input-number v-model="_item.time.duration" :min="0" />
            <h4 style="margin: 0">Длительность (мин)</h4>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Год выхода:" prop="year">
        <el-date-picker v-model="_item.year" value-format="YYYY" type="year" />
      </el-form-item>
      <el-form-item
        :label="getDeveloperWordByType(_item.type, 2) + ':'"
        prop="developers"
      >
        <el-input
          v-model="inputDeveloper"
          style="width: 300px; margin-bottom: 5px"
          @keyup.enter="handleDeveloperConfirm"
        />
        <el-button
          text
          circle
          :icon="ElIconMore"
          style="margin-left: 5px"
          @click="splitAndWrite('developer')"
        />
        <el-button text style="margin: 0 10px" @click="handleDeveloperConfirm"
          >Добавить</el-button
        >
        <el-tag
          v-for="developer in _item.developers"
          :key="developer"
          size="large"
          type="info"
          style="margin-right: 10px"
          closable
          @close="handleDeveloperDelete(developer)"
        >
          {{ developer }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Франшиза:" prop="franchise">
        <el-input v-model="_item.franchise" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="save"> Подтвердить </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  target: string
  itemForUpdate: Instance<Item>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { api } = useFeathers()
const authStore = useAuthStore()

const formRef = ref<any>(null)
const _item = ref()

const dialog = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

watch(dialog, (open) => {
  // fix html scroll
  document.documentElement.style.paddingRight = open
    ? window.innerWidth - document.documentElement.clientWidth + 'px'
    : ''
  document.documentElement.style.overflowY = open ? 'hidden' : 'scroll'

  // set _item
  if (open) {
    _item.value =
      props.target === 'create'
        ? api.service('items').new({ userId: authStore.user._id })
        : props.itemForUpdate.clone()
  }
})

const inputGenre = ref('')
const inputDeveloper = ref('')

const handleGenreDelete = (tag: string) => {
  _item.value.genres.splice(_item.value.genres.indexOf(tag), 1)
}

const handleGenreConfirm = () => {
  if (inputGenre.value.trim()) {
    _item.value.genres.push(inputGenre.value.trim())
  }
  inputGenre.value = ''
}

const handleDeveloperDelete = (tag: string) => {
  _item.value.developers.splice(_item.value.developers.indexOf(tag), 1)
}

const handleDeveloperConfirm = () => {
  if (inputDeveloper.value.trim()) {
    _item.value.developers.push(inputDeveloper.value.trim())
  }
  inputDeveloper.value = ''
}

const splitAndWrite = (type: string) => {
  if (type === 'genre') {
    const array = inputGenre.value.trim().split(', ')
    _item.value.genres.push(
      ...array.map((i) => i[0].toUpperCase() + i.slice(1))
    )
    inputGenre.value = ''
  } else if (type === 'developer') {
    const array = inputDeveloper.value.trim().split(', ')
    _item.value.developers.push(
      ...array.map((i) => i[0].toUpperCase() + i.slice(1))
    )
    inputDeveloper.value = ''
  }
}

const save = async () => {
  _item.value.name = _item.value.name.trim()
  _item.value.image = _item.value.image.trim()
  _item.value.franchise = _item.value.franchise.trim()
  try {
    await formRef.value.validate()
    try {
      const response = await _item.value.save()
      dialog.value = false
      ElNotification.success({
        title: response.message,
        position: 'bottom-right',
      })
    } catch (e: any) {
      ElNotification.error({
        title: e.message,
        position: 'bottom-right',
      })
    }
  } catch (error) {
    ElNotification.error({
      title: 'Пожалуйста, заполните все поля',
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>

<style>
.dialog {
  max-width: 1300px;
}

.el-dialog__body {
  padding-top: 0;
}

.el-rate__item {
  line-height: 0;
}

.el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}
</style>
