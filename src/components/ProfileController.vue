<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <el-avatar :size="50" :icon="Avatar" />
    </template>
    <h2>Профиль</h2>
    <h3 v-if="store.state.user.login">Добро пожаловать, {{store.state.user.login}}!</h3>
    <h3 v-else>Войдите в аккаунт!</h3>
    <el-form v-model="inputInfo" label-position="right" :label-width="65">
      <el-form-item label="Логин">
        <el-input v-model="inputInfo.login" />
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input v-model="inputInfo.password" type="password" show-password />
      </el-form-item>
      <el-row justify="end">
        <el-button type="success" @click="login">Sign in</el-button>
        <el-button type="warning" @click="registration">Sign up</el-button>
        <el-button type="danger" @click="logout">Logout</el-button>
      </el-row>
    </el-form>
  </el-popover>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useStore } from 'vuex'
import { Avatar } from '@element-plus/icons-vue'
import { AuthAPI } from '@/api/AuthAPI'
import { userNames } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
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
    ElMessage.success(response.message)
  } catch (e) {
    ElMessage.error(e.response.data.message)
  }
}

const registration = async () => {
  try {
    const response = await AuthAPI.register(inputInfo.login, inputInfo.password)
    store.commit(userNames.setUser, response.data)
    ElMessage.success(response.message)
  } catch (e) {
    ElMessage.error(e.response.data.message)
  }
}

const logout = async () => {
  try {
    const response = await AuthAPI.logout()
    store.commit(userNames.resetUser)
    ElMessage.success(response.message)
  } catch (e) {
    ElMessage.error(e.response.data.message)
  }
}
</script>

<style scoped>

</style>
