<script setup lang="ts">
import { useSessionStore } from '../useSessionStore';
import StartSession from '../components/StartSession.vue';
import ActiveSession from '../components/ActiveSession.vue';
import Button from '../../shared/Button.vue';

const sessionStore = useSessionStore()
</script>

<template>
  <div class="session">
    <StartSession v-if="!sessionStore.isActiveSession" />
    <ActiveSession v-else />
    <br>
    <Button @click="sessionStore.isActiveSession = !sessionStore.isActiveSession">
      {{ sessionStore.isActiveSession ? 'End session' : 'Start session' }}
    </Button>
  </div>
</template>

<style scoped>
  .session {
    display: flex;
    flex-direction: column;
  }
</style>