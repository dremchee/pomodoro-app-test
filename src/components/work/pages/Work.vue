<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import RepeatButtonIcon from "../../../assets/img/repeat-button.svg"
import PlayButtonIcon from "../../../assets/img/play-button.svg"
import PouseButtonIcon from "../../../assets/img/pouse-button.svg"
import StopSessionButtonIcon from "../../../assets/img/stop-button.svg"
import EndSound from "../audio/budilnik1.mp3"

import TimeIndicator from "../components/TimeIndicator.vue"

import { workTime, shortBreakTime, longBreakTime, rounds } from '../../dataForExport/settingsData'
import { saveToLocalStorage, loadFromLocalStorage } from '../../dataForExport/localStorageHelper'

const timeLeft = ref(workTime.value);
const isRunning = ref(false); 
const isStopped = ref(false);
const intervalId = ref<number | null>(null);
const completedWorkSessions = ref(0);
const currentPhase = ref< 'work' | 'shortBreak' | 'longBreak'>('work');

const multiplierFactor = 360 / timeLeft.value;

function formatTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${sec}`;
}


const startTimer = () => {
  if(intervalId.value !== null) return;
  isRunning.value = true;
  isStopped.value = false;
  intervalId.value = setInterval(() => {
    timeLeft.value--;
    if(timeLeft.value <= 0) {
      stopTimer();
      const audio = new Audio(EndSound);
      audio.play();
      nextPhase();
    }
  }, 1000);
  saveState();
};

const stopTimer = () => {
  if(intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
    isRunning.value = false;
    isStopped.value = true;
    setInfoCircularProgressBar(timeLeft.value);
  }
  saveState();
};

const reset = () => {
  stopTimer();
  timeLeft.value = getCurrentTime();
  isStopped.value = false;
  setInfoCircularProgressBar(timeLeft.value);
  saveState();
}

function nextPhase() {
  if(currentPhase.value === 'work') {
    completedWorkSessions.value++;
    if(completedWorkSessions.value % 4 === 0) {
      currentPhase.value = 'longBreak';
      timeLeft.value = longBreakTime.value;
    } else {
      currentPhase.value = 'shortBreak';
      timeLeft.value = shortBreakTime.value;
    }
  } else {
    currentPhase.value = 'work';
    timeLeft.value = workTime.value;
  }
  reset();
}

function getCurrentTime() {
  switch(currentPhase.value) {
    case 'work':
      return workTime.value;
    case 'shortBreak':
      return shortBreakTime.value;
    case 'longBreak':
      return longBreakTime.value;
  }
}

watch([workTime, shortBreakTime, longBreakTime], () => {
  if(!isRunning.value) {
    timeLeft.value = getCurrentTime();
    setInfoCircularProgressBar(timeLeft.value);
  }
  saveState();
});


watch(timeLeft, (newTime) => {
  setInfoCircularProgressBar(newTime);
  saveState();
});
function setInfoCircularProgressBar(timeLeftValue: number) {
  const circularProgressBar = document.querySelector('.time-indicator') as HTMLElement | null;
  const circularDot = document.querySelector('.time-indicator__dot') as HTMLElement | null;
  if(circularProgressBar && circularDot) {
    const progressDegree = (getCurrentTime() - timeLeftValue) * multiplierFactor;
    const primaryColor = 'var(--color-primary)';
    const textColor = 'var(--color-text)';
    const lightColor = 'var(--color-light)';
    const backgroundColor = isStopped.value ? textColor : primaryColor;
    
    circularProgressBar.style.background = `conic-gradient(${backgroundColor} ${progressDegree}deg, ${lightColor} ${progressDegree}deg)`;

    const shadowColor = isStopped.value ? 'rgba(226, 220, 203, 0.4)' : 'rgba(255, 69, 69, 0.4)';
    circularDot.style.boxShadow = `0 0 10px 4px ${shadowColor}`;
  }
}

function saveState() {
  const state = {
    timeLeft: timeLeft.value,
    isRunning: isRunning.value,
    isStopped: isStopped.value,
    completedWorkSessions: completedWorkSessions.value,
    currentPhase: currentPhase.value,
    currentDate: new Date().toLocaleDateString(),
  };
  saveToLocalStorage('timerState', state);
}

function loadState() {
  const state = loadFromLocalStorage('timerState');
  if(state) {
    timeLeft.value = state.timeLeft;
    isStopped.value = state.isStopped;
    completedWorkSessions.value = state.completedWorkSessions;
    currentPhase.value = state.currentPhase;

    setInfoCircularProgressBar(timeLeft.value);
  }
}

onMounted(() => {
  loadState();
});
</script>

<template>
  <div class="container work">
    <div class="work-content">
      <div class="work-timer-container">
        <TimeIndicator :time="formatTime(timeLeft)" :is-running="isRunning" :is-stopped="isStopped"/>
      </div>
      <div class="work-report-container">
        <div class="work-report-circle-container"> 
          <div class="work-report-circle" v-for="(circle, index) in rounds" :key="index" :class="{'completed': index < completedWorkSessions}"></div>
        </div>
        <div class="work-report-text-info">{{ completedWorkSessions }} of {{ rounds }} sessions</div>
      </div>
    </div>
    <div class="work-action">
      <button class="work-action__button _repeat" @click="reset">
        <RepeatButtonIcon />
      </button>
      <button class="work-action__button _action" @click="isRunning ? null : startTimer()">
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
