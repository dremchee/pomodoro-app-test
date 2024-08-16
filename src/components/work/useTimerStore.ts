import { defineStore } from 'pinia';
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { SettingsPhase } from '../settings/types';
import { useSettingsStore } from '@/components/settings/useSettingsStore';
import EndSound from '@/components/work/audio/budilnik1.mp3';
import { JsxEmit } from 'typescript';
import { RefSymbol } from '@vue/reactivity';
import { useSessionStore } from './useSessionStore';
// import { JsxEmit } from 'typescript';

export const useTimerStore = defineStore('timer', () => {
 const sessionStore = useSessionStore();
 
 const timeLeft = ref(0);
 const intervalId = ref<number | null>(null);
 const isRunning = ref<boolean>(false);
 const isStopped = ref<boolean>(false);
 const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);
 // const completedWorkSessions = ref<number>(0);
 const lastSaveTimestamp = ref<number | null>(null);


 const startTimer = (duration: number) => {
  if(isRunning.value) return;

  if(duration) {
   timeLeft.value = duration;
  }

  // timeLeft.value = duration;
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

  // lastSaveTimestamp.value = Date.now();
  saveState();
 };

 const stopTimer = () => {
  if(intervalId.value !== null) {
   clearInterval(intervalId.value);
   intervalId.value = null;
  }
  isRunning.value = false;
  isStopped.value = true;

  lastSaveTimestamp.value = Date.now();
  saveState();
 }

 const resetTimer = () => {
  console.log("Restting timer");
  
  stopTimer();
  timeLeft.value = getCurrenPhaseTime();
  saveState();
 }

 const nextPhase = () => {
  // const sessionStore = useSessionStore();
  sessionStore.completeCurrentPhase();

  if (currentPhase.value === SettingsPhase.WORK) {
   // sessionStore.completeCurrentPhase();
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

 const saveState = () => {

  if(timeLeft.value <= 0) {
    console.log("Skipping saveState due to timeLeft being 0.");
    return;
  }
  console.log("Saving state:", {
   timeLeft: timeLeft.value,
   isRunning: isRunning.value,
   isStopped: isStopped.value,
   // completedWorkSessions: completedWorkSessions.value,
   currentPhase: currentPhase.value
  });
  
  sessionStorage.setItem('timeleft', timeLeft.value.toString())
  localStorage.setItem('timeLeft', timeLeft.value.toString());
  localStorage.setItem('isRunning', JSON.stringify(isRunning.value));
  localStorage.setItem('isStopped', JSON.stringify(isStopped.value));
  // localStorage.setItem('completedWorkSessions', completedWorkSessions.value.toString());
  localStorage.setItem('currentPhase', currentPhase.value.toString());
  localStorage.setItem('lastSaveTimestamp', Date.now().toString());
  console.log("Saved state:", {timeLeft: timeLeft.value, isRunning: isRunning.value, isStopped: isStopped.value, currentPhase: currentPhase.value});
  
 }; 

 const loadState = () => {
  const savedTimeLeft = localStorage.getItem('timeLeft');
  const savedIsRunning = localStorage.getItem('isRunning');
  const savedIsStopped = localStorage.getItem('isStopped');
  // const savedCompletedWorkSessions = localStorage.getItem('completedWorkSessions');
  const savedCurrentPhase = localStorage.getItem('currentPhase');
  const savedLastSaveTimestamp = localStorage.getItem('lastSaveTimestamp');


  console.log('Loading state from localStorage:', {
    savedTimeLeft,
    savedIsRunning,
    savedIsStopped,
    // savedCompletedWorkSessions,
    savedCurrentPhase,
    savedLastSaveTimestamp,
  });
  
  
  if(savedTimeLeft !== null && savedLastSaveTimestamp !== null ) {
   const currentTime = Date.now();
   const timeElapsed = Math.floor((currentTime - parseInt(savedLastSaveTimestamp, 10)) / 1000);

   // timeLeft.value = Math.max(parseInt(savedTimeLeft, 10) - timeElapsed, 0);
   if(savedIsRunning === 'true') {
    const newTimeLeft = Math.max(parseInt(savedTimeLeft, 10) - timeElapsed, 0 );
    timeLeft.value = newTimeLeft;

    if(newTimeLeft > 0) {
     startTimer(newTimeLeft);
    }
   } else {
    timeLeft.value = parseInt(savedTimeLeft, 10);
   }
  } else {
    timeLeft.value = getCurrenPhaseTime();
    console.log('Defaulting timeLeft to:', timeLeft.value);
  }

  if(savedIsRunning !== null) {
   isRunning.value = JSON.parse(savedIsRunning);
  }


  if(savedIsStopped !== null) {
   isStopped.value = JSON.parse(savedIsStopped);
   console.log('Loaded isStopped:', isStopped.value);
   
  }

  // if(savedCompletedWorkSessions !== null) {
  //  completedWorkSessions.value = parseInt(savedCompletedWorkSessions, 10);
  //  console.log('Loaded completedWorkSessions:', completedWorkSessions.value);
  // }

  if(savedCurrentPhase !== null) {
      currentPhase.value = savedCurrentPhase as SettingsPhase;
      console.log('Loaded currentPhase:', currentPhase.value);
  } 
  console.log('State after loading:', {
    timeLeft: timeLeft.value,
    isRunning: isRunning.value,
    isStopped: isStopped.value,
    // completedWorkSessions: completedWorkSessions.value,
    currentPhase: currentPhase.value,
  });
 };

 return {
  // workTime,
  // shortBreakTime,
  // longBreakTime,
  // rounds,
  timeLeft,
  isRunning,
  isStopped,
  currentPhase, 
  // completedWorkSessions,
  startTimer,
  stopTimer,
  resetTimer,
  nextPhase,
  saveState,
  loadState,
 };
});

