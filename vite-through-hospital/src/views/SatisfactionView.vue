<script setup>
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  showToast: {
    type: Function,
    required: true
  }
})

const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  registration: 0,
  waiting: 0,
  doctor: 0,
  nurse: 0,
  overall: 0,
  suggestions: '',
  recommend: ''
})

const progress = computed(() => {
  let count = 0
  if (form.name) count++
  if (form.phone) count++
  if (form.registration) count++
  if (form.waiting) count++
  if (form.doctor) count++
  if (form.nurse) count++
  if (form.overall) count++
  if (form.recommend) count++
  return count
})

function setRating(key, star) {
  form[key] = star
}

function reset() {
  form.name = ''
  form.phone = ''
  form.registration = 0
  form.waiting = 0
  form.doctor = 0
  form.nurse = 0
  form.overall = 0
  form.suggestions = ''
  form.recommend = ''
}

async function submit() {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 900))
    props.showToast('success', '感谢您的反馈', '满意度调查已提交，我们会认真分析您的建议。')
    reset()
  } catch (e) {
    props.showToast('error', '提交失败', '请稍后重试。')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card">
    <h2 class="card-title"><i class="fas fa-star" /> 就医满意度调查</h2>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: (progress / 8) * 100 + '%' }" />
    </div>
    <div class="muted" style="text-align: center">完成进度：{{ Math.round((progress / 8) * 100) }}%</div>

    <form style="margin-top: 16px" @submit.prevent="submit">
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">姓名</label>
          <input class="form-control" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label class="form-label">联系电话</label>
          <input class="form-control" v-model="form.phone" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">挂号服务评价</label>
        <div class="star-rating">
          <span v-for="s in 5" :key="s" class="star" :class="{ filled: form.registration >= s }" @click="setRating('registration', s)">
            <i class="fas fa-star" />
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">候诊环境评价</label>
        <div class="star-rating">
          <span v-for="s in 5" :key="s" class="star" :class="{ filled: form.waiting >= s }" @click="setRating('waiting', s)">
            <i class="fas fa-star" />
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">医生服务评价</label>
        <div class="star-rating">
          <span v-for="s in 5" :key="s" class="star" :class="{ filled: form.doctor >= s }" @click="setRating('doctor', s)">
            <i class="fas fa-star" />
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">护士服务评价</label>
        <div class="star-rating">
          <span v-for="s in 5" :key="s" class="star" :class="{ filled: form.nurse >= s }" @click="setRating('nurse', s)">
            <i class="fas fa-star" />
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">整体体验评价</label>
        <div class="star-rating">
          <span v-for="s in 5" :key="s" class="star" :class="{ filled: form.overall >= s }" @click="setRating('overall', s)">
            <i class="fas fa-star" />
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">改进建议</label>
        <textarea class="form-control" rows="4" v-model="form.suggestions" placeholder="请提出您的宝贵建议" />
      </div>

      <div class="form-group">
        <label class="form-label">推荐意愿</label>
        <div style="display: flex; gap: 16px">
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="radio" value="yes" v-model="form.recommend" required />
            愿意推荐
          </label>
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="radio" value="no" v-model="form.recommend" required />
            不愿意推荐
          </label>
        </div>
      </div>

      <button class="btn btn-success" type="submit" :disabled="loading">
        <i class="fas fa-check" />
        {{ loading ? '提交中...' : '提交调查' }}
      </button>
    </form>
  </section>
</template>
