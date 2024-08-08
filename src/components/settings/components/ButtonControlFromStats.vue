<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
 onPrevMonth: () => void;
 onNextMonth: () => void;
}>();
</script>

<template>
 <div class="button-container">
  <button class="button-working" @click="props.onPrevMonth">
   <slot name="icon1"></slot>
  </button>
  <slot name="info">6</slot>
  <button class="button-working" @click="props.onNextMonth">
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