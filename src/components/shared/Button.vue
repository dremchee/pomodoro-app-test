<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: green;
    color: white;
    border: none;
    border-radius: 8px;
    min-height: 2rem;
    cursor: pointer;
    gap: 1rem;
  }
</style>