import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";

export const useSessionStore = defineStore(
 "session",
 () => {
  const { workTime, shortBreakTime, longBreakTime } = useSettingsStore();
  const { rounds } = storeToRefs(useSettingsStore());

  const sessionData = ref<Array<{date: string; sessions: number; rounds: number}>>([
    { date: "2024-08-01", sessions: 2, rounds: 7 },
    { date: "2024-08-02", sessions: 3, rounds: 10 },
  ]);
  let completedWorkSessions = ref(0);

  if(!Array.isArray(sessionData.value)) {
    console.error("sessionData is not an array, resetting to an empty array.");
    sessionData.value = [];
  }

  const addSessionData = (date: string, session: number, rounds: number, incrementSessions: boolean = true) => {
    console.log("sessionData before update:", JSON.stringify(sessionData.value));


   const existingSession = sessionData.value.find(session => session.date === date);

   if(existingSession) {
    if(incrementSessions){
      completedWorkSessions.value += session - existingSession.sessions;
      existingSession.sessions = session;
    }
    existingSession.rounds = rounds;
   } else {
    sessionData.value.push({date, sessions: session, rounds});
    completedWorkSessions.value += session;
   }

   console.log("Adding session data:", {date, session, rounds});

   useStatsStore().addSessionData(date, completedWorkSessions.value, rounds);

   console.log("sessionData after update:", JSON.stringify(sessionData.value));
   
  }

  const completeCurrentPhase = () => {
   const currentDate = new Date().toISOString().split('T')[0];
  //  completedWorkSessions.value;
   addSessionData(currentDate, completedWorkSessions.value + 1, rounds.value);
  }
  const setRounds = (newRounds: number) => {
    console.log("Setting new rounds value in useSessionStore:", newRounds);
    
    rounds.value = newRounds;
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
  }

}, {
  persist: [
    {
      paths: ['sessionData', 'completedWorkSessions', 'rounds'],
      storage: window.localStorage,
    }
  ]
});
