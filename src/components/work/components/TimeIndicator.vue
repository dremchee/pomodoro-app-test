<script setup lang="ts">
import { ref, onMounted, defineProps, watch, nextTick } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useTimerStore } from "@/components/work/useTimerStore";
import { storeToRefs } from "pinia";
import { checkDataNewDay } from "@/dataChecker";

const { workTime, shortBreakTime, longBreakTime } = storeToRefs(
  useSettingsStore()
);
const { currentPhase } = storeToRefs(useTimerStore());

const props = defineProps<{
  time: string;
  isRunning: boolean;
  isStopped: boolean;
  currentPhase: string;
}>();

const circleLength = 1008.45039;

const circleStyle = ref({
  strokeDasharray: `${circleLength}`,
  strokeDashoffset: `${circleLength}`,
  stroke: "var(--color-primary)",
  transition: "none",
});

const hasWorkedToday = ref(false);

function updateCurrentDate() {
  return checkDataNewDay();
  // const now = new Date();
  // const day = String(now.getDate()).padStart(2, "0");
  // const month = String(now.getMonth() + 1).padStart(2, "0");
  // const year = now.getFullYear();
  // return `${day}.${month}.${year}`;
}

function getTotalTime(): number {
  switch (currentPhase.value) {
    case "work":
      return workTime.value;
    case "shortBreak":
      return shortBreakTime.value;
    case "longBreak":
      return longBreakTime.value;
    default:
      return workTime.value;
  }
}

function updateProgressBar(newTime: string) {
  const totalTime = getTotalTime();
  const [minutes, seconds] = newTime.split(":").map(Number);
  const timeLeftValue = minutes * 60 + seconds;
  const progress = timeLeftValue / totalTime;
  const dashOffset = circleLength * progress;

  if (progress < 1) {
    hasWorkedToday.value = true;
  }

  circleStyle.value = {
    strokeDasharray: `${circleLength}`,
    strokeDashoffset: dashOffset.toString(),
    stroke: props.isStopped
      ? "var(--color-text)"
      : "var(--color-primary)",
    transition: props.isRunning ? `stroke-dashoffset 1s linear` : "none",
  };
}

onMounted(() => {
  updateCurrentDate();
  updateProgressBar(props.time);
});

watch(
  () => props.time,
  (newTime) => {
    nextTick(() => {
      updateProgressBar(newTime);
    });
  },
  { immediate: true }
);

watch(
  () => props.isRunning,
  () => {
    nextTick(() => {
      updateProgressBar(props.time)
    });
  }
);

watch(
  currentPhase,
  () => {
    circleStyle.value = {
      strokeDasharray: `${circleLength}`,
      strokeDashoffset: `${circleLength}`,
      stroke: "var(--color-primary)",
      transition: "none",
    };
    nextTick(() => {
      updateProgressBar(props.time);
    });
  }
);
</script>

<template>
  <div class="flex-wrapper">
    <div class="single-chart">
      <svg view-box="0 0 330 330" class="circular-chart">
        <path class="circle-bg" d="M165 4.5 
          a 160.5 160.5 0 0 1 0 321 
          a 160.5 160.5 0 0 1 0 -321" />
        <path v-if="hasWorkedToday" :style="circleStyle" class="circle" d="M165 4.5 
          a 160.5 160.5 0 0 1 0 321 
          a 160.5 160.5 0 0 1 0 -321" />
      </svg>
      <div class="text-container">
        <div class="time-indicator__date">{{ updateCurrentDate() }}</div>
        <div :class="['time-indicator__time', { running: props.isRunning, stopped: props.isStopped }]"
          :style="{ color: props.isStopped ? 'var(--color-light)' : 'var(--color-text)' }">
          {{ props.time }}
        </div>
        <div class="time-indicator__status">Work</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-chart {
  position: relative;
  width: 330px;
  height: 330px;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: var(--color-light);
  stroke-width: 8;
}

.circle {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  stroke: var(--color-primary);
  stroke-dasharray: 1008.45039;
  stroke-dashoffset: 1008.45039;
  transition: stroke-dashoffsest 1s linear, stroke 0.3s ease, filter 0.3s ease;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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

@keyframes progress {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 1008.45039;
  }
}
</style>
