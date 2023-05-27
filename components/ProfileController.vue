<template>
  <el-popover placement="bottom" :width="380" trigger="click">
    <template #reference>
      <el-avatar :size="50" :icon="authStore.isAuthenticated ? User : Failed" />
    </template>
    <el-row justify="space-between" align="middle">
      <h2>Профиль</h2>
      <el-button circle text size="large" @click="dark = !dark">
        <el-icon v-if="dark" :size="24"><Sunny /></el-icon>
        <el-icon v-else :size="24"><Moon /></el-icon>
      </el-button>
    </el-row>
    <div v-if="authStore.user?.login">
      <h3>Добро пожаловать, {{ authStore.user.login }}!</h3>
      <h4 style="margin-bottom: 5px">
        Ваш список слежения:
        <el-button
          text
          circle
          :type="watchingChanged ? 'warning' : 'success'"
          size="small"
          @click="saveWatching"
        >
          <el-icon :size="20"><CircleCheck /></el-icon>
        </el-button>
      </h4>
      <!--      <TextEditor v-model="watching" @input="watchingChanged = true" />-->
      <el-row justify="end" style="margin-top: 10px">
        <el-button type="danger" @click="handleUserAction('logout')"
          >Выход</el-button
        >
      </el-row>
    </div>
    <div v-else>
      <h3>Войдите в аккаунт!</h3>
      <el-form v-model="authData" label-position="right" :label-width="65">
        <el-form-item label="Логин">
          <el-input v-model="authData.login" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="authData.password" type="password" show-password />
        </el-form-item>
        <el-row justify="end">
          <el-button type="success" @click="handleUserAction('login')"
            >Вход</el-button
          >
          <el-button type="warning" @click="handleUserAction('register')"
            >Регистрация</el-button
          >
        </el-row>
      </el-form>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { User, Failed, CircleCheck, Sunny, Moon } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const { api } = useFeathers()
const authStore = useAuthStore()

const authData = reactive({
  login: '',
  password: '',
})

// const watching = computed({
//   get: () => authStore.user.watching,
//   set: (value) => store.commit(userNames.setWatching, value),
// })
const watchingChanged = ref<boolean>(false)
// const dark = ref(!!localStorage.getItem('theme'))
const dark = ref(true)

// ;(async () => {
//   try {
//     const validateResponse = await AuthAPI.validate()
//     const userResponse = await UserAPI.getOneShort(validateResponse.data.id)
//     store.commit(userNames.setUser, userResponse.data)
//   } catch (e) {
//     console.error('Invalid token')
//   }
// })()

const handleUserAction = async (action: 'register' | 'login' | 'logout') => {
  try {
    switch (action) {
      case 'login': {
        await authStore.authenticate({ strategy: 'local', ...authData })
        break
      }
      case 'logout': {
        await authStore.logout()
        break
      }
      case 'register': {
        await api
          .service('users')
          .new({ ...authData })
          .save()
        await authStore.authenticate({ strategy: 'local', ...authData })
      }
    }
    ElNotification.success({
      title: 'НЕКОЕ СООБЩЕНИЕ',
      position: 'bottom-right',
    })
  } catch (e: any) {
    ElNotification.error({
      title: e.message,
      position: 'bottom-right',
    })
  }
}

const saveWatching = async () => {
  try {
    const response = await UserAPI.updateWatching(watching.value)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right',
    })
    watchingChanged.value = false
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right',
    })
  }
}

watchEffect(() => {
  if (dark.value) {
    // localStorage.setItem('theme', 'dark')
    // document.documentElement.classList.add('dark')
  } else {
    // localStorage.removeItem('theme')
    // document.documentElement.classList.remove('dark')
  }
})
</script>

<style scoped></style>

<style></style>
