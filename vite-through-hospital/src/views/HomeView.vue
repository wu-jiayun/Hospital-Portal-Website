<script setup>
import { useRouter } from 'vue-router'
import LazyImage from '../components/LazyImage.vue'

const heroUrl = '/images/scene/hero.jpg'

const router = useRouter()

function go(path) {
  router.push(path)
}
</script>

<template>
  <div class="grid" style="gap: 18px">
    <section class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white">
      <h1 style="margin: 0 0 8px; font-size: 2rem">欢迎来到through医院</h1>
      <div style="opacity: 0.95">专业医疗，贴心服务，守护您的健康</div>
    </section>

    <section class="card" aria-label="医院宣传图">
      <h2 class="card-title"><i class="fas fa-image" /> 医院服务宣传</h2>
      <LazyImage
        :src="heroUrl"
        alt="中国医院门诊楼/门诊部实拍照片"
        width="1200"
        height="700"
        class-name="hero-img"
      />
      <div class="muted" style="margin-top: 10px">图片已启用懒加载（进入视口后再加载），提升首屏速度。</div>
    </section>

    <section class="card">
      <h2 class="card-title"><i class="fas fa-th-large" /> 快速服务</h2>
      <div class="grid grid-4">
        <div class="service-card" @click="go('/appointment')">
          <i class="fas fa-calendar-check" />
          <h3 style="margin: 0">预约挂号</h3>
          <div class="muted">在线预约专家门诊</div>
        </div>
        <div class="service-card" @click="go('/consult')">
          <i class="fas fa-comments" />
          <h3 style="margin: 0">在线咨询</h3>
          <div class="muted">专业医师在线答疑</div>
        </div>
        <div class="service-card" @click="go('/health')">
          <i class="fas fa-heartbeat" />
          <h3 style="margin: 0">健康科普</h3>
          <div class="muted">分类阅读与详情</div>
        </div>
        <div class="service-card" @click="go('/satisfaction')">
          <i class="fas fa-star" />
          <h3 style="margin: 0">满意度调查</h3>
          <div class="muted">就医体验反馈</div>
        </div>
        <div class="service-card" @click="go('/subscribe')">
          <i class="fas fa-bell" />
          <h3 style="margin: 0">科普订阅</h3>
          <div class="muted">个性化推送设置</div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2 class="card-title"><i class="fas fa-chart-bar" /> 医院概况</h2>
      <div class="grid grid-4">
        <div class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white">
          <div style="font-size: 2rem; font-weight: 800">500+</div>
          <div style="opacity: 0.9">专业医师</div>
        </div>
        <div class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white">
          <div style="font-size: 2rem; font-weight: 800">50+</div>
          <div style="opacity: 0.9">临床科室</div>
        </div>
        <div class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white">
          <div style="font-size: 2rem; font-weight: 800">1000+</div>
          <div style="opacity: 0.9">床位数量</div>
        </div>
        <div class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white">
          <div style="font-size: 2rem; font-weight: 800">20+</div>
          <div style="opacity: 0.9">年建院历史</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-img {
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid var(--border);
}
</style>
