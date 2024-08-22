<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onBeforeMount, watch } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useSessionStore } from "@/components/work/useSessionStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
import { useTimerStore } from "@/components/work/useTimerStore";

import RepeatButtonIcon from "../../../assets/img/repeat-button.svg";
import PlayButtonIcon from "../../../assets/img/play-button.svg";
import PouseButtonIcon from "../../../assets/img/pouse-button.svg";
import StopSessionButtonIcon from "../../../assets/img/stop-button.svg";

import TimeIndicator from "../components/TimeIndicator.vue";

const timeStore = useTimerStore();
const { timeLeft, isRunning, isStopped, currentPhase } = storeToRefs(timeStore);

const settingsStore = useSettingsStore();
const { rounds } = storeToRefs(useSessionStore());

const sessionStore = useSessionStore();
const { completedWorkSessions } = storeToRefs(sessionStore);


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
  }

  // completedWorkSessions.value++;

  sessionStore.saveSessionData();

  timeStore.nextPhase();
}

watch(() => completedWorkSessions.value, (newValue) => {
  console.log(`completedWorkSessions изменилось: ${newValue}`);
  sessionStore.saveSessionData();
});

watch(completedWorkSessions, (newValue) => {
  console.log(`Сохранение completedWorkSessions: ${newValue}`);
  sessionStore.saveSessionData();
});

watch(() => rounds.value, (newValue) => {
  console.log("Rounds updated in Work.vue:", newValue);
});


onBeforeMount(() => {
  console.log("Загрузка состояния перед монтированием компонента");
  // timeStore.loadState();
  sessionStore.loadSessionData();
});

onMounted(() => {
  console.log("Компонент смонтирован");
  console.log(`Восстановленные значения: isRunning=${isRunning.value}, timeLeft=${timeLeft.value}`);

  // sessionStore.loadSessionData();

  // timeStore.loadState();

  if (isRunning.value && timeLeft.value > 0) {
    console.log("Перезапуск таймера после восстановления состояния");

    timeStore.startTimer(timeLeft.value);
  } else if (timeLeft.value <= 0) {
    timeStore.resetTimer();
  }
});

onUnmounted(() => {
  console.log("Сохранение состояния перед размонтированием компонента");
  // timeStore.saveState();
  sessionStore.saveSessionData();
  // console.log("Состояние сохранено:", {
  //   completedWorkSessions: localStorage.getItem('completedWorkSessions'),
  //   rounds: localStorage.getItem
  // });

});

function resetDailySessions() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const currentDate = `${day}.${month}.${year}`;

  // sessionStore.addSessionData(currentDate, completedWorkSessions.value);

  // sessionStore.setCompletedWorkSessions(0);
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
      <button class="work-action__button _action" @click="startTimer()">
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
