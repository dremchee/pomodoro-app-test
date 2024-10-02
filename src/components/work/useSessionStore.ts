import { defineStore, storeToRefs } from "pinia";
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
import { useTimerStore } from "@/components/work/useTimerStore";
import { SettingsPhase } from "@/components/settings/types";
import { checkDataNewDay } from "@/dataChecker";
import router from "@/router";

export const useSessionStore = defineStore(
 "session",
 () => {
  const { workTime, shortBreakTime, longBreakTime } = useSettingsStore();
  const { rounds } = storeToRefs(useSettingsStore());

  const sessionData = ref<Array<{date: string; sessions: number; rounds: number}>>([
    { date: "01.08.2024", sessions: 2, rounds: 7 },
    { date: "02.08.2024", sessions: 3, rounds: 10 },
  ]);
  let completedWorkSessions = ref(0);
  const lastActiveDate = ref<string>(new Date().toLocaleString("ru-RU").split(",")[0]);
  const currentDate = checkDataNewDay();
  const clickBatton = ref(false);

  // onMounted(() => {
  //   checkDataNewDay();
  // });

  const checkDateChange = () => {
    // const currentDate = new Date().toLocaleString("ru-RU").split(",")[0];
    if(lastActiveDate.value !== currentDate) {
      if(lastActiveDate.value) {
        addSessionData(lastActiveDate.value, completedWorkSessions.value, rounds.value);
      }

      completedWorkSessions.value = 0;
      lastActiveDate.value = currentDate;

      useTimerStore().resetTimer();
      useTimerStore().resetTimerPhase();

      router.push('/');
    }
  };

  const addSessionData = (date: string, session: number, rounds: number, incrementSessions: boolean = true) => {
   const existingSession = sessionData.value.find(session => session.date === date);

   if(existingSession) {
    if(incrementSessions) {
      completedWorkSessions.value += session - existingSession.sessions;
      existingSession.sessions = session;
    }
    existingSession.rounds = rounds;
   } else {
    sessionData.value.push({date, sessions: session, rounds});
    if(incrementSessions) {
      completedWorkSessions.value += session;
    }
   }

   useStatsStore().addSessionData(date, completedWorkSessions.value, rounds);

  }

  if(!Array.isArray(sessionData.value)) {
    sessionData.value = [];
  }

  

  // onMounted(() => {
  //   checkDataNewDay();
  //   checkDateChange();
  // });

  const completeCurrentPhase = () => {
    checkDataNewDay();
    addSessionData(lastActiveDate.value, completedWorkSessions.value + 1, rounds.value);
  }
  const setRounds = (newRounds: number) => {
    rounds.value = newRounds;
  }
  const resetTimerPhase = () => {
    useTimerStore().resetTimer();
    useTimerStore().currentPhase = SettingsPhase.WORK;
  }

  const setClickButton = (value: boolean) => {
    clickBatton.value = value;
  }

  return {
   workTime,
   shortBreakTime,
   longBreakTime,
   rounds,
   sessionData,
   completedWorkSessions,
   lastActiveDate,
   clickBatton,
   setClickButton,
   addSessionData,
   completeCurrentPhase,
   setRounds,
   checkDateChange,
   resetTimerPhase,
  }
 
}, {
  persist: [
    {
      paths: ['sessionData', 'rounds', 'lastActiveDate', 'completedWorkSessions'],
      storage: window.localStorage,
    },
  ]
});
