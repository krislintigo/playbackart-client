<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <el-avatar :size="50" :icon="store.state.user._id ? User : Failed" />
    </template>
    <h2>Профиль</h2>
    <div v-if="store.state.user.login">
      <h3 >Добро пожаловать, {{store.state.user.login}}!</h3>
      <el-row justify="end">
        <el-button type="danger" @click="logout">Выход</el-button>
      </el-row>
    </div>
    <div v-else>
      <h3>Войдите в аккаунт!</h3>
      <el-form v-model="inputInfo" label-position="right" :label-width="65">
        <el-form-item label="Логин">
          <el-input v-model="inputInfo.login" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="inputInfo.password" type="password" show-password />
        </el-form-item>
        <el-row justify="end">
          <el-button type="success" @click="login">Вход</el-button>
          <el-button type="warning" @click="registration">Регистрация</el-button>
        </el-row>
      </el-form>
    </div>

  </el-popover>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useStore } from 'vuex'
import { User, Failed } from '@element-plus/icons-vue'
import { AuthAPI } from '@/api/AuthAPI'
import { userNames } from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { UserAPI } from '@/api/UserAPI'

const store = useStore()

const inputInfo = reactive({
  login: '',
  password: ''
})

onBeforeMount(async () => {
  try {
    const validateResponse = await AuthAPI.validate()
    const userResponse = await UserAPI.getOneShort(validateResponse.data.id)
    store.commit(userNames.setUser, userResponse.data)
  } catch (e) {
    console.error('Invalid token')
  }
})

const login = async () => {
  try {
    const response = await AuthAPI.login(inputInfo.login, inputInfo.password)
    store.commit(userNames.setUser, response.data)
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
}

const registration = async () => {
  try {
    const response = await AuthAPI.register(inputInfo.login, inputInfo.password)
    store.commit(userNames.setUser, response.data)
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
}

const logout = async () => {
  try {
    const response = await AuthAPI.logout()
    store.commit(userNames.resetUser)
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
}
</script>

<style scoped>

</style>
