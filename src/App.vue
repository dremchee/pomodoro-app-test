<script setup lang="ts">
import Navigation from './components/havigation/Navigation.vue'
</script>

<template>
  <div class="layout">
    <div class="header">
      <div class="header__title">
        Pomodoro
      </div>
    </div>
    <div class="inner">
      <RouterView />
    </div>
    <div class="footer">
      <Navigation />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  background-color: #262626;
  color: #E2DCCB;
  font-family: "Inter", sans-serif;
}

#app {
  min-height: 100%;
  display: flex;
}

.container {
  padding: 1rem;
}
</style>

<style scoped>
.layout {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
}

.inner {
  flex-grow: 1;
}

.header__title {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #E2DCCB;
  padding: 2rem;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
