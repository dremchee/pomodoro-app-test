<script setup lang="ts">
import PlusButtonIcon from '../../../assets/img/plus-icon.svg'
import MinusButtonIcon from '../../../assets/img/minus-icon.svg'

import SettingsFromGroup from '../components/SettingsFromGroup.vue'
import SettingFromRounds from '../components/SettingFromRounds.vue'

const circles = [{
  id: 1,
}, {
  id: 2,
}, {
  id: 3,
}, {
  id: 4,
}, {
  id: 5,
}, {
  id: 6,
}, 
]
</script>

<template>
  <div class="container setting">
    <div class="setting-parameters-el">
      <SettingsFromGroup label="Work" test="Some text">
        <template #label>Work</template>

        <template #default>
          <div class="configuring-internal-parameters">
            <div class="configuring-internal-parameters-button">
              <MinusButtonIcon></MinusButtonIcon>
            </div>
            <div class="configuring-internal-parameters-text">25:00</div>
            <div class="configuring-internal-parameters-button">
              <PlusButtonIcon></PlusButtonIcon>
            </div>
          </div>
        </template>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingsFromGroup label="Short break" test="Some text">
        <template #label>Short break</template>

        <template #default>
          <div class="configuring-internal-parameters">
            <div class="configuring-internal-parameters-button">
              <MinusButtonIcon></MinusButtonIcon>
            </div>
            <div class="configuring-internal-parameters-text">5:00</div>
            <div class="configuring-internal-parameters-button">
              <PlusButtonIcon></PlusButtonIcon>
            </div>
          </div>
        </template>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingsFromGroup label="Long break" test="Some text">
        <template #label>Long break</template>

        <template #default>
          <div class="configuring-internal-parameters">
            <div class="configuring-internal-parameters-button">
              <MinusButtonIcon></MinusButtonIcon>
            </div>
            <div class="configuring-internal-parameters-text">20:00</div>
            <div class="configuring-internal-parameters-button">
              <PlusButtonIcon></PlusButtonIcon>
            </div>
          </div>
        </template>

        <template #units>
          min
        </template>
      </SettingsFromGroup>
    </div>

    <div class="setting-parameters-el">
      <SettingFromRounds title="Rounds" test="Some text">
        <template #label>Label</template>

        <template #default>
          <div class="configuring-internal-parameters">
            <div class="configuring-internal-parameters-button">
              <MinusButtonIcon></MinusButtonIcon>
            </div>
            <div class="configuring-internal-parameters-text">6</div>
            <div class="configuring-internal-parameters-button">
              <PlusButtonIcon></PlusButtonIcon>
            </div>
          </div>
        </template>

        <template #circles>
          <div class="circles-el" v-for="circle in circles" :key="circle.id"></div>
        </template>
      </SettingFromRounds>
    </div>
  </div>
</template>

<style>
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

.indent-configuring-internal-parameters {
  margin-top: 0.5rem;
}

.configuring-internal-parameters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 208px;
  height: 45%;
  align-items: center;
}

.configuring-internal-parameters-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-light);
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--color-background);
}

.configuring-internal-parameters-text {
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