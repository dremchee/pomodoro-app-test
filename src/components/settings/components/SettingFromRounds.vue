<script lang="ts" setup>
defineProps<{
 title: string,
 rounds: number
}>()
</script>


<template>
 <div class="settings-form-group">
  <div class="settings-form-group__title">
   {{ title }}
  </div>
  <div class="settings-from-group__controls">
   <slot />
  </div>
  <div class="settings-from-group__circles">
   <slot name="circles" />
  </div>
 </div>
</template>

<style scoped>
.settings-form-group {
 display: flex;
 flex-direction: column;
 gap: 1rem;
 width: 100%;
}

.settings-form-group__title {
 display: flex;
 align-items: center;
 justify-content: center;
}

.settings-from-group__circles {
 display: flex;
 justify-content: center;
 flex-wrap: nowrap;
 gap: 12px;
}
</style>