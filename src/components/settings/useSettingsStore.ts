import { ref } from "vue";
import { defineStore } from "pinia";

const LIMITS = {
 workTime: {
  min: 60,
  max: 1500,
  step: 300,
 },
 shortBreakTime: {
  min: 60,
  max: 300,
  step: 300,
 },
 longBreakTime: {
  min: 60,
  max: 1200,
  step: 300,
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
   if (workTime.value < 1500) {
    workTime.value += 300;
   }
  }

  function decreaseWorkTime() {
   if (workTime.value >= 300) {
    workTime.value -= 300;
   } else {
    workTime.value = 0;
   }
  }

  function increaseShortBreakTime() {
   if (shortBreakTime.value < 300) {
    shortBreakTime.value += 300;
   }
  }

  function decreaseShortBreakTime() {
   if (shortBreakTime.value >= 300) {
    shortBreakTime.value -= 300;
   } else {
    shortBreakTime.value = 0;
   }
  }

  function increaseLongBreakTime() {
   if (longBreakTime.value < 1200) {
    longBreakTime.value += 300;
   }
  }

  function decreaseLongBreakTime() {
   if (longBreakTime.value >= 300) {
    longBreakTime.value -= 300;
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
