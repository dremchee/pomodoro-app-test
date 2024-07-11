<script setup lang="ts">
import DirectionLeftIcon from '../../../assets/img/direction-left-icon.svg'
import DirectionRightIcon from '../../../assets/img/direction-right-icon.svg'

import TwoIconButtons from '../../settings/components/ButtonControl.vue'

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
}]
</script>

<template>
  <div class="container stats">
    <TwoIconButtons>
      <template #icon1>
        <DirectionLeftIcon />
      </template> 
      <template #info>
        <div class="month-and-year-text">January 2024</div>
      </template>
      <template #icon2>
        <DirectionRightIcon />
      </template>
    </TwoIconButtons>
    <div class="graphical-analytics-container">
      <div class="graphical-analytics-el" v-for="_ in 30"></div>
    </div>
    <div class="activity-statistics-container">
      <div class="activity-statistics-el" v-for="item in statsData">
        <div class="activity-statistics-el-date">{{ item.date }}</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle" v-for="_ in item.sessions"></div>
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

.month-and-year-text {
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  flex-grow: 1;
}

.graphical-analytics-container {
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

.graphical-analytics-el {
  width: 0.5rem;
  height: 11.25rem;
  background-color: var(--color-light);
}

.activity-statistics-container {
  display: flex;
  align-items: space-between;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 0.01px;
}

.activity-statistics-el {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid var(--color-light);
}

.activity-statistics-el-date {
  font-weight: 500;
  font-size: 16px;
}

.activity-statistics-el-circle-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  row-gap: 3px;
  max-width: 120px;
  min-height: 40px;
}

.activity-statistics-el-circle {
  width: 10px;
  height: 10px;
  background-color: var(--color-light);
  border-radius: 50%;
}
</style>