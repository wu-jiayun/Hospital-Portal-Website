import { computed, reactive } from 'vue'

const USERS_KEY = 'through_users'
const SESSION_KEY = 'through_session'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const state = reactive({
  user: null
})

export const isLoggedIn = computed(() => !!state.user)

export function initAuth() {
  const session = readJson(SESSION_KEY, null)
  if (session && session.username) {
    state.user = { username: session.username }
  }
}

export function register({ username, password }) {
  const users = readJson(USERS_KEY, [])

  const normalized = String(username || '').trim()
  if (!normalized) throw new Error('请输入用户名')
  if (normalized.length < 3) throw new Error('用户名至少3位')
  if (!password || String(password).length < 6) throw new Error('密码至少6位')

  if (users.some((u) => u.username === normalized)) {
    throw new Error('该用户名已存在')
  }

  users.push({ username: normalized, password: String(password) })
  writeJson(USERS_KEY, users)

  return { username: normalized }
}

export function login({ username, password }) {
  const users = readJson(USERS_KEY, [])
  const normalized = String(username || '').trim()

  const user = users.find((u) => u.username === normalized)
  if (!user) throw new Error('用户不存在，请先注册')
  if (String(user.password) !== String(password)) throw new Error('密码错误')

  writeJson(SESSION_KEY, { username: normalized, at: Date.now() })
  state.user = { username: normalized }
  return state.user
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  state.user = null
}

export function getCurrentUser() {
  return state.user
}
