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
    { date: "01.08.2024", sessions: 2, rounds: 7 },
    { date: "02.08.2024", sessions: 3, rounds: 10 },
    { date: "02.09.2024", sessions: 4, rounds: 10 },
  ]);
  let completedWorkSessions = ref(0);
  const lastActiveDate = ref<string>("");

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

  if(!Array.isArray(sessionData.value)) {
    sessionData.value = [];
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("ru-RU").split(",")[0];

  if (lastActiveDate.value !== formattedDate) {
    if(lastActiveDate.value) {
      addSessionData(lastActiveDate.value, completedWorkSessions.value, rounds.value);
    }

    completedWorkSessions.value = 0;
    lastActiveDate.value = formattedDate;
  }

  const completeCurrentPhase = () => {
   addSessionData(formattedDate, completedWorkSessions.value + 1, rounds.value);
  }
  const setRounds = (newRounds: number) => {
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
   lastActiveDate,
  }
 
}, {
  persist: [
    {
      paths: ['sessionData', 'completedWorkSessions', 'rounds', 'lastActiveDate'],
      storage: window.localStorage,
    }
  ]
});
