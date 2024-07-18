<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'  

const props = defineProps<{
  time: string
}>();

const currentDate = ref('');

function updateCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  currentDate.value = `${day}.${month}.${year}`;
}

onMounted(() => {
  updateCurrentDate();
});
</script>

<template>
  <div class="time-indicator">
    <div class="time-indicator__date">{{ currentDate }}</div>
    <div class="time-indicator__time">{{  props.time }}</div>
    <div class="time-indicator__status">Work</div>
  </div>
</template>

<style scoped>
.time-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 8px solid var(--color-light);
  border-radius: 50%;
  width: 19rem;
  height: 19rem;
}

.time-indicator__date {
  font-weight: 300;
  font-size: 1rem;
}

.time-indicator__time {
  font-size: 5.25rem;
  font-weight: 500;
}

.time-indicator__status {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>