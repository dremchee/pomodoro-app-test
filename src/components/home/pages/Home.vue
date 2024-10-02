<script setup lang="ts">
import { useSessionStore } from '../../work/useSessionStore';
import Button from '../../shared/Button.vue';
import PlayIcon from '../../../assets/img/play.svg';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { checkDataNewDay } from '@/dataChecker';

const sessionStore = useSessionStore()
const currentDate = new Date().toLocaleString("ru-RU").split(",")[0];
const router = useRouter();

// const clickButton = ref(false);

const routeToSession = () => {
  sessionStore.setClickButton(true);
  sessionStore.checkDateChange();
  router.push('/work');
  // if (sessionStore.lastActiveDate !== currentDate) {
  //   router.push('/');
  // } else {
  //   router.push('/work');
  // }
}

// onMounted(() => {
//    checkDataNewDay();
// });
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