import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AppointmentView from '../views/AppointmentView.vue'
import ConsultView from '../views/ConsultView.vue'
import HealthView from '../views/HealthView.vue'
import SatisfactionView from '../views/SatisfactionView.vue'
import SubscribeView from '../views/SubscribeView.vue'
import AuthView from '../views/AuthView.vue'
import SceneView from '../views/SceneView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { getCurrentUser } from '../stores/auth'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/appointment', name: 'appointment', component: AppointmentView, meta: { requiresAuth: true } },
    { path: '/consult', name: 'consult', component: ConsultView, meta: { requiresAuth: true } },
    { path: '/health', name: 'health', component: HealthView },
    { path: '/scene', name: 'scene', component: SceneView },
    { path: '/satisfaction', name: 'satisfaction', component: SatisfactionView, meta: { requiresAuth: true } },
    { path: '/subscribe', name: 'subscribe', component: SubscribeView, meta: { requiresAuth: true } },
    { path: '/auth', name: 'auth', component: AuthView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const needsAuth = !!to.meta?.requiresAuth
  const authed = !!getCurrentUser()

  if (!needsAuth) return true
  if (authed) return true

  return {
    name: 'auth',
    query: {
      redirect: to.fullPath,
      reason: 'login'
    }
  }
})

export default router
