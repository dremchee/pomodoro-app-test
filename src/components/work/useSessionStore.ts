import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { ref, reactive, toRaw, watch } from "vue";
import { useSettingsStore } from "@/components/settings/useSettingsStore";
import { useStatsStore } from "@/components/stats/useStatsStore";
import { useTimerStore } from "./useTimerStore";
// import { SettingsPhase } from "@/components/settings/types";
import Settings from "../settings/pages/Settings.vue";

export const useSessionStore = defineStore(
 "session",
 () => {
  const { workTime, shortBreakTime, longBreakTime } = useSettingsStore();
  const { rounds } = storeToRefs(useSettingsStore());
  interface SessionData {
   [key: string]: number;
  }
  const sessionData = reactive<SessionData>({});
  // let completedRounds = ref(0);
  let completedWorkSessions = ref(0);
  // let rounds = ref<number>(6);

  const addSessionData = (date: string, completedWorkSessionsCount: number, roundsCount: number) => {
   if(sessionData[date]) {
    sessionData[date] += completedWorkSessionsCount;
    // sessionData[date] += roundsCount;
   } else {
    sessionData[date] = completedWorkSessionsCount;
    sessionData[date] = roundsCount;
   }
   // completedRounds.value += completedWorkSessionsCount;
   completedWorkSessions.value += completedWorkSessionsCount;
  //  rounds.value += roundsCount;
   console.log("Adding session data:", {date, completedWorkSessionsCount, roundsCount});
   
   saveSessionData();

   const statsStore = useStatsStore();
   statsStore.addSessionData(date, completedWorkSessions.value, roundsCount);
  }

  const completeCurrentPhase = () => {
   const currentDate = new Date().toISOString().split('T')[0];
   completedWorkSessions.value;
   addSessionData(currentDate, 1, 1);
  }

  // const setCompletedWorkSessions = (value: number) => {
  //   console.log(`Setting completedWorkSessions to ${value}`);
  //   completedWorkSessions.value = value;
  //   saveSessionData();
  // }

  const saveSessionData = () => {
   try{
    const date = new Date().toISOString().split('T')[0];
    localStorage.setItem('sessionData', JSON.stringify(toRaw(sessionData)));
    localStorage.setItem('completedWorkSessions', JSON.stringify(completedWorkSessions.value));
    localStorage.setItem('rounds', JSON.stringify(rounds.value));
    localStorage.setItem('lastSaveDate', date);
    console.log("Сохранение данных:", {sessionData: JSON.parse(JSON.stringify(toRaw(sessionData))), completedWorkSessions: completedWorkSessions.value, rounds: rounds.value});
    // console.log("Saved session data:", {sessionData: sessionData, completedRounds: completedRounds.value});
   } catch(error) {
    console.error('Ошибка сохранения данных:', error);
   }
  }

  const loadSessionData = () => {
   try{
    const savedData = localStorage.getItem('sessionData');
    const savedCompletedWorkSessions = localStorage.getItem('completedWorkSessions');
    const savedRounds = localStorage.getItem('rounds');
    const savedDate = localStorage.getItem('lastSaveDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if(savedDate !== currentDate) {
      console.log("Обнаружен новый день. Сброс данных сессии.");
      completedWorkSessions.value = (0);
      setRounds(6);
    } else {
      if(savedData !== null && savedData !== 'undefined') {
       Object.assign(sessionData, JSON.parse(savedData));
      }
      if(savedCompletedWorkSessions !== null && savedCompletedWorkSessions !== 'undefined') {
       completedWorkSessions.value = JSON.parse(savedCompletedWorkSessions);
       console.log("Загружено completedWorkSessions:", JSON.parse(localStorage.getItem('completedWorkSessions') || '0'));
      } else {
        console.warn("completedWorkSessions не найдено в localStorage, устанавливаем значение 0.");
        completedWorkSessions.value = 0;
      }
  
      if(savedRounds !== null && savedRounds !== 'undefined') {
       setRounds(JSON.parse(savedRounds));
      }
    }
    console.log("Загружено sessionData:", {sessionData: JSON.parse(JSON.stringify(toRaw(sessionData))), completedWorkSessions: completedWorkSessions.value, rounds: rounds.value});
   } catch(error) {
    console.error('Ошибка загрузки данных:', error);
   }
  };

  
  const setRounds = (newRounds: number) => {
    console.log("Setting new rounds value in useSessionStore:", newRounds);
    
    rounds.value = newRounds;
    saveSessionData();
  }
  
  watch(completedWorkSessions, saveSessionData);
  loadSessionData();

  
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
  //  setCompletedWorkSessions,
  };
});
