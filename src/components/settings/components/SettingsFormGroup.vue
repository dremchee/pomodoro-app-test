<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="settings-form-group">
    <div class="settings-form-group__label">
      {{ label }}
    </div>
    <div class="settings-form-group__controls">
      <slot />
    </div>
    <div class="settings-form-group__units">
      <slot name="units" />
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

.settings-form-group__label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-form-group__units {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>