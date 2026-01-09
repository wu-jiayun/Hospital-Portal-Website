<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  showToast: {
    type: Function,
    required: true
  }
})

const loading = ref(false)

const interests = [
  '疾病防治',
  '营养健康',
  '运动健身',
  '心理健康',
  '老年保健',
  '儿童健康',
  '女性健康',
  '慢性病管理'
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  age: '',
  interests: [],
  frequency: '',
  channels: []
})

function reset() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.age = ''
  form.interests = []
  form.frequency = ''
  form.channels = []
}

async function submit() {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 900))
    props.showToast('success', '订阅成功', '你已成功订阅健康科普推送，我们将按偏好发送内容。')
    reset()
  } catch (e) {
    props.showToast('error', '订阅失败', '请稍后重试。')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card">
    <h2 class="card-title"><i class="fas fa-bell" /> 健康科普推送订阅</h2>

    <form @submit.prevent="submit">
      <div class="form-group">
        <label class="form-label">个人信息</label>
        <div class="grid grid-2">
          <input class="form-control" v-model="form.name" placeholder="姓名" required />
          <input class="form-control" type="email" v-model="form.email" placeholder="邮箱" required />
        </div>
        <div class="grid grid-2" style="margin-top: 12px">
          <input class="form-control" v-model="form.phone" placeholder="手机号" required />
          <select class="form-control" v-model="form.age" required>
            <option value="">年龄段</option>
            <option value="18-30">18-30岁</option>
            <option value="31-45">31-45岁</option>
            <option value="46-60">46-60岁</option>
            <option value="60+">60岁以上</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">兴趣分类（可多选）</label>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <label v-for="i in interests" :key="i" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="checkbox" :value="i" v-model="form.interests" />
            {{ i }}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">推送频率</label>
        <select class="form-control" v-model="form.frequency" required>
          <option value="">请选择推送频率</option>
          <option value="daily">每日推送</option>
          <option value="weekly">每周推送</option>
          <option value="monthly">每月推送</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">推送渠道</label>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="checkbox" value="sms" v-model="form.channels" /> 短信
          </label>
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="checkbox" value="email" v-model="form.channels" /> 邮件
          </label>
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="checkbox" value="wechat" v-model="form.channels" /> 微信
          </label>
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer">
            <input type="checkbox" value="app" v-model="form.channels" /> APP推送
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">内容预览</label>
        <div class="card" style="background: rgba(127, 140, 141, 0.08)">
          <h4 style="margin: 0 0 10px; color: var(--primary-color)">今日健康资讯</h4>
          <div class="muted" style="line-height: 1.9">
            1. 春季过敏预防指南<br />
            2. 高血压患者饮食建议<br />
            3. 办公室颈椎保护操<br />
            4. 儿童疫苗接种时间表
          </div>
        </div>
      </div>

      <button class="btn btn-success" type="submit" :disabled="loading">
        <i class="fas fa-bell" />
        {{ loading ? '订阅中...' : '立即订阅' }}
      </button>
    </form>
  </section>
</template>
