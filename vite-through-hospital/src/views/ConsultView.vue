<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  showToast: {
    type: Function,
    required: true
  }
})

const selectedType = ref('')
const loading = ref(false)

const form = reactive({
  category: '',
  name: '',
  phone: '',
  description: '',
  responseTime: ''
})

function typeName(t) {
  const names = {
    general: '普通咨询',
    expert: '专家咨询',
    emergency: '紧急咨询'
  }
  return names[t] || '咨询'
}

function selectType(t) {
  selectedType.value = t
  props.showToast('info', '已选择', `你选择了${typeName(t)}，请填写表单。`)
}

function reset() {
  selectedType.value = ''
  form.category = ''
  form.name = ''
  form.phone = ''
  form.description = ''
  form.responseTime = ''
}

async function submit() {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 900))
    props.showToast('success', '提交成功', '医生会在期望时间内回复。')
    reset()
  } catch (e) {
    props.showToast('error', '提交失败', '请稍后重试。')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid" style="gap: 18px">
    <section class="card">
      <h2 class="card-title"><i class="fas fa-comments" /> 在线咨询</h2>
      <div class="grid grid-3">
        <div class="service-card" @click="selectType('general')">
          <i class="fas fa-user-md" />
          <h3 style="margin: 0">普通咨询</h3>
          <div class="muted">常见健康问题咨询</div>
        </div>
        <div class="service-card" @click="selectType('expert')">
          <i class="fas fa-stethoscope" />
          <h3 style="margin: 0">专家咨询</h3>
          <div class="muted">资深专家深度咨询</div>
        </div>
        <div class="service-card" @click="selectType('emergency')">
          <i class="fas fa-ambulance" style="color: var(--danger-color)" />
          <h3 style="margin: 0">紧急咨询</h3>
          <div class="muted">急症快速响应</div>
        </div>
      </div>
    </section>

    <section v-if="selectedType" class="card">
      <h3 class="card-title" style="font-size: 1.2rem"><i class="fas fa-edit" /> 咨询表单 - {{ typeName(selectedType) }}</h3>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label class="form-label">咨询类别</label>
          <select class="form-control" v-model="form.category" required>
            <option value="">请选择咨询类别</option>
            <option value="symptom">症状咨询</option>
            <option value="treatment">治疗方案</option>
            <option value="examination">检查报告</option>
            <option value="medication">用药指导</option>
            <option value="prevention">预防保健</option>
          </select>
        </div>

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
          <label class="form-label">问题描述</label>
          <textarea class="form-control" rows="5" v-model="form.description" required />
        </div>

        <div class="form-group">
          <label class="form-label">期望回复时间</label>
          <select class="form-control" v-model="form.responseTime" required>
            <option value="">请选择</option>
            <option value="asap">尽快回复</option>
            <option value="24h">24小时内</option>
            <option value="48h">48小时内</option>
          </select>
        </div>

        <button class="btn" type="submit" :disabled="loading">
          <i class="fas fa-paper-plane" />
          {{ loading ? '提交中...' : '提交咨询' }}
        </button>
      </form>
    </section>
  </div>
</template>
