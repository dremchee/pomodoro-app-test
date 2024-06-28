<script setup lang="ts">
import Navigation from './components/havigation/Navigation.vue'
</script>

<template>
  <div class="container">
    <div class="main-title-start-screen">Pomodoro</div>
    <div class="content">
      <RouterView />
    </div>
    <div class="header">
      <Navigation />
    </div>
  </div>
</template>

<style>
    @import url('/src/assets/styles/main.css');
  /* body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: sans-serif;
  }

  #app {
    height: 100%;
  } */
</style>

<style scoped>
  .main-title-start-screen {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-top: 70px;
    color: #E2DCCB;
  }

  .header {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;

  }

  .main-title-start-screen {
    position: fixed;
    top: 0;
    width: 100%;
  }

</style>
