import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { ref, reactive, toRaw } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
import { useTimerStore } from "./useTimerStore";
// import { SettingsPhase } from "@/components/settings/types";
import Settings from "../settings/pages/Settings.vue";

export const useSessionStore = defineStore(
 "session",
 () => {
  const { workTime, shortBreakTime, longBreakTime } = useSettingsStore();
  interface SessionData {
   [key: string]: number;
  }
  const sessionData = reactive<SessionData>({});
  // let completedRounds = ref(0);
  let completedWorkSessions = ref(0);
  let rounds = ref<number>(6);

  const addSessionData = (date: string, completedWorkSessionsCount: number) => {
   if(sessionData[date]) {
    sessionData[date] += completedWorkSessionsCount;
   } else {
    sessionData[date] = completedWorkSessionsCount;
   }
   // completedRounds.value += completedWorkSessionsCount;
   completedWorkSessions.value += completedWorkSessionsCount;
   console.log("Adding session data:", {date, completedWorkSessionsCount, rounds: rounds.value});
   
   saveSessionData();

   const statsStore = useStatsStore();
   statsStore.addSessionData(date, completedWorkSessions.value, rounds.value);
  }

  const completeCurrentPhase = () => {
   const currentDate = new Date().toISOString().split('T')[0];
   completedWorkSessions.value;
   addSessionData(currentDate, 1);
  }

  const saveSessionData = () => {
   try{
    localStorage.setItem('sessionData', JSON.stringify(toRaw(sessionData)));
    localStorage.setItem('completedWorkSessions', JSON.stringify(completedWorkSessions.value));
    localStorage.setItem('rounds', JSON.stringify(rounds.value));
    console.log("Saved session data:", {sessionData: JSON.parse(JSON.stringify(toRaw(sessionData))), completedWorkSessions: completedWorkSessions.value, rounds: rounds.value});
    // console.log("Saved session data:", {sessionData: sessionData, completedRounds: completedRounds.value});
   } catch(error) {
    console.error('Failed to save data:', error);
   }
  }

  const loadSessionData = () => {
   try{
    const savedData = localStorage.getItem('sessionData');
    const savedCompletedWorkSessions = localStorage.getItem('completedWorkSessions');
    const savedRounds = localStorage.getItem('rounds');
    if(savedData !== null && savedData !== 'undefined') {
     Object.assign(sessionData, JSON.parse(savedData));
    }
    if(savedCompletedWorkSessions !== null && savedCompletedWorkSessions !== 'undefined') {
     completedWorkSessions.value = JSON.parse(savedCompletedWorkSessions);
    }

    if(savedRounds !== null && savedRounds !== 'undefined') {
     rounds.value = JSON.parse(savedRounds);
    }
    console.log("Loaded session data:", {sessionData: JSON.parse(JSON.stringify(toRaw(sessionData))), completedWorkSessions: completedWorkSessions.value});
   } catch(error) {
    console.error('Failed to load data:', error);
   }
  };

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
   saveSessionData,
   loadSessionData, 
   completeCurrentPhase,
   setRounds,
  };
});
