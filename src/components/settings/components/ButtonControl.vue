<script lang="ts" setup>
const button1Clicked = () => {
  console.log('Button 1 clicked')
}

const button2Clicked = () => {
  console.log('Button 2 clicked');
}
</script>

<template>
  <div class="button-container">
    <button class="button-working" @click="button1Clicked">
      <slot name="icon1"></slot>
    </button>
    <slot name="info"></slot>
    <button class="button-working" @click="button2Clicked">
      <slot name="icon2"></slot>
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-working {
  border: 1px solid var(--color-light);
  cursor: pointer;
  color: var(--color-text);
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--color-background);
  flex-shrink: 0;
}

.button-working {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>