<template>
  <div class="time-indicator">
    <div class="time-indicator__date">12.01.2024</div>
    <div class="time-indicator__time">15:59</div>
    <div class="time-indicator__status">Work</div>
  </div>
</template>

<style scoped>
.time-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 8px solid var(--color-light);
  border-radius: 50%;
  width: 19rem;
  height: 19rem;
}

.time-indicator__date {
  font-weight: 300;
  font-size: 1rem;
}

.time-indicator__time {
  font-size: 5.25rem;
  font-weight: 500;
}

.time-indicator__status {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>