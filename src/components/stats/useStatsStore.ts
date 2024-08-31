import { defineStore, storeToRefs } from "pinia";
import { ref, watchEffect } from 'vue';
import { useSettingsStore } from "@/components/settings/useSettingsStore";

export const useStatsStore = defineStore("stats", () => {
 const { rounds } = storeToRefs(useSettingsStore());

 const sessionData = ref<Array<{date: string, sessions: number, rounds: number}>>([
  { date: "01.08.2024", sessions: 2, rounds: 7},
  { date: "02.08.2024", sessions: 4, rounds: 10 },
 ]);

 const addSessionData = (date: string, sessions: number, rounds: number) => {
  const existingData = sessionData.value.find(data => data.date === date);
  if(existingData) {
   existingData.sessions = sessions;
   existingData.rounds = rounds;
  } else {
   sessionData.value.push({date, sessions, rounds: rounds});
  }
 };

 watchEffect ( () => {
  const currentDate = new Date().toLocaleString("ru-RU").split(",")[0];
  const existingData = sessionData.value.find(data => data.date === currentDate);

  if(!existingData) {
    sessionData.value.push({date: currentDate, sessions: 0, rounds: rounds.value});
  }
 });

 return{
  sessionData, 
  addSessionData,
 };
}, {
  persist: true,
});  



