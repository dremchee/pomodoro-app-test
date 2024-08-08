<script setup lang="ts">
import { ref } from 'vue'
import DirectionLeftIcon from '../../../assets/img/direction-left-icon.svg'
import DirectionRightIcon from '../../../assets/img/direction-right-icon.svg'

import TwoIconButtonsFromStats from '../../../components/settings/components/ButtonControlFromStats.vue'


const statsData = [{
 date: '12.01.2024',
 sessions: 12
}, {
 date: '13.01.2024',
 sessions: 4
}, {
 date: '14.01.2024',
 sessions: 2
}, {
 date: '15.01.2024',
 sessions: 10
}, {
 date: '16.01.2024',
 sessions: 6
}, {
 date: '17.01.2024',
 sessions: 6
}, {
 date: '18.01.2024',
 sessions: 6
}];

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
</script>

<template>
 <div class="container stats">
  <HelloWorld />
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
  <div class="stats-graphic-container">
   <div class="stats-graphic-el" v-for="_ in 30"></div>
  </div>
  <div class="stats-activity-container">
   <div class="stats-activity-el" v-for="item in statsData">
    <div class="stats-activity-el-date">{{ item.date }}</div>
    <div class="stats-activity-el-circle-container">
     <div class="stats-activity-el-circle" v-for="_ in item.sessions"></div>
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

.stats-graphic-container {
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items: center;
 max-width: 21.25rem;
 width: 100%;
 gap: 3.5px;
 height: 40%;
 margin: 0 auto;
}

.stats-graphic-el {
 width: 0.5rem;
 height: 11.25rem;
 background-color: var(--color-light);
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
 height: 50px;
 border-bottom: 1px solid var(--color-light);
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
 max-width: 120px;
 min-height: 40px;
}

.stats-activity-el-circle {
 width: 10px;
 height: 10px;
 background-color: var(--color-light);
 border-radius: 50%;
}
</style>