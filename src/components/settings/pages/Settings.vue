<script setup lang="ts">

import { ref, computed, watch } from 'vue'

import PlusButtonIcon from '../../../assets/img/plus-icon.svg'
import MinusButtonIcon from '../../../assets/img/minus-icon.svg'

import SettingsFromGroup from '../components/SettingsFromGroup.vue'
import SettingFromRounds from '../components/SettingFromRounds.vue'
import TwoIconButtons from '../../settings/components/ButtonControl.vue'
import TwoIconButtonsFromRounds from '../components/ButtonControlFromRounds.vue'

const workTime = ref<number>(parseInt(localStorage.getItem('workTime') || '1500'));
const shortBreakTime = ref<number>(parseInt(localStorage.getItem('shortBreakTime') || '300'));
const longBreakTime = ref<number>(parseInt(localStorage.getItem('longBreakTime') || '1200'));
const rounds = ref<number>(parseInt(localStorage.getItem('rounds') || '6'));

function increaseWorkTime() {
  workTime.value += 300;
}

function decreaseWorkTime() {
  if(workTime.value >= 300) {
    workTime.value -= 300;
  } else {
    workTime.value = 0;
  }
} 

function increaseShortBreakTime() {
  shortBreakTime.value += 300;
}

function decreaseShortBreakTime() {
  if(shortBreakTime.value >= 300) {
    shortBreakTime.value -= 300;
  } else {
    shortBreakTime.value = 0;
  }
}

function increaseLongBreakTime() {
  longBreakTime.value += 300;
}

function decreaseLongBreakTime() {
  if(longBreakTime.value >= 300) {
    longBreakTime.value -= 300;
  } else {
    longBreakTime.value = 0;
  }
}

function increaseRounds() {
  rounds.value += 1;
} 

function decreaseRounds() {
  if(rounds.value > 1) {
    rounds.value -= 1;
  } 
}

const circles = computed(() => {
  return Array.from({length: rounds.value}, (_, i) => ({id: i + 1}));
});

watch(workTime, (newVal) => {
  localStorage.setItem('workTime', newVal.toString());
});

watch(shortBreakTime, (newVal) => {
  localStorage.setItem('shortBreakTime', newVal.toString())
});

watch(longBreakTime, (newVal) => {
  localStorage.setItem('longBreakTime', newVal.toString())
});

watch(rounds, (newVal) => {
  localStorage.setItem('rounds', newVal.toString())
});
</script>

<template>
  <div class="container setting">
    <div class="setting-parameters-el">
      <SettingsFromGroup title="Work" test="Some text">
        <template #label>Work</template>
        <TwoIconButtons :timeInSeconds="workTime" @decrease-time="decreaseWorkTime" @increase-time="increaseWorkTime">
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">{{ Math.floor(workTime / 60) }}:{{ (workTime % 60).toString().padStart(2, '0') }}</div>
          </template>
          <template #icon2>
            <PlusButtonIcon></PlusButtonIcon>
          </template>
        </TwoIconButtons>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingsFromGroup title="Short break" test="Some text">
        <template #label>Short break</template>
        <TwoIconButtons :timeInSeconds = "shortBreakTime" @decrease-time="decreaseShortBreakTime" @increase-time="increaseShortBreakTime">
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">{{ Math.floor(shortBreakTime / 60) }}:{{ (shortBreakTime % 60).toString().padStart(2, '0') }}</div>
          </template>
          <template #icon2>
          
            <PlusButtonIcon></PlusButtonIcon>
          </template>
        </TwoIconButtons>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingsFromGroup title="Long break" test="Some text">
        <template #label>Long break</template>
        <TwoIconButtons :timeInSeconds = "longBreakTime" @decrease-time="decreaseLongBreakTime" @increase-time="increaseLongBreakTime">
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">{{ Math.floor(longBreakTime / 60) }}:{{ (longBreakTime % 60).toString().padStart(2, '0') }}</div>
          </template>
          <template #icon2>
            <PlusButtonIcon></PlusButtonIcon>
          </template>
        </TwoIconButtons>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingFromRounds title="Rounds" test="Some text" :rounds="rounds">
        <template #label>Label</template>
        <TwoIconButtonsFromRounds :rounds="rounds" @increase-rounds="increaseRounds" @decrease-rounds="decreaseRounds">
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">{{ rounds }}</div>
          </template>
          <template #icon2>
            <PlusButtonIcon></PlusButtonIcon>
          </template>
        </TwoIconButtonsFromRounds>

        <template #circles>
          <div class="circles-el" v-for="circle in circles" :key="circle.id"></div>
        </template>
      </SettingFromRounds>
    </div>
  </div>
</template>

<style scoped>
.setting {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.setting-parameters-el {
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-light);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.setting-parameters-el:last-child {
  border-bottom: none;
}

.setting-internal-parameters-text {
  font-size: 2rem;
  font-weight: 500;
}

.circles-el {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-text);
}
</style>