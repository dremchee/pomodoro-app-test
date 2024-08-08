<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
 timeInSeconds: number
}>()

const emit = defineEmits(['increase-time', 'decrease-time']);

function increaseTime() {
 emit('increase-time');
}

function decreaseTime() {
 emit('decrease-time');
}

const formattedTime = computed(() => {
 const minutes = Math.floor(props.timeInSeconds / 60);
 const seconds = props.timeInSeconds % 60;
 return `${minutes}:${seconds.toString().padStart(2, '0')}`
});

</script>

<template>
 <div class="button-container">
  <button class="button-working" @click="decreaseTime">
   <slot name="icon1"></slot>
  </button>
  <slot name="info">{{ formattedTime }}</slot>
  <button class="button-working" @click="increaseTime">
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