import { defineStore } from "pinia";
import { ref } from "vue";
import { SettingsPhase } from "@/components/settings/types";
import Settings from "../settings/pages/Settings.vue";

export const useSessionStore = defineStore(
 "session",
 () => {
  const timeLeft = ref<number>(1500);
  const isRunning = ref<boolean>(false);
  const isStopped = ref<boolean>(false);
  const completedWorkSessions = ref<number>(0);
  const currentPhase = ref<SettingsPhase>(SettingsPhase.WORK);
  const currentDate = ref<string>();

  return {
   timeLeft,
   isRunning,
   isStopped,
   completedWorkSessions,
   currentPhase,
   currentDate,
  };
 },
 {
  persist: true,
 }
);
