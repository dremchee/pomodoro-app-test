import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SettingsPhase } from '../settings/types';

export const useTimerStore = defineStore('timer', () => {
 const timeLeft = ref<number>(0);
 const isRunning = ref<boolean>(false);
 const idStopped = ref<boolean>(false);
 const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);
 const completedWorkSessions = ref<number>(0);

 return {
  timeLeft,
  isRunning,
  idStopped,
  currentPhase, 
  completedWorkSessions,
 };
});

