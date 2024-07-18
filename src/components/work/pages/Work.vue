<script setup lang="ts">
import { ref } from 'vue'

import RepeatButtonIcon from "../../../assets/img/repeat-button.svg"
import PlayButtonIcon from "../../../assets/img/play-button.svg"
import PouseButtonIcon from "../../../assets/img/pouse-button.svg"
import StopSessionButtonIcon from "../../../assets/img/stop-button.svg"

import TimeIndicator from "../components/TimeIndicator.vue"

const timerDuration = 1500;
const timeLeft = ref(timerDuration);
const isRunning = ref(false);
const intervalId = ref<number | null>(null);

function formatTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${sec}`;
}

function toggleTimer() {
  if(intervalId.value !== null) {
    return;
  }

  if(timeLeft.value === 0) {
    timeLeft.value = timerDuration;
  }
  intervalId.value = setInterval(() => {
    if(timeLeft.value > 0) {
      timeLeft.value--;
    } else {
        clearInterval(intervalId.value!);
        intervalId.value = null;
        isRunning.value = false;
    }
  }, 1000);
  isRunning.value = true;
  // if(isRunning.value) {
  //   clearInterval(intervalId.value!);
  //   intervalId.value = null;
  //   isRunning.value = false;
  // } else {
  //   if(timeLeft.value === 0) {
  //     timeLeft.value = timerDuration;
  //   }
  //   intervalId.value = setInterval(() => {
  //     if(timeLeft.value > 0) {
  //       timeLeft.value--;
  //     } else {
  //       clearInterval(intervalId.value!);
  //       intervalId.value = null;
  //       isRunning.value = false;
  //     }
  //   }, 1000);
  // }
  // isRunning.value = true;
}

function resetTimer() {
  clearInterval(intervalId.value!);
  intervalId.value = null;
  timeLeft.value = timerDuration;
  isRunning.value = false;
}

function stopTimer() {
  if(intervalId.value !== null) {
    clearInterval(intervalId.value!);
    intervalId.value = null;
    isRunning.value = false;
  }
}
</script>

<template>
  <div class="container work">
    <div class="work-content">
      <div class="work-timer-container">
        <TimeIndicator :time="formatTime(timeLeft)"/>
      </div>
      <div class="work-report-container">
        <div class="work-report-circle-container"> 
          <div class="work-report-circle" v-for="_ in 6"></div>
        </div>
        <div class="work-report-text-info">2 of 6 sessions</div>
      </div>
    </div>
    <div class="work-action">
      <button class="work-action__button _repeat" @click="resetTimer">
        <RepeatButtonIcon />
      </button>
      <button class="work-action__button _action" @click="toggleTimer">
        <component :is="isRunning ? PlayButtonIcon : PouseButtonIcon"></component>
      </button>
      <button class="work-action__button _stop" @click="stopTimer">
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
  height: 20%;
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
