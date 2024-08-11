<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, computed, onUnmounted, onBeforeUnmount } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useSessionStore } from "@/components/work/useSessionStore";
import { useStatsStore } from "@/components/stats/useStatsStore";

import RepeatButtonIcon from "../../../assets/img/repeat-button.svg";
import PlayButtonIcon from "../../../assets/img/play-button.svg";
import PouseButtonIcon from "../../../assets/img/pouse-button.svg";
import StopSessionButtonIcon from "../../../assets/img/stop-button.svg";
import EndSound from "../audio/budilnik1.mp3";

import TimeIndicator from "../components/TimeIndicator.vue";


const { timeLeft, isRunning, isStopped, completedWorkSessions, currentPhase, } =
  storeToRefs(useSessionStore());

const intervalId = ref<number | null>(null);
import { SettingsPhase } from "@/components/settings/types";

const { workTime, shortBreakTime, longBreakTime, rounds } = storeToRefs(
  useSettingsStore()
);

const statsStore = useStatsStore();

function formatTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${sec}`;
}

const startTimer = () => {
  if (completedWorkSessions.value >= rounds.value) {
    alert("Все раунды завершены. Если хотите продолжить дальше работать, увеличте количество раундов в настройках");
    return;
  }

  if (intervalId.value !== null) return;

  isRunning.value = true;
  isStopped.value = false;


  intervalId.value = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      stopTimer();
      const audio = new Audio(EndSound);
      audio.play();
      nextPhase();
    }
  }, 1000) as unknown as number;
};

const stopTimer = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
    isRunning.value = false;
    isStopped.value = true;
  }
};

const reset = () => {
  stopTimer();
  timeLeft.value = currentTime.value;
  isStopped.value = false;
}

function nextPhase() {
  if (currentPhase.value === "work") {
    completedWorkSessions.value++;
    if (completedWorkSessions.value % 4 === 0) {
      currentPhase.value = SettingsPhase.LONG_BREAK;
      timeLeft.value = longBreakTime.value;
    } else {
      currentPhase.value = SettingsPhase.SHORT_BREAK;
      timeLeft.value = shortBreakTime.value;
    }
  } else {
    currentPhase.value = SettingsPhase.WORK;
    timeLeft.value = workTime.value;
  }
  reset();
}

const currentTime = computed(() => {
  switch (currentPhase.value) {
    case SettingsPhase.WORK:
      return workTime.value;
    case SettingsPhase.SHORT_BREAK:
      return shortBreakTime.value;
    case SettingsPhase.LONG_BREAK:
      return longBreakTime.value;
    default:
      return workTime.value;
  }
});

function resetDailySessions() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const currentDate = `${day}.${month}.${year}`;

  statsStore.addSessionData(currentDate, completedWorkSessions.value);

  completedWorkSessions.value = 0;
  reset();
}

watch([workTime, shortBreakTime, longBreakTime], () => {
  if (!isRunning.value) {
    timeLeft.value = currentTime.value;
  }
});

watch(
  timeLeft,
  (newTime) => {
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  if (isRunning.value && intervalId.value === null) {
    startTimer();
  }
});

onBeforeUnmount(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
});

onUnmounted(() => {
  resetDailySessions();
});

const completeCurrentPhase = () => {
  if (completedWorkSessions.value >= rounds.value) {
    alert("Все раунды завершины. Нвозможно завершить текущую фазу");
    return;
  }

  if (currentPhase.value === "work") {
    completedWorkSessions.value++;
    if (completedWorkSessions.value % 4 === 0) {
      currentPhase.value = SettingsPhase.LONG_BREAK;
      timeLeft.value = longBreakTime.value;
    } else {
      currentPhase.value = SettingsPhase.SHORT_BREAK;
      timeLeft.value = shortBreakTime.value
    }
  } else {
    currentPhase.value = SettingsPhase.WORK;
    timeLeft.value = workTime.value;
  }
  reset();
}
</script>

<template>
  <div class="container work">
    <div class="work-content">
      <div class="work-timer-container">
        <TimeIndicator :time="formatTime(timeLeft)" :is-running="isRunning" :is-stopped="isStopped" />
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
      <button class="work-action__button _action" @click="isRunning ? stopTimer() : startTimer()">
        <Component :is="isRunning ? PlayButtonIcon : PouseButtonIcon"></Component>
      </button>
      <button class="work-action__button _phase-completion" @click="completeCurrentPhase()">
        <StopSessionButtonIcon />
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
  justify-content: center;
  gap: 1.5rem;
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
