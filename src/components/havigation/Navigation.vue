<script setup lang="ts">

</script>

<template>
  <nav class="navigation">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/stats">Stats</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>
</template>

<style scoped>
  .navigation {
    display: flex;
    gap: 2rem;
  }
</style>