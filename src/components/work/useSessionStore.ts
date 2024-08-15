import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
// import { SettingsPhase } from "@/components/settings/types";
import Settings from "../settings/pages/Settings.vue";

export const useSessionStore = defineStore(
 "session",
 () => {
  const { rounds } = storeToRefs(useSettingsStore());
  const sessionData = ref<Record<string, number>>({});
  const completedRounds = ref(0);

  const addSessionData = (date: string, completedWorkSessions: number) => {
   if(sessionData.value[date]) {
    sessionData.value[date] += completedWorkSessions;
   } else {
    sessionData.value[date] = completedWorkSessions;
   }
   completedRounds.value += completedWorkSessions;
   console.log("Adding session data:", {date, completedWorkSessions, rounds: rounds.value});
   
   saveSessionData();

   const statsStore = useStatsStore();
   statsStore.addSessionData(date, completedRounds.value, rounds.value);
  }

  const completeCurrentPhase = () => {
   const currentDate = new Date().toISOString().split('T')[0];
   useSessionStore().addSessionData(currentDate, 1);
  }

  const saveSessionData = () => {
   try{
    localStorage.setItem('sessionData', JSON.stringify(sessionData.value));
    localStorage.setItem('completedRounds', JSON.stringify(completedRounds.value));
    console.log("Saved session data:", {sessionData: sessionData.value, completedRounds: completedRounds.value});
   } catch(error) {
    console.error('Failed to save data:', error);
   }
  }

  const loadSessionData = () => {
   try{
    const savedData = localStorage.getItem('sessionData');
    const savedCompletedRounds = localStorage.getItem('completedRounds');
    if(savedData) {
     sessionData.value = JSON.parse(savedData);
    }
    if(savedCompletedRounds) {
     completedRounds.value = JSON.parse(savedCompletedRounds);
    }

    console.log("Loaded session data:", {sessionData: sessionData.value, completedRounds: completedRounds.value});
   } catch(error) {
    console.error('Failed to load data:', error);
   }
  };
  
  return {
   sessionData,
   completedRounds,
   addSessionData,
   saveSessionData,
   loadSessionData, 
   completeCurrentPhase,
  };
});
