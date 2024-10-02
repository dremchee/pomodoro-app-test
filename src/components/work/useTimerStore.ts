import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { SettingsPhase } from '../settings/types';
import EndSound from '@/components/work/audio/budilnik1.mp3';
import { useSessionStore } from './useSessionStore';
import { useSettingsStore } from '@/components/settings/useSettingsStore';
import { checkDataNewDay } from '@/dataChecker';

export const useTimerStore = defineStore('timer', () => {
 const sessionStore = useSessionStore();
 const settingsStore = useSettingsStore();
 
 const timeLeft = ref(0);
 const intervalId = ref<number | null>(null);
 const isRunning = ref<boolean>(false);
 const isStopped = ref<boolean>(false);
 const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);

 const setTimeLeft = () => {
  switch(currentPhase.value) {
    case SettingsPhase.WORK:
     timeLeft.value = settingsStore.workTime;
     break;
    case SettingsPhase.SHORT_BREAK:
      timeLeft.value = settingsStore.shortBreakTime;
      break;
    case SettingsPhase.LONG_BREAK:
      timeLeft.value = settingsStore.longBreakTime;
      break;
    default:
      timeLeft.value = settingsStore.workTime;
  }
 };

 const startTimer = (duration: number) => {
  sessionStore.checkDateChange();
  // checkDataNewDay();

  if(sessionStore.completedWorkSessions >= sessionStore.rounds) {
    return;
  }

  if(intervalId.value !== null) {
    clearInterval(intervalId.value);
  }

  if(duration) {
   timeLeft.value = duration;
  } else {
    setTimeLeft();
  }
   
  isRunning.value = true;
  isStopped.value = false;

  intervalId.value = setInterval(() => {
   timeLeft.value--;
  
   if(timeLeft.value <= 0) {
    clearInterval(intervalId.value!);
    const audio = new Audio(EndSound);
    audio.play();
    isRunning.value = false;
    nextPhase();
   } 
  }, 1000) as unknown as number;
 };

 const stopTimer = () => {
  if(intervalId.value !== null) {
   clearInterval(intervalId.value);
   intervalId.value = null;
  }
  isRunning.value = false;
  isStopped.value = true;
 }

 const resetTimer = () => {
  stopTimer();
  setTimeLeft();
  isRunning.value = false;
  // timeLeft.value = 0;
  isStopped.value = true;
 }

 sessionStore.$subscribe((mutation, state) => {
  if(state.lastActiveDate !== new Date().toLocaleString("ru-RU").split(",")[0]) {
    resetTimer();
  }
 })

 const nextPhase = () => {
  if(currentPhase.value === SettingsPhase.WORK) {
    sessionStore.completeCurrentPhase();
  }

  if (currentPhase.value === SettingsPhase.WORK) {
   if (sessionStore.completedWorkSessions % 4 === 0) {
     currentPhase.value = SettingsPhase.LONG_BREAK;
   } else {
     currentPhase.value = SettingsPhase.SHORT_BREAK;
   }
 } else {
   currentPhase.value = SettingsPhase.WORK;
 }
 
 setTimeLeft();
 stopTimer();
}

const resetTimerPhase = () => {
  currentPhase.value = SettingsPhase.WORK;
  setTimeLeft();
  isRunning.value = false;
  isStopped.value = true;
}

watch(
  () => [
    settingsStore.workTime,
    settingsStore.shortBreakTime,
    settingsStore.longBreakTime,
  ],
  () => {
    if(!isRunning.value) {
      setTimeLeft();
    }
  }
  
 );

 return {
  timeLeft,
  isRunning,
  isStopped,
  currentPhase, 

  startTimer,
  stopTimer,
  resetTimer,
  nextPhase,
  resetTimerPhase,
 };
}, {
  persist: [
    {
      paths: ['isRunning', 'isStopped', 'timeLeft','currentPhase'],
      storage: window.sessionStorage,
    }
  ]
});

