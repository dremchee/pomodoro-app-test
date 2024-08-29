import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { SettingsPhase } from '../settings/types';
import EndSound from '@/components/work/audio/budilnik1.mp3';
import { useSessionStore } from './useSessionStore';
import { useSettingsStore } from '@/components/settings/useSettingsStore';
import Settings from '../settings/pages/Settings.vue';

export const useTimerStore = defineStore('timer', () => {
 const sessionStore = useSessionStore();
 const settingsStore = useSettingsStore();
 
 const timeLeft = ref(0);
 const intervalId = ref<number | null>(null);
 const isRunning = ref<boolean>(false);
 const isStopped = ref<boolean>(false);
 const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);
 const lastSaveTimestamp = ref<number | null>(null);

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
  }
 };

 const startTimer = (duration: number) => {
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

  lastSaveTimestamp.value = Date.now();
 };

 const stopTimer = () => {
  if(intervalId.value !== null) {
   clearInterval(intervalId.value);
   intervalId.value = null;
  }
  isRunning.value = false;
  isStopped.value = true;

  lastSaveTimestamp.value = Date.now();
 }

 const resetTimer = () => {
  stopTimer();
  setTimeLeft();
  // timeLeft.value = getCurrenPhaseTime();
 }

 const nextPhase = () => {
  if(currentPhase.value === SettingsPhase.WORK) {
    sessionStore.completeCurrentPhase();
  }

  if (currentPhase.value === SettingsPhase.WORK) {
   if (sessionStore.completedWorkSessions % 4 === 0) {
     currentPhase.value = SettingsPhase.LONG_BREAK;
    //  timeLeft.value = sessionStore.longBreakTime;
   } else {
     currentPhase.value = SettingsPhase.SHORT_BREAK;
    //  timeLeft.value = sessionStore.shortBreakTime;
   }
 } else {
   currentPhase.value = SettingsPhase.WORK;
  //  timeLeft.value = sessionStore.workTime;
 }
 
 setTimeLeft();
 stopTimer();
}

 const getCurrenPhaseTime = () => {
  switch (currentPhase.value) {
   case SettingsPhase.WORK:
    return sessionStore.workTime;
   case SettingsPhase.SHORT_BREAK:
    return sessionStore.shortBreakTime;
   case SettingsPhase.LONG_BREAK:
    return sessionStore.longBreakTime;
   default:
    return sessionStore.workTime;
  }
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
 };
}, {
  persist: true,
});

