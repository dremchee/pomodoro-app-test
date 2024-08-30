import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useSessionStore } from "../work/useSessionStore";
import { useTimerStore } from '@/components/work/useTimerStore';

const LIMITS = {
 workTime: {
  min: 60,
  max: 1500,
  step: 60,
 },
 shortBreakTime: {
  min: 60,
  max: 300,
  step: 60,
 },
 longBreakTime: {
  min: 60,
  max: 1200,
  step: 60,
 },
 rounds: {
  min: 1,
  max: 15,
  step: 1,
 },
};

export const useSettingsStore = defineStore(
 "settings",
 () => {
  const workTime = ref<number>(1500);
  const shortBreakTime = ref<number>(300);
  const longBreakTime = ref<number>(1200);
  const rounds = ref<number>(6);

  const sessionStore = useSessionStore();

  const canChangeSettings = computed(() => {
   return !useTimerStore().isRunning;
  });


  // /**
  //  *
  //  * @param type
  //  * @param state If true - increase, if false - decrease
  //  */
  // function setValue(type: keyof typeof LIMITS, state: boolean) {

  // }

  function increaseWorkTime() {
   if (canChangeSettings && workTime.value < LIMITS.workTime.max) {
    workTime.value += LIMITS.workTime.step;
   }
  }

  function decreaseWorkTime() {
   if (canChangeSettings && workTime.value >= LIMITS.workTime.min) {
    workTime.value -= LIMITS.workTime.step;
   } else {
    workTime.value = 0;
   }
  }

  function increaseShortBreakTime() {
   if (canChangeSettings && shortBreakTime.value < LIMITS.shortBreakTime.max) {
    shortBreakTime.value += LIMITS.shortBreakTime.step;
   }
  }

  function decreaseShortBreakTime() {
   if (canChangeSettings && shortBreakTime.value >= LIMITS.shortBreakTime.min) {
    shortBreakTime.value -= LIMITS.shortBreakTime.step;
   } else {
    shortBreakTime.value = 0;
   }
  }

  function increaseLongBreakTime() {
   if (canChangeSettings && longBreakTime.value < LIMITS.longBreakTime.max) {
    longBreakTime.value += LIMITS.longBreakTime.step;
   }
  }

  function decreaseLongBreakTime() {
   if (canChangeSettings && longBreakTime.value >= LIMITS.longBreakTime.min) {
    longBreakTime.value -= LIMITS.longBreakTime.step;
   } else {
    longBreakTime.value = 0;
   }
  }

  function increaseRounds() {
   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleString('ru-RU').split(',')[0];
   if(rounds.value < LIMITS.rounds.max) {
    rounds.value += 1;
    sessionStore.addSessionData(formattedDate, sessionStore.completedWorkSessions, rounds.value, false);
   }
  }

  function decreaseRounds() {
   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleString('ru-RU').split(',')[0];
   if (rounds.value > sessionStore.completedWorkSessions) {
    rounds.value -= 1;
    sessionStore.addSessionData(formattedDate, sessionStore.completedWorkSessions, rounds.value, false);
   }
  }

  watch(rounds, (newRounds) => {
   console.log('New rounds value in useSettingsStore:', newRounds);
   
   sessionStore.setRounds(newRounds);
  }), {deep: true};

  return {
   // State
   workTime,
   shortBreakTime,
   longBreakTime,
   rounds,
   canChangeSettings,
   // Metods
   increaseWorkTime,
   decreaseWorkTime,
   increaseShortBreakTime,
   decreaseShortBreakTime,
   increaseLongBreakTime,
   decreaseLongBreakTime,
   increaseRounds,
   decreaseRounds,
  };
 },
 {
  persist: true,
 }
);
