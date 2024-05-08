<script setup lang="ts">
import Navigation from './components/havigation/Navigation.vue'
</script>

<template>
  <div class="container">
    <div class="header">
      <Navigation />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: sans-serif;
  }

  #app {
    height: 100%;
  }
</style>

<style scoped>
  .container {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
