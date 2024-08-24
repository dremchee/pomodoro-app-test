import { defineStore, storeToRefs } from "pinia";
import { ref, watchEffect } from 'vue';
import { useSettingsStore } from "@/components/settings/useSettingsStore";

export const useStatsStore = defineStore("stats", () => {
 const { rounds } = storeToRefs(useSettingsStore());

 const sessionData = ref<Array<{date: string, sessions: number, rounds: number}>>([
  { date: "2024-08-01", sessions: 2, rounds: 7},
  { date: "2024-08-02", sessions: 4, rounds: 10 },
 ]);

 const addSessionData = (date: string, sessions: number, rounds: number) => {
  const existingData = sessionData.value.find(data => data.date === date);
  if(existingData) {
   existingData.sessions = sessions;
   existingData.rounds = rounds;
  } else {
   sessionData.value.push({date, sessions, rounds: rounds});
  }
  console.log("Stats updated:", sessionData.value);
  
 };

 watchEffect ( () => {
  console.log(`rounds изменилось на ${rounds.value}`);

  const currentDate = new Date().toISOString().split('T')[0];
  const existingData = sessionData.value.find(data => data.date === currentDate);

  if(existingData) {
    existingData.rounds = rounds.value;
  } else {
    sessionData.value.push({date: currentDate, sessions: 0, rounds: rounds.value});
  }

  console.log("sessionData after rounds update: ", sessionData.value);
  
 });

 return{
  sessionData, 
  addSessionData,
 };
}, {
  persist: true,
});  



