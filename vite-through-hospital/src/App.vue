<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { getCurrentUser, logout } from './stores/auth'

const route = useRoute()
const router = useRouter()

const toast = ref({ show: false, type: 'info', title: '', message: '' })

function showToast(type, title, message) {
  toast.value = { show: true, type, title, message }
  window.setTimeout(() => {
    toast.value.show = false
  }, 2500)
}

const isDarkMode = ref(false)
const isHighContrast = ref(false)
const mobileMenuOpen = ref(false)

function applyTheme(nextIsDark) {
  isDarkMode.value = nextIsDark
  document.documentElement.setAttribute('data-theme', nextIsDark ? 'dark' : 'light')
  localStorage.setItem('theme', nextIsDark ? 'dark' : 'light')
}

function toggleTheme() {
  applyTheme(!isDarkMode.value)
}

function applyContrast(nextIsHigh) {
  isHighContrast.value = nextIsHigh
  if (nextIsHigh) {
    document.documentElement.setAttribute('data-contrast', 'high')
  } else {
    document.documentElement.removeAttribute('data-contrast')
  }
  localStorage.setItem('contrast', nextIsHigh ? 'high' : 'normal')
}

function toggleContrast() {
  applyContrast(!isHighContrast.value)
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function doLogout() {
  logout()
  showToast('success', '已退出登录', '你已成功退出。')
  router.push('/auth')
}

const isLoggedIn = computed(() => !!getCurrentUser())

const themeButtonText = computed(() => (isDarkMode.value ? '日间模式' : '夜间模式'))
const themeIconClass = computed(() => (isDarkMode.value ? 'fas fa-sun' : 'fas fa-moon'))

const contrastButtonText = computed(() => (isHighContrast.value ? '标准对比度' : '高对比度'))
const contrastIconClass = computed(() => (isHighContrast.value ? 'fas fa-circle-half-stroke' : 'fas fa-circle'))

const onKeyDown = (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  applyTheme(saved === 'dark')

  const savedContrast = localStorage.getItem('contrast')
  if (savedContrast === 'high') {
    applyContrast(true)
  } else if (savedContrast === 'normal') {
    applyContrast(false)
  } else {
    const prefersHigh = window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches
    applyContrast(!!prefersHigh)
  }

  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
  }
)
</script>

<template>
  <div>
    <a class="skip-link" href="#main">跳到主要内容</a>
    <header class="navbar">
      <div class="container navbar-inner">
        <div class="logo" aria-label="through医院">
          <i class="fas fa-hospital" />
          <span>through医院</span>
        </div>

        <nav class="nav-links nav-links-desktop" aria-label="主导航">
          <RouterLink class="nav-link" :class="{ active: route.name === 'home' }" to="/">首页</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'appointment' }" to="/appointment">预约挂号</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'consult' }" to="/consult">在线咨询</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'health' }" to="/health">健康科普</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'scene' }" to="/scene">特色内容</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'satisfaction' }" to="/satisfaction">满意度调查</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'subscribe' }" to="/subscribe">科普订阅</RouterLink>
          <RouterLink v-if="!isLoggedIn" class="nav-link" :class="{ active: route.name === 'auth' }" to="/auth">登录</RouterLink>
          <button v-else class="nav-link" type="button" @click="doLogout" aria-label="退出登录">退出</button>

          <button class="theme-toggle" type="button" @click="toggleTheme" :aria-pressed="isDarkMode" aria-label="切换夜间模式">
            <i :class="themeIconClass" />
            {{ themeButtonText }}
          </button>

          <button class="theme-toggle" type="button" @click="toggleContrast" :aria-pressed="isHighContrast" aria-label="切换高对比度模式">
            <i :class="contrastIconClass" />
            {{ contrastButtonText }}
          </button>
        </nav>

        <div class="nav-actions-mobile">
          <button
            class="theme-toggle"
            type="button"
            @click="toggleTheme"
            :aria-pressed="isDarkMode"
            aria-label="切换夜间模式"
          >
            <i :class="themeIconClass" />
          </button>
          <button
            class="theme-toggle"
            type="button"
            @click="toggleContrast"
            :aria-pressed="isHighContrast"
            aria-label="切换高对比度模式"
          >
            <i :class="contrastIconClass" />
          </button>
          <button
            class="theme-toggle mobile-menu-toggle"
            type="button"
            @click="toggleMobileMenu"
            aria-label="打开或关闭菜单"
            aria-controls="mobile-menu"
            :aria-expanded="mobileMenuOpen"
          >
            <i :class="mobileMenuOpen ? 'fas fa-xmark' : 'fas fa-bars'" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        class="mobile-menu"
        :class="{ open: mobileMenuOpen }"
        aria-label="移动端主导航"
      >
        <div class="container mobile-menu-inner">
          <RouterLink class="nav-link" :class="{ active: route.name === 'home' }" to="/" @click="closeMobileMenu">首页</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'appointment' }" to="/appointment" @click="closeMobileMenu">预约挂号</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'consult' }" to="/consult" @click="closeMobileMenu">在线咨询</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'health' }" to="/health" @click="closeMobileMenu">健康科普</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'scene' }" to="/scene" @click="closeMobileMenu">特色内容</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'satisfaction' }" to="/satisfaction" @click="closeMobileMenu">满意度调查</RouterLink>
          <RouterLink class="nav-link" :class="{ active: route.name === 'subscribe' }" to="/subscribe" @click="closeMobileMenu">科普订阅</RouterLink>
          <RouterLink v-if="!isLoggedIn" class="nav-link" :class="{ active: route.name === 'auth' }" to="/auth" @click="closeMobileMenu">登录</RouterLink>
          <button v-else class="nav-link" type="button" @click="doLogout" aria-label="退出登录">退出</button>
        </div>
      </nav>
    </header>

    <main id="main" class="container page" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" :show-toast="showToast" />
        </transition>
      </RouterView>
    </main>

    <div v-if="toast.show" class="toast" :class="toast.type">
      <div style="display: flex; align-items: center; gap: 10px">
        <i
          :class="
            toast.type === 'success'
              ? 'fas fa-check-circle'
              : toast.type === 'error'
                ? 'fas fa-exclamation-circle'
                : 'fas fa-info-circle'
          "
        />
        <div>
          <strong>{{ toast.title }}</strong>
          <div class="muted" style="font-size: 0.9rem">{{ toast.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.2s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}
</style>
