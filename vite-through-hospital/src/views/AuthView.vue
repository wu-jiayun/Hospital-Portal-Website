<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentUser, login, logout, register } from '../stores/auth'

const props = defineProps({
  showToast: {
    type: Function,
    required: true
  }
})

const router = useRouter()
const route = useRoute()

const redirectTo = computed(() => {
  const raw = route.query?.redirect
  return typeof raw === 'string' && raw ? raw : '/'
})

const showMustLoginTip = computed(() => route.query?.reason === 'login')

const mode = ref('login')
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const isLoggedIn = computed(() => !!getCurrentUser())

onMounted(() => {
  if (isLoggedIn.value && redirectTo.value) {
    router.replace(redirectTo.value)
  }
})

function switchMode(next) {
  mode.value = next
  form.password = ''
  form.confirmPassword = ''
}

function validate() {
  const username = String(form.username || '').trim()
  if (!username) throw new Error('请输入用户名')
  if (username.length < 3) throw new Error('用户名至少3位')

  if (!form.password || String(form.password).length < 6) throw new Error('密码至少6位')

  if (mode.value === 'register') {
    if (String(form.password) !== String(form.confirmPassword)) throw new Error('两次密码不一致')
  }

  return { username, password: String(form.password) }
}

async function submit() {
  loading.value = true
  try {
    const payload = validate()

    if (mode.value === 'register') {
      register(payload)
      props.showToast('success', '注册成功', '请使用刚才的账号密码登录。')
      switchMode('login')
      form.username = payload.username
      return
    }

    login(payload)
    props.showToast('success', '登录成功', '欢迎回来！')
    router.push(redirectTo.value)
  } catch (e) {
    props.showToast('error', '操作失败', e?.message || '请检查输入后重试')
  } finally {
    loading.value = false
  }
}

function doLogout() {
  logout()
  props.showToast('success', '已退出登录', '你已成功退出。')
}
</script>

<template>
  <section class="card" aria-label="登录与注册">
    <h2 class="card-title"><i class="fas fa-user" /> 登录 / 注册</h2>

    <div v-if="showMustLoginTip && !isLoggedIn" class="card" style="margin-bottom: 14px">
      <strong>提示</strong>
      <div class="muted" style="margin-top: 6px; line-height: 1.8">
        你正在访问需要登录的功能，请先登录后继续。
      </div>
    </div>

    <div v-if="isLoggedIn" class="muted" style="margin-bottom: 12px">
      当前已登录用户：<strong>{{ getCurrentUser()?.username }}</strong>
    </div>

    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px">
      <button
        class="btn"
        type="button"
        :class="{ 'btn-success': mode === 'login' }"
        @click="switchMode('login')"
        aria-label="切换到登录"
      >
        <i class="fas fa-right-to-bracket" />
        登录
      </button>
      <button
        class="btn"
        type="button"
        :class="{ 'btn-success': mode === 'register' }"
        @click="switchMode('register')"
        aria-label="切换到注册"
      >
        <i class="fas fa-user-plus" />
        注册
      </button>
      <button v-if="isLoggedIn" class="btn" type="button" @click="doLogout" aria-label="退出登录">
        <i class="fas fa-arrow-right-from-bracket" />
        退出
      </button>
    </div>

    <form @submit.prevent="submit" autocomplete="on">
      <div class="form-group">
        <label class="form-label" for="username">用户名</label>
        <input
          id="username"
          class="form-control"
          v-model="form.username"
          autocomplete="username"
          required
          minlength="3"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="password">密码</label>
        <input
          id="password"
          class="form-control"
          type="password"
          v-model="form.password"
          autocomplete="current-password"
          required
          minlength="6"
        />
      </div>

      <div v-if="mode === 'register'" class="form-group">
        <label class="form-label" for="confirm">确认密码</label>
        <input
          id="confirm"
          class="form-control"
          type="password"
          v-model="form.confirmPassword"
          autocomplete="new-password"
          required
          minlength="6"
        />
      </div>

      <button class="btn btn-success" type="submit" :disabled="loading" :aria-busy="loading">
        <i :class="mode === 'login' ? 'fas fa-right-to-bracket' : 'fas fa-user-plus'" />
        {{ loading ? '处理中...' : mode === 'login' ? '登录' : '注册' }}
      </button>

      <div class="muted" style="margin-top: 10px; line-height: 1.8">
        说明：此演示版本使用 <code>localStorage</code> 本地保存账号信息，仅用于前端展示。
      </div>
    </form>
  </section>
</template>
