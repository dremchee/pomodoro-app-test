<script setup lang="ts">
import { ref, onMounted, defineProps, watch, computed } from 'vue';
import { useSettingsStore } from '@/components/settings/useSettingsStore';
import { useSessionStore } from '@/components/work/useSessionStore';

const { workTime, shortBreakTime, longBreakTime } = storeToRefs(useSettingsStore())
const { currentDate } = storeToRefs(useSessionStore())
import { storeToRefs } from 'pinia';

const props = defineProps<{
  time: string;
  isRunning: boolean;
  isStopped: boolean;
}>();

function updateCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  currentDate.value = `${day}.${month}.${year}`;
}

onMounted(() => {
  updateCurrentDate();

  currentDate.value = new Date().toLocaleDateString();
  updateProgressBar(props.time);
});

watch(() => props.time, (newTime) => {
  updateProgressBar(newTime);
});

function getTotalTime(): number {
  const currentPhase = document.querySelector('.time-indicator__status')?.textContent?.toLowerCase();
  switch (currentPhase) {
    case 'work':
      return workTime.value;
    case 'short break':
      return shortBreakTime.value;
    case 'long break':
      return longBreakTime.value;
    default:
      return workTime.value;
  }
}

function updateProgressBar(newTime: string) {
  const circularProgressBar = document.querySelector('.time-indicator') as HTMLElement | null;
  const shadowElement = document.querySelector('.time-indicator__shadow') as HTMLElement | null;
  const dotElement = document.querySelector('.time-indicator__dot') as HTMLElement | null;

  if (circularProgressBar && shadowElement && dotElement) {
    const timeLeftValue = parseInt(newTime.split(':')[0]) * 60 + parseInt(newTime.split(':')[1]);
    const totalTime = getTotalTime();
    const multiplierFactor = 360 / totalTime;
    const progressDegree = (totalTime - timeLeftValue) * multiplierFactor;

    const primaryColor = 'var(--color-primary)';
    const textColor = 'var(--color-text)';
    const lightColor = 'var(--color-light)';
    const baseColor = props.isStopped ? textColor : primaryColor;

    const color = props.isRunning ? `conic-gradient(${baseColor} ${progressDegree}deg, ${lightColor} ${progressDegree}deg)` : `conic-gradient(${lightColor} 360deg, ${textColor} 0deg)`;
    const shadowColor = props.isStopped ? 'rgba(226, 220, 203, 0.4)' : 'rgba(255, 69, 69, 0.4)';

    circularProgressBar.style.background = color;
    // circularProgressBar.style.boxShadow = ` 0 -10px 4px ${shadowColor}`;
    shadowElement.style.boxShadow = `0 0 10px 4px ${shadowColor}`;
    dotElement.style.boxShadow = `0 0 10px 4px ${shadowColor}`;

    const radius = 9.5;
    const angleInRadians = (progressDegree - 90) * (Math.PI / 180);
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);

    shadowElement.style.transform = `translate(${x}rem, ${y}rem)`;
  }
}
</script>

<template>
  <div :class="['time-indicator', { 'running': props.isRunning, 'stopped': props.isStopped }]">
    <div :class="['time-indicator__shadow', { 'running': props.isRunning, 'stopped': props.isStopped }]"></div>
    <div class="time-indicator-progress-bar">
      <div class="time-indicator__date">{{ currentDate }}</div>
      <div :class="['time-indicator__time', { 'running': props.isRunning, 'stopped': props.isStopped }]">{{ props.time
        }}
      </div>
      <div class="time-indicator__status">Work</div>
    </div>
  </div>
</template>

<style scoped>
.time-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 50%;
  width: 19rem;
  height: 19rem;
  background: var(--color-light);
  position: relative;
  transition: box-shadow 0.3s ease-in-out;
  /* box-shadow: var(--box-shadow); */
}

/* .time-indicator.time-indicator.stopped {
  box-shadow: 0 0 10px 4px rgba(226, 220, 203, 0.4);
} */

.time-indicator__shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: -1;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.time-indicator__shadow.running {
  filter: drop-shadow(0 -10px 10px rgba(255, 69, 69, 0.4));
}

.time-indicator__shadow.stopped {
  filter: drop-shadow(0 -10px 10px rgba(226, 220, 203, 0.4));
}

/* .time-indicator.running {
  box-shadow: 0 0 10px 4px var(--color-primary);
  background: var(--color-light);
  box-shadow: 0 0 10px 4px rgba(255, 69, 69, 0.4);
} */

/* .time-indicator.stopped {
  background-color: var(--color-light);
  box-shadow: 0 0 10px 4px rgba(226, 220, 203, 0.4);
} */
.time-indicator-progress-bar {
  width: 94%;
  height: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  border-radius: 50%;
  /* box-shadow: 0px 0px 2px rgba(255, 69, 69, 0.4), 0px 4px -1px rgba(255, 69, 69, 0.65), 0px 1px inset rgba(255, 69, 69, 0.08); */
  position: relative;
}

.time-indicator__date {
  font-weight: 300;
  font-size: 1rem;
}

.time-indicator__time {
  font-size: 5.25rem;
  font-weight: 500;
}

.time-indicator__timer.running {
  color: var(--color-text);
}

.time-indicator__time.stopped {
  color: var(--color-light);
}

.time-indicator__status {
  font-size: 1.5rem;
  font-weight: 500;
}

.time-indicator__dot {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  /* box-shadow: 0 0 10px 4px rgba(255, 69, 69, 0.4); */
  filter: drop-shadow(0 10px 10px rgba(255, 69, 69, 0.4));
}

.time-indicator.stopped .time-indicator__dot {
  background-color: var(--color-text);
  /* box-shadow: 0 0 10px 4px rgba(226, 220, 203, 0.4); */
  filter: drop-shadow(0 10px 10px rgba(226, 220, 203, 0.4));
}
</style>