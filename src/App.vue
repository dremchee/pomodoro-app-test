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
:root {
  --color-primary: #FF4545;
  --color-text: #E2DCCB;
  --color-light: #3E3D3A;
  --color-background: #262626;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
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
  padding: 1rem;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
