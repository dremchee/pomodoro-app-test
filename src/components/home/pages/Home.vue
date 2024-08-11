<script setup lang="ts">
import { useSessionStore } from '../../work/useSessionStore';
import Button from '../../shared/Button.vue';
import PlayIcon from '../../../assets/img/play.svg';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const sessionStore = useSessionStore()

const router = useRouter()

const routeToSession = () => {
  const today = new Date().toLocaleDateString();
  sessionStore.currentDate = today;
  sessionStore.sessionStartedToday = true;
  sessionStore.isRunning = true
  router.push('/work')
}

onMounted(() => {
  const today = new Date().toDateString();
  if (sessionStore.sessionStartedToday && sessionStore.currentDate !== today) {
    sessionStore.sessionStartedToday = false;
    sessionStore.currentDate = today;
  }
});
</script>

<template>
  <div class="container home">
    <Button @click="routeToSession">
      Start session
      <template #icon>
        <PlayIcon></PlayIcon>
      </template>
    </Button>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>