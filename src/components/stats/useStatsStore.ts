import { defineStore } from "pinia";
import { ref } from 'vue';

export const useStatsStore = defineStore("stats", () => {
 const sessionData = ref<Array<{date: string, sessions: number, totalRounds: number}>>([]);

 const addSessionData = (date: string, sessions: number, totalRounds: number) => {
  const existingData = sessionData.value.find(data => data.date === date);
  if(existingData) {
   existingData.sessions += sessions;
  } else {
   sessionData.value.push({date, sessions, totalRounds});
  }
  console.log("Stats updated:", sessionData.value);
  
 };

 return{
  sessionData, 
  addSessionData,
 };
}, {
  persist: true,
});  



