<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useSessionStore } from "@/components/work/useSessionStore";
import { useTimerStore } from "@/components/work/useTimerStore";

import RepeatButtonIcon from "../../../assets/img/repeat-button.svg";
import PlayButtonIcon from "../../../assets/img/play-button.svg";
import PouseButtonIcon from "../../../assets/img/pouse-button.svg";
import ResetSessionButtonIcon from "../../../assets/img/reset-button.svg";

import TimeIndicator from "../components/TimeIndicator.vue";

const timeStore = useTimerStore();


const { timeLeft, isRunning, isStopped, currentPhase } = storeToRefs(timeStore);
const { rounds, completedWorkSessions } = storeToRefs(useSessionStore());


function formatTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${sec}`;
}

const startTimer = () => {
  if (timeStore.isRunning) {
    timeStore.stopTimer();
  } else {
    timeStore.startTimer(timeLeft.value);
  }
}

const reset = () => {
  timeStore.resetTimer();
}

const completeCurrentPhase = () => {
  if (completedWorkSessions.value >= rounds.value) {
    resetDailySessions();
    return;
  } else {
    timeStore.nextPhase();
  }
}

function resetDailySessions() {
  reset();
}

onMounted(() => {
  useSessionStore().checkDateChange();
  console.log('Phase reset to WORK with time set to:', timeLeft.value);

  if (useSessionStore().lastActiveDate !== new Date().toLocaleString("ru-RU").split(",")[0]) {
    timeStore.resetTimer();
  } else if (isRunning.value && timeLeft.value > 0) {
    timeStore.startTimer(timeLeft.value);
  } else if (timeLeft.value <= 0) {
    timeStore.resetTimer();
  }
});
</script>

<template>
  <div class="container work">
    <div class="work-content">
      <div class="work-timer-container">
        <TimeIndicator :time="formatTime(timeLeft)" :is-running="isRunning" :is-stopped="isStopped"
          :current-phase="currentPhase" />
      </div>
      <div class="work-report-container">
        <div class="work-report-circle-container">
          <div class="work-report-circle" v-for="(_, index) in rounds" :key="index"
            :class="{ completed: index < completedWorkSessions }"></div>
        </div>
        <div class="work-report-text-info">
          {{ completedWorkSessions }} of {{ rounds }} sessions
        </div>
      </div>
    </div>
    <div class="work-action">
      <button class="work-action__button _repeat" @click="reset">
        <RepeatButtonIcon />
      </button>
      <button class="work-action__button _action" @click="startTimer()">
        <Component :is="isRunning ? PlayButtonIcon : PouseButtonIcon"></Component>
      </button>
      <button class="work-action__button _phase-completion" @click="completeCurrentPhase()">
        <ResetSessionButtonIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.work {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

.work-content {
  flex-grow: 1;
}

.work-timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.work-report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 27%;
}

.work-report-circle-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.5rem;
}

.work-report-circle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--color-light);
  border-radius: 50%;
}

.work-report-circle.completed {
  background-color: var(--color-primary);
}

.work-report-text-info {
  font-size: 16px;
  color: var(--color-light);
}

.work-action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.work-action__button {
  border: none;
  cursor: pointer;
  background-color: #3e3d3a;
  color: var(--color-text);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  &._action {
    background-color: transparent;
    border: 0.1875rem solid var(--color-text);
    width: 8rem;
    height: 8rem;
  }
}
</style>
