<script setup>
import { computed, ref } from 'vue'

const selectedCategory = ref('all')
const selectedArticle = ref(null)

const categories = [
  { id: 'all', name: '全部', icon: 'fas fa-th' },
  { id: 'disease', name: '疾病防治', icon: 'fas fa-virus' },
  { id: 'nutrition', name: '营养健康', icon: 'fas fa-apple-alt' },
  { id: 'exercise', name: '运动健身', icon: 'fas fa-running' },
  { id: 'mental', name: '心理健康', icon: 'fas fa-brain' }
]

const articles = [
  {
    id: 1,
    title: '高血压管理：家庭血压监测怎么做更准确？',
    summary: '袖带选择、测量姿势、测量频率与记录方式，帮你把血压数据测准、测全。',
    category: '疾病防治',
    date: '2026-01-05',
    views: 3680,
    content:
      '建议使用上臂式电子血压计，测量前静坐5分钟；袖带绑在上臂与心脏同高；每次测2-3遍取平均值。可选择早晚固定时段测量，并记录日期、时间、收缩压/舒张压、心率及服药情况。若连续多日明显偏高或伴有头痛胸闷等不适，请及时就医。'
  },
  {
    id: 2,
    title: '健康饮食：学会看营养成分表（钠、糖、脂肪）',
    summary: '选零食、饮料、即食食品时，如何用“每100克/每份”快速比较更健康？',
    category: '营养健康',
    date: '2026-01-03',
    views: 2950,
    content:
      '优先看“钠含量”和“添加糖”。高盐食品会增加高血压风险，高糖饮料会增加肥胖和龋齿风险。对比时注意单位：每100g vs 每份。建议选择低钠（越低越好）、低糖、反式脂肪为0的产品，日常饮食坚持多样化：谷薯类、蔬果、奶类、豆类、适量优质蛋白。'
  },
  {
    id: 3,
    title: '科学运动：普通人怎么做到每周150分钟？',
    summary: '快走、骑行、游泳都算，强度如何判断？如何从0开始循序渐进？',
    category: '运动健身',
    date: '2026-01-02',
    views: 3120,
    content:
      '中等强度的简单判断：运动时能说话但不能唱歌。可以拆分为每天20-30分钟快走/骑行；每周至少2天加入力量训练（深蹲、俯卧撑、弹力带）。久坐人群从每天10分钟开始，逐步加到30分钟。运动出现胸痛、明显气促或头晕应立即停止并就医。'
  },
  {
    id: 4,
    title: '流感与新冠：冬春季呼吸道感染如何预防？',
    summary: '接种疫苗、科学佩戴口罩、通风与手卫生，发热咳嗽何时需要就医。',
    category: '疾病防治',
    date: '2026-01-01',
    views: 5400,
    content:
      '建议在流感季前完成流感疫苗接种；在人员密集场所可佩戴口罩；居家勤通风、勤洗手；出现高热不退、呼吸困难、胸痛、意识改变或基础病加重等情况应尽快就医。儿童、孕产妇、老年人及慢病患者是重点防护人群。'
  },
  {
    id: 5,
    title: '儿童用药注意：退烧药怎么选、怎么用？',
    summary: '对乙酰氨基酚/布洛芬的适用年龄与剂量原则，避免重复用药。',
    category: '疾病防治',
    date: '2025-12-28',
    views: 4280,
    content:
      '退烧药主要用于孩子明显不适时（精神差、疼痛、影响睡眠等）。常见成分为对乙酰氨基酚或布洛芬，按体重计算剂量并遵医嘱/说明书，不要同时服用多个含同成分的复方感冒药以免超量。持续高热、抽搐、脱水或呼吸困难应及时就医。'
  },
  {
    id: 6,
    title: '心理健康：如何识别与应对长期焦虑和失眠？',
    summary: '睡眠卫生、放松训练与寻求专业帮助的建议，别硬扛。',
    category: '心理健康',
    date: '2025-12-20',
    views: 2600,
    content:
      '建议固定作息、减少睡前刷手机、下午后避免大量咖啡因；可尝试腹式呼吸、渐进性肌肉放松。若焦虑/失眠持续超过2-4周并明显影响学习工作生活，建议到心理门诊或睡眠门诊寻求专业评估与帮助。'
  }
]

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'all') return articles
  const name = categories.find((c) => c.id === selectedCategory.value)?.name
  return articles.filter((a) => a.category === name)
})

function selectCategory(id) {
  selectedCategory.value = id
}

function openArticle(article) {
  console.log('openArticle called with:', article)
  selectedArticle.value = article
}

function backToList() {
  console.log('backToList called')
  selectedArticle.value = null
}
</script>

<template>
  <div class="grid" style="gap: 18px">
    <section class="card">
      <h2 class="card-title"><i class="fas fa-heartbeat" /> 健康科普</h2>

      <div style="margin-bottom: 14px">
        <button
          v-for="c in categories"
          :key="c.id"
          type="button"
          class="btn"
          :class="{ 'btn-success': selectedCategory === c.id }"
          style="margin-right: 8px; margin-bottom: 8px"
          @click="selectCategory(c.id)"
        >
          <i :class="c.icon" />
          {{ c.name }}
        </button>
      </div>

      <div v-if="!selectedArticle" class="grid grid-2">
        <div v-for="a in filteredArticles" :key="a.id" class="card" style="cursor: pointer" @click="openArticle(a)">
          <h3 style="margin: 0; color: var(--primary-color)">{{ a.title }}</h3>
          <div class="muted" style="margin: 6px 0 12px">{{ a.summary }}</div>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="badge">{{ a.category }}</span>
            <span class="muted" style="font-size: 0.9rem">{{ a.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="selectedArticle" class="card">
      <div class="muted" style="margin-bottom: 12px; font-size: 0.8rem">调试：selectedArticle = {{ JSON.stringify(selectedArticle) }}</div>
      <h2 class="card-title"><i class="fas fa-book-open" /> {{ selectedArticle.title }}</h2>
      <div class="muted" style="margin-bottom: 12px">
        <span class="badge">{{ selectedArticle.category }}</span>
        <span style="margin-left: 10px">发布时间：{{ selectedArticle.date }}</span>
        <span style="margin-left: 10px">阅读量：{{ selectedArticle.views }}</span>
      </div>
      <div style="line-height: 1.9">{{ selectedArticle.content }}</div>
      <button class="btn" type="button" style="margin-top: 16px" @click="backToList">
        <i class="fas fa-arrow-left" />
        返回列表
      </button>
    </section>
  </div>
</template>
