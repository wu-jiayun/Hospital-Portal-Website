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
  department: '',
  doctor: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  idcard: '',
  description: ''
})

const doctors = [
  { name: '张医生', title: '主任医师', department: '内科' },
  { name: '李医生', title: '副主任医师', department: '内科' },
  { name: '王医生', title: '主治医师', department: '外科' },
  { name: '赵医生', title: '主任医师', department: '外科' },
  { name: '刘医生', title: '副主任医师', department: '妇产科' },
  { name: '陈医生', title: '主治医师', department: '儿科' }
]

const filteredDoctors = computed(() => {
  if (!form.department) return []
  return doctors.filter((d) => d.department === form.department)
})

function reset() {
  form.department = ''
  form.doctor = ''
  form.date = ''
  form.time = ''
  form.name = ''
  form.phone = ''
  form.idcard = ''
  form.description = ''
}

async function submit() {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 900))
    props.showToast('success', '预约成功', '您的预约已提交，请按时到院就诊。')
    reset()
  } catch (e) {
    props.showToast('error', '预约失败', '提交时出现错误，请重试。')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card">
    <h2 class="card-title"><i class="fas fa-calendar-check" /> 预约挂号</h2>

    <form @submit.prevent="submit">
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">选择科室</label>
          <select class="form-control" v-model="form.department" required>
            <option value="">请选择科室</option>
            <option value="内科">内科</option>
            <option value="外科">外科</option>
            <option value="妇产科">妇产科</option>
            <option value="儿科">儿科</option>
            <option value="眼科">眼科</option>
            <option value="耳鼻喉科">耳鼻喉科</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">选择医生</label>
          <select class="form-control" v-model="form.doctor" required>
            <option value="">请选择医生</option>
            <option v-for="d in filteredDoctors" :key="d.name" :value="d.name">{{ d.name }} - {{ d.title }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">就诊日期</label>
          <input class="form-control" type="date" v-model="form.date" required />
        </div>
        <div class="form-group">
          <label class="form-label">就诊时间</label>
          <select class="form-control" v-model="form.time" required>
            <option value="">请选择时间</option>
            <option value="morning">上午</option>
            <option value="afternoon">下午</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">姓名</label>
          <input class="form-control" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label class="form-label">手机号码</label>
          <input class="form-control" v-model="form.phone" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">身份证号</label>
        <input class="form-control" v-model="form.idcard" required />
      </div>

      <div class="form-group">
        <label class="form-label">病情描述</label>
        <textarea class="form-control" rows="4" v-model="form.description" placeholder="请简要描述您的症状或就诊需求" />
      </div>

      <button class="btn" type="submit" :disabled="loading">
        <i class="fas fa-check" />
        {{ loading ? '提交中...' : '提交预约' }}
      </button>
    </form>
  </section>
</template>
