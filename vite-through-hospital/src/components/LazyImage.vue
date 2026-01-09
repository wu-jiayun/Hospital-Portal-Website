<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
  className: { type: String, default: '' },
  rootMargin: { type: String, default: '200px' }
})

const el = ref(null)
const inView = ref(false)
let observer = null

const resolvedSrc = computed(() => (inView.value ? props.src : undefined))

onMounted(() => {
  if (!el.value) return

  if (!('IntersectionObserver' in window)) {
    inView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        inView.value = true
        if (observer) observer.disconnect()
        observer = null
      }
    },
    { root: null, rootMargin: props.rootMargin, threshold: 0.01 }
  )

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  observer = null
})
</script>

<template>
  <img
    ref="el"
    :src="resolvedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :class="className"
    loading="lazy"
    decoding="async"
  />
</template>
