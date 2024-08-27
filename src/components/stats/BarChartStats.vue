<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useStatsStore } from '@/components/stats/useStatsStore';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
 currentMonth: number;
 currentYear: number;
}>();

const statsStore = useStatsStore();

// const currentDate = new Date();
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();

// const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const chartData = computed(() => {
 const daysInMonth = new Date(props.currentYear, props.currentMonth + 1, 0).getDate();

 const labels = Array.from({ length: daysInMonth }, (_, index) => {
  return `${(index + 1).toString().padStart(2, '0')}.${(props.currentMonth + 1).toString().padStart(2, '0')}`;
 });

 const sessionsData = Array.from({ length: daysInMonth }, (_, index) => {
  const day = index + 1;
  const formattedDate = `${day.toString().padStart(2, '0')}.${(props.currentMonth + 1).toString().padStart(2, '0')}.${props.currentYear}`;
  const dayData = statsStore.sessionData.find(data => data.date === formattedDate);
  return dayData ? (dayData.sessions / (dayData.rounds || 1)) * 100 : 0;
 });

 const roundsData = Array.from({ length: daysInMonth }, (_, index) => {
  const day = index + 1;
  const formattedDate = `${day.toString().padStart(2, '0')}.${(props.currentMonth + 1).toString().padStart(2, '0')}.${props.currentYear}`;
  const dayData = statsStore.sessionData.find(data => data.date === formattedDate);
  return dayData ? ((dayData.rounds - dayData.sessions) / (dayData.rounds || 1)) * 100 : 100;
 });

 return {
  labels,
  datasets: [
   {
    label: 'Sessions completion',
    backgroundColor: 'rgba(255, 69, 69, 1)',
    data: sessionsData,
   },
   {
    label: 'Remaining rounds',
    backgroundColor: 'rgba(62, 61, 58, 1)',
    data: roundsData,
   },
  ],
 };
});

const chartOptions = ref({
 responsive: true,
 maintainAspectRatio: false,
 plugins: {
  legend: {
   display: false,
  },
 },
 scales: {
  x: {
   stacked: true,
   display: false,
  },
  y: {
   beginAtZero: true,
   max: 100,
   display: false,
   stacked: true,
  },
 },
});
</script>

<template>
 <div class="chart-contaner">
  <Bar :data="chartData" :options="chartOptions" />
 </div>
</template>

<style scoped>
.chart-contaner {
 width: 100%;
 height: 11.25rem;
 margin: 0 auto;
 padding: 10px 0;
}
</style>