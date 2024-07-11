<script setup lang="ts">
import PlusButtonIcon from '../../../assets/img/plus-icon.svg'
import MinusButtonIcon from '../../../assets/img/minus-icon.svg'

import SettingsFromGroup from '../components/SettingsFromGroup.vue'
import SettingFromRounds from '../components/SettingFromRounds.vue'
import TwoIconButtons from '../../settings/components/ButtonControl.vue'

const circles = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6}, 
]
</script>

<template>
  <div class="container setting">
    <div class="setting-parameters-el">
      <SettingsFromGroup title="Work" test="Some text">
        <template #label>Work</template>
        <TwoIconButtons>
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">25:00</div>
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
        <TwoIconButtons>
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">5:00</div>
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
        <TwoIconButtons>
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">20:00</div>
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
      <SettingFromRounds title="Rounds" test="Some text">
        <template #label>Label</template>
        <TwoIconButtons>
          <template #icon1>
            <MinusButtonIcon></MinusButtonIcon>
          </template>
          <template #info>
            <div class="setting-internal-parameters-text">6</div>
          </template>
          <template #icon2>
            <PlusButtonIcon></PlusButtonIcon>
          </template>
        </TwoIconButtons>

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