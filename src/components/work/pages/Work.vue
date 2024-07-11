<script setup lang="ts">
import RepeatButtonIcon from "../../../assets/img/repeat-button.svg";
import PauseButtonIcon from "../../../assets/img/pause-button.svg";
import StopSessionButtonIcon from "../../../assets/img/stop-button.svg";

import TimeIndicator from "../components/TimeIndicator.vue";
</script>

<template>
  <div class="container work">
    <div class="work-content">
      <div class="work-timer-container">
        <TimeIndicator />
      </div>
      <div class="work-report-container">
        <div class="work-report-circle-container">
          <div class="work-report-circle" v-for="_ in 6"></div>
        </div>
        <div class="work-report-text-info">2 of 6 sessions</div>
      </div>
    </div>
    <div class="work-action">
      <button class="work-action__button _repeat">
        <RepeatButtonIcon />
      </button>
      <button class="work-action__button _action">
        <PauseButtonIcon />
      </button>
      <button class="work-action__button _stop">
        <StopSessionButtonIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.work {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

.work-content {
  flex-grow: 1;
}

.work-timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.work-report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 20%;
}

.work-report-circle-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;
}

.work-report-circle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--color-light);
  border-radius: 50%;
}

.work-report-text-info {
  font-size: 16px;
  color: var(--color-light);
}

.work-action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.work-action__button {
  border: none;
  cursor: pointer;
  background-color: #3e3d3a;
  color: var(--color-text);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  &._action {
    background-color: transparent;
    border: 0.1875rem solid var(--color-text);
    width: 8rem;
    height: 8rem;
  }
}
</style>
