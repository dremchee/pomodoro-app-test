import { defineStore } from "pinia";
import { ref } from 'vue';

export const useStatsStore = defineStore("stats", () => {
 const sessionData = ref<Array<{date: string, sessions: number}>>([])

 const addSessionData = (date: string, sessions: number) => {
  const existingData = sessionData.value.find(data => data.date === date);
  if(existingData) {
   existingData.sessions += sessions;
  } else {
   sessionData.value.push({date, sessions});
  }
 };

 return{
  sessionData, 
  addSessionData,
 };
}, {
  persist: true,
});  



