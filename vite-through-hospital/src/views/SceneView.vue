<script setup>
import { computed, ref } from 'vue'
import LazyImage from '../components/LazyImage.vue'

const mapUrl = '/images/scene/exterior.jpg'
const envLobby1Url = '/images/scene/lobby-1.jpg'
const envWaitingUrl = '/images/scene/waiting-room.jpg'
const envReceptionUrl = '/images/scene/reception.jpg'
const envCorridorUrl = '/images/scene/corridor.jpg'
const envEntranceUrl = '/images/scene/entrance.jpg'
const envEmergencyUrl = '/images/scene/emergency.jpg'

const departments = [
  '全部',
  '内科',
  '外科',
  '妇产科',
  '儿科',
  '眼科',
  '耳鼻喉科',
  '口腔科',
  '急诊科'
]

const selectedDept = ref('全部')
const selectedDate = ref('')

const schedule = ref([
  {
    id: 1,
    dept: '内科',
    doctor: '张医生',
    title: '主任医师',
    date: '2026-01-10',
    period: '上午',
    location: '门诊楼A区 2F 内科诊区'
  },
  {
    id: 2,
    dept: '内科',
    doctor: '李医生',
    title: '副主任医师',
    date: '2026-01-10',
    period: '下午',
    location: '门诊楼A区 2F 内科诊区'
  },
  {
    id: 3,
    dept: '外科',
    doctor: '王医生',
    title: '主治医师',
    date: '2026-01-11',
    period: '上午',
    location: '门诊楼B区 3F 外科诊区'
  },
  {
    id: 4,
    dept: '妇产科',
    doctor: '刘医生',
    title: '副主任医师',
    date: '2026-01-11',
    period: '下午',
    location: '门诊楼C区 4F 妇产科诊区'
  },
  {
    id: 5,
    dept: '儿科',
    doctor: '陈医生',
    title: '主治医师',
    date: '2026-01-12',
    period: '上午',
    location: '门诊楼C区 1F 儿科诊区'
  },
  {
    id: 6,
    dept: '急诊科',
    doctor: '急诊团队',
    title: '24小时值守',
    date: '2026-01-10',
    period: '全天',
    location: '急诊楼 1F'
  }
])

const filteredSchedule = computed(() => {
  return schedule.value.filter((s) => {
    const okDept = selectedDept.value === '全部' || s.dept === selectedDept.value
    const okDate = !selectedDate.value || s.date === selectedDate.value
    return okDept && okDate
  })
})

const selectedArticle = ref(null)

function openArticle(article) {
  console.log('Scene openArticle called with:', article)
  selectedArticle.value = article
}

function backToList() {
  console.log('Scene backToList called')
  selectedArticle.value = null
}

const healthContent = ref([
  {
    id: 1,
    type: 'article',
    title: '冬春呼吸道感染预防：口罩、通风与手卫生怎么做？',
    summary: '针对流感/新冠/普通感冒高发季的家庭防护建议与就医提示。',
    tag: '呼吸健康'
  },
  {
    id: 2,
    type: 'article',
    title: '高血压日常管理：低盐饮食、家庭血压监测与按时服药',
    summary: '更贴近国内门诊随访场景：如何记录血压、如何控制钠摄入。',
    tag: '慢病管理'
  },
  {
    id: 3,
    type: 'video',
    title: '3分钟颈肩放松操（视频）',
    summary: '久坐人群可跟练的颈肩放松动作（国内平台示例链接）。',
    tag: '运动康复',
    url: 'https://search.bilibili.com/all?keyword=%E9%A2%88%E8%82%A9%20%E6%94%BE%E6%9D%BE%E6%93%8D'
  },
  {
    id: 4,
    type: 'video',
    title: '七步洗手法与手卫生（视频）',
    summary: '医务人员常用手卫生方法（国内平台示例链接）。',
    tag: '健康习惯',
    url: 'https://search.bilibili.com/all?keyword=%E4%B8%83%E6%AD%A5%E6%B4%97%E6%89%8B%E6%B3%95%20%E6%89%8B%E5%8D%AB%E7%94%9F'
  },
  {
    id: 5,
    type: 'article',
    title: '儿童发热怎么办：退烧药选择与就医时机',
    summary: '对乙酰氨基酚/布洛芬的用药原则与常见误区。',
    tag: '儿科'
  },
  {
    id: 6,
    type: 'article',
    title: '体检报告看不懂？血脂/血糖/尿酸三项怎么解读',
    summary: '常见指标参考范围与生活方式建议（以医生解读为准）。',
    tag: '检验检查'
  }
])
</script>

<template>
  <div class="grid" style="gap: 18px">
    <section class="card">
      <h2 class="card-title"><i class="fas fa-clipboard-list" /> 专家坐诊时间表</h2>

      <div class="grid grid-2" style="align-items: end">
        <div class="form-group">
          <label class="form-label" for="dept">科室筛选</label>
          <select id="dept" class="form-control" v-model="selectedDept">
            <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="date">日期筛选</label>
          <input id="date" class="form-control" type="date" v-model="selectedDate" />
        </div>
      </div>

      <div v-if="filteredSchedule.length === 0" class="card" style="margin-top: 12px">
        <strong>暂无匹配的坐诊信息</strong>
        <div class="muted" style="margin-top: 6px">请更换科室/日期筛选条件。</div>
      </div>

      <div v-else class="grid" style="gap: 12px; margin-top: 12px">
        <div v-for="s in filteredSchedule" :key="s.id" class="card" style="padding: 16px">
          <div style="display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap">
            <div>
              <div style="font-weight: 800; color: var(--primary-color)">{{ s.dept }} · {{ s.doctor }}</div>
              <div class="muted" style="margin-top: 4px">{{ s.title }}</div>
              <div class="muted" style="margin-top: 6px">地点：{{ s.location }}</div>
            </div>
            <div style="text-align: right">
              <span class="badge">{{ s.date }}</span>
              <span class="badge success">{{ s.period }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="muted" style="margin-top: 12px; line-height: 1.8">
        提示：坐诊信息为演示数据，实际以医院公告为准。
      </div>
    </section>

    <section class="card">
      <h2 class="card-title"><i class="fas fa-map-location-dot" /> 科室分布地图</h2>
      <LazyImage
        :src="mapUrl"
        alt="医院外景与导引示意（真实照片占位）"
        class-name="scene-img"
        width="1200"
        height="700"
      />
      <div class="muted" style="margin-top: 10px">地图图片已替换为真实照片占位（离线可用）。如需真实院内导视图，请提供或授权获取。</div>
    </section>

    <section class="card">
      <h2 class="card-title"><i class="fas fa-notes-medical" /> 健康科普文章 / 视频</h2>

      <div class="grid grid-2">
        <div v-for="c in healthContent" :key="c.id" class="card" style="padding: 16px; cursor: pointer" @click="c.type === 'article' ? openArticle(c) : undefined">
          <div style="display: flex; justify-content: space-between; gap: 10px; align-items: start">
            <div>
              <div style="font-weight: 800; color: var(--primary-color)">{{ c.title }}</div>
              <div class="muted" style="margin-top: 6px; line-height: 1.8">{{ c.summary }}</div>
            </div>
            <span class="badge" :class="c.type === 'video' ? 'warning' : ''">{{ c.type === 'video' ? '视频' : '文章' }}</span>
          </div>

          <div style="margin-top: 10px">
            <span class="badge success">{{ c.tag }}</span>
          </div>

          <div v-if="c.type === 'video'" style="margin-top: 12px">
            <a class="btn" :href="c.url" target="_blank" rel="noreferrer" aria-label="打开视频（新窗口）">
              <i class="fas fa-play" />
              打开视频
            </a>
            <div class="muted" style="margin-top: 8px">视频链接需要网络访问。</div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="selectedArticle" class="card">
      <div class="muted" style="margin-bottom: 12px; font-size: 0.8rem">调试：selectedArticle = {{ JSON.stringify(selectedArticle) }}</div>
      <h2 class="card-title"><i class="fas fa-book-open" /> {{ selectedArticle.title }}</h2>
      <div class="muted" style="margin-bottom: 12px">
        <span class="badge">{{ selectedArticle.tag }}</span>
      </div>
      <div style="line-height: 1.9">{{ selectedArticle.summary }}</div>
      <button class="btn" type="button" style="margin-top: 16px" @click="backToList">
        <i class="fas fa-arrow-left" />
        返回列表
      </button>
    </section>

    <section class="card">
      <h2 class="card-title"><i class="fas fa-camera" /> 医院环境实拍图</h2>
      <div class="grid grid-3">
        <LazyImage :src="envLobby1Url" alt="医院大厅实拍图" class-name="scene-img" width="1200" height="700" />
        <LazyImage :src="envReceptionUrl" alt="医院接待/导诊台实拍图" class-name="scene-img" width="1200" height="700" />
        <LazyImage :src="envWaitingUrl" alt="医院候诊区实拍图" class-name="scene-img" width="1200" height="700" />
        <LazyImage :src="envCorridorUrl" alt="医院走廊实拍图" class-name="scene-img" width="1200" height="700" />
        <LazyImage :src="envEntranceUrl" alt="医院主入口实拍图" class-name="scene-img" width="1200" height="700" />
        <LazyImage :src="envEmergencyUrl" alt="医院急诊区域实拍图" class-name="scene-img" width="1200" height="700" />
      </div>
      <div class="muted" style="margin-top: 10px">以上为可商用授权来源的真实照片，已下载到本地，支持离线访问。</div>
    </section>
  </div>
</template>

<style scoped>
.scene-img {
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid var(--border);
}
</style>
