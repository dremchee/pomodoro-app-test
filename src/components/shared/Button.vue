<script setup lang="ts">
  
</script>

<template>
  <button class="button" >
    <div class="icon-button">
      <slot name="icon" />
    </div>
    <div class="text-button">
      <slot />
    </div>
  </button>
</template>

<style scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF4545;
    min-height: 68px;
    width: 268px;
    border: none;
    outline: none;
    border-radius: 16px;
    cursor: pointer;
    margin-top: 280px;
  }

  .icon-button {
    margin-right: 24px;
  }

  .text-button {
    font-weight: 500;
    font-size: 24px;
    color: #262626;
  }
</style>