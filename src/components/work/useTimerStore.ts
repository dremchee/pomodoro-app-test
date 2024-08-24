import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SettingsPhase } from '../settings/types';
import EndSound from '@/components/work/audio/budilnik1.mp3';
import { useSessionStore } from './useSessionStore';

export const useTimerStore = defineStore('timer', () => {
 const sessionStore = useSessionStore();
 
 const timeLeft = ref(0);
 const intervalId = ref<number | null>(null);
 const isRunning = ref<boolean>(false);
 const isStopped = ref<boolean>(false);
 const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);
 const lastSaveTimestamp = ref<number | null>(null);


 const startTimer = (duration: number) => {
  if(sessionStore.completedWorkSessions >= sessionStore.rounds) {
    return;
  }

  if(intervalId.value !== null) {
    clearInterval(intervalId.value);
  }

  if(duration) {
   timeLeft.value = duration;
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
  timeLeft.value = getCurrenPhaseTime();
 }

 const nextPhase = () => {
  if(currentPhase.value === SettingsPhase.WORK) {
    sessionStore.completeCurrentPhase();
  }

  if (currentPhase.value === SettingsPhase.WORK) {
   if (sessionStore.completedWorkSessions % 4 === 0) {
     currentPhase.value = SettingsPhase.LONG_BREAK;
     timeLeft.value = sessionStore.longBreakTime;
   } else {
     currentPhase.value = SettingsPhase.SHORT_BREAK;
     timeLeft.value = sessionStore.shortBreakTime;
   }
 } else {
   currentPhase.value = SettingsPhase.WORK;
   timeLeft.value = sessionStore.workTime;
 }
 
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

