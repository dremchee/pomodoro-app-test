import {ref} from 'vue'

export const workTime = ref<number>(parseInt(localStorage.getItem('workTime') || '1500'));
export const shortBreakTime = ref<number>(parseInt(localStorage.getItem('shortBreakTime') || '300'));
export const longBreakTime = ref<number>(parseInt(localStorage.getItem('longBreakTime') || '1200'));
export const rounds = ref<number>(parseInt(localStorage.getItem('rounds') || '6'));