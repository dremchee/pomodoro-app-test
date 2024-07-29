<script setup lang="ts">
import { useSessionStore } from '../../work/useSessionStore';
import Button from '../../shared/Button.vue';
import PlayIcon from '../../../assets/img/play.svg';
import { useRouter } from 'vue-router';

const sessionStore = useSessionStore()

const router = useRouter()

const routeToSession = () => {
  sessionStore.isActiveSession = true
  router.push('/work')
}
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