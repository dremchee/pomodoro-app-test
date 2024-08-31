import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
import { useTimerStore } from "@/components/work/useTimerStore";
import { SettingsPhase } from "@/components/settings/types";

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
  const lastActiveDate = ref<string>("");

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
    completedWorkSessions.value += session;
   }

   useStatsStore().addSessionData(date, completedWorkSessions.value, rounds);

  }

  if(!Array.isArray(sessionData.value)) {
    sessionData.value = [];
  }

  const checkDateChange = () => {
    const currentDate = new Date().toLocaleString("ru-RU").split(",")[0];
    if(lastActiveDate.value !== currentDate) {
      if(lastActiveDate.value) {
        addSessionData(lastActiveDate.value, completedWorkSessions.value, rounds.value);
      }

      completedWorkSessions.value = 0;
      lastActiveDate.value = currentDate;

      useTimerStore().resetTimer();
    }
  };

  onMounted(() => {
    checkDateChange();
  });

  const completeCurrentPhase = () => {
    checkDateChange();
    addSessionData(lastActiveDate.value, completedWorkSessions.value + 1, rounds.value);
  }
  const setRounds = (newRounds: number) => {
    rounds.value = newRounds;
  }
  const resetTimerPhase = () => {
    useTimerStore().resetTimer();
    useTimerStore().currentPhase = SettingsPhase.WORK;
  }

  return {
   workTime,
   shortBreakTime,
   longBreakTime,
   rounds,
   sessionData,
   completedWorkSessions,
   addSessionData,
   completeCurrentPhase,
   setRounds,
   lastActiveDate,
   checkDateChange,
   resetTimerPhase,
  }
 
}, {
  persist: [
    {
      paths: ['sessionData', 'completedWorkSessions', 'rounds', 'lastActiveDate'],
      storage: window.localStorage,
    }
  ]
});
