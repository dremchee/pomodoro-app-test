<script setup lang="ts">
import { useSessionStore } from '../useSessionStore';
import StartSession from '../components/StartSession.vue';
import ActiveSession from '../components/ActiveSession.vue';
import Button from '../../shared/Button.vue';
import PlayIcon from '../../../assets/img/play.svg';

const sessionStore = useSessionStore()

const session = document.querySelector('.session');


</script>

<template>
  <div class="session">
    <StartSession v-if="!sessionStore.isActiveSession" />
    <ActiveSession v-else />
    <br>
    <Button @click="sessionStore.isActiveSession = !sessionStore.isActiveSession">
      {{ sessionStore.isActiveSession ? 'End session' : 'Start session' }}
      <template #icon >
        <PlayIcon></PlayIcon>
      </template>
    </Button>
  </div>
</template>

<style scoped>
  .session {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>