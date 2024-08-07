import { ref } from "vue";
import { defineStore } from "pinia";
import { ListFormat } from "typescript";

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
  max: 10,
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

  // /**
  //  *
  //  * @param type
  //  * @param state If true - increase, if false - decrease
  //  */
  // function setValue(type: keyof typeof LIMITS, state: boolean) {

  // }

  function increaseWorkTime() {
   if (workTime.value < LIMITS.workTime.max) {
    workTime.value += LIMITS.workTime.step;
   }
  }

  function decreaseWorkTime() {
   if (workTime.value >= LIMITS.workTime.min) {
    workTime.value -= LIMITS.workTime.step;
   } else {
    workTime.value = 0;
   }
  }

  function increaseShortBreakTime() {
   if (shortBreakTime.value < LIMITS.shortBreakTime.max) {
    shortBreakTime.value += LIMITS.shortBreakTime.step;
   }
  }

  function decreaseShortBreakTime() {
   if (shortBreakTime.value >= LIMITS.shortBreakTime.min) {
    shortBreakTime.value -= LIMITS.shortBreakTime.step;
   } else {
    shortBreakTime.value = 0;
   }
  }

  function increaseLongBreakTime() {
   if (longBreakTime.value < LIMITS.longBreakTime.max) {
    longBreakTime.value += LIMITS.longBreakTime.step;
   }
  }

  function decreaseLongBreakTime() {
   if (longBreakTime.value >= LIMITS.longBreakTime.min) {
    longBreakTime.value -= LIMITS.longBreakTime.step;
   } else {
    longBreakTime.value = 0;
   }
  }

  function increaseRounds() {
   rounds.value += 1;
  }

  function decreaseRounds() {
   if (rounds.value > 1) {
    rounds.value -= 1;
   }
  }

  return {
   // State
   workTime,
   shortBreakTime,
   longBreakTime,
   rounds,
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
