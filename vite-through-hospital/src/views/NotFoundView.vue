<template>
  <section class="card">
    <h2 class="card-title"><i class="fas fa-circle-exclamation" /> 页面不存在</h2>
    <div class="muted" style="margin-bottom: 14px">你访问的页面不存在，请返回首页。</div>
    <RouterLink class="btn" to="/"><i class="fas fa-house" /> 返回首页</RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
