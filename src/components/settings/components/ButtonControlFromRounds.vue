<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
 rounds: Number
}>();

const emit = defineEmits(['increase-rounds', 'decrease-rounds']);

function increaseRounds() {
 emit('increase-rounds');
}

function decreaseRounds() {
 emit('decrease-rounds');
}
</script>

<template>
 <div class="button-container">
  <button class="button-working" @click="decreaseRounds">
   <slot name="icon1"></slot>
  </button>
  <slot name="info">{{ rounds }}</slot>
  <button class="button-working" @click="increaseRounds">
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