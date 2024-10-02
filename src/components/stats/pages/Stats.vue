<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStatsStore } from '@/components/stats/useStatsStore';
import DirectionLeftIcon from '../../../assets/img/direction-left-icon.svg';
import DirectionRightIcon from '../../../assets/img/direction-right-icon.svg';

import TwoIconButtonsFromStats from '../../../components/settings/components/ButtonControlFromStats.vue';
import BarChart from '@/components/stats/BarChartStats.vue';

const statsStore = useStatsStore();

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function prevMoth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

statsStore.addSessionData('01.08.2024', 2, 7);
statsStore.addSessionData('02.08.2024', 4, 10);

const filteredStatsData = computed(() => {
  return statsStore.sessionData.filter(data => {
    if (!data.date) {
      return;
    }

    const [day, month, year] = data.date.split('.').map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${data.date}`);
      return false;
    }

    return date.getMonth() === currentMonth.value && date.getFullYear() === currentYear.value;
  });
});


</script>

<template>
  <div class="container stats">
    <TwoIconButtonsFromStats :onPrevMonth="prevMoth" :onNextMonth="nextMonth">
      <template #icon1>
        <DirectionLeftIcon />
      </template>
      <template #info>
        <div class="stats-month-text">{{ months[currentMonth] }} {{ currentYear }}</div>
      </template>
      <template #icon2>
        <DirectionRightIcon />
      </template>
    </TwoIconButtonsFromStats>
    <div class="bar-chart-container">
      <BarChart :currentMonth="currentMonth" :currentYear="currentYear" />
    </div>
    <div class="stats-activity-container">
      <div class="stats-activity-el" v-for="item in filteredStatsData" :key="item.date">
        <div class="stats-activity-el-date">{{ item.date }}</div>
        <div class="stats-activity-el-circle-container">
          <div class="stats-activity-el-circle" v-for="index in item.rounds" :key="index"
            :class="{ completed: index <= item.sessions }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stats-month-text {
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  flex-grow: 1;
}

.stats-activity-container {
  display: flex;
  align-items: space-between;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 0.01px;
}

.stats-activity-el {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-light);
  padding: 10px 15px;
}

.stats-activity-el-date {
  font-weight: 500;
  font-size: 16px;
}

.stats-activity-el-circle-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  row-gap: 3px;
  max-width: 50%;
}

.stats-activity-el-circle {
  width: 10px;
  height: 10px;
  background-color: var(--color-light);
  border-radius: 50%;
}

.stats-activity-el-circle.completed {
  background-color: var(--color-primary);
}
</style>