<script setup lang="ts">
import PlusButtonIcon from '../../../assets/img/plus-icon.svg'
import MinusButtonIcon from '../../../assets/img/minus-icon.svg'
</script>

<template>
  <div class="container work">
    <div class="setting-parameters-el">
      <div class="title-el">Work</div>
      <div class="configuring-internal-parameters">
        <div class="configuring-internal-parameters-button">
          <MinusButtonIcon></MinusButtonIcon>
        </div>
        <div class="configuring-internal-parameters-text">25:00</div>
        <div class="configuring-internal-parameters-button">
          <PlusButtonIcon></PlusButtonIcon>
        </div>
      </div>
      <div class="unit-time-text">min</div>
    </div>

    <div class="setting-parameters-el">
      <div class="title-el">Short break</div>
      <div class="configuring-internal-parameters">
        <div class="configuring-internal-parameters-button">
          <MinusButtonIcon></MinusButtonIcon>
        </div>
        <div class="configuring-internal-parameters-text">5:00</div>
        <div class="configuring-internal-parameters-button">
          <PlusButtonIcon></PlusButtonIcon>
        </div>
      </div>
      <div class="unit-time-text">min</div>
    </div>

    <div class="setting-parameters-el">
      <div class="title-el">Long break</div>
      <div class="configuring-internal-parameters">
        <div class="configuring-internal-parameters-button">
          <MinusButtonIcon></MinusButtonIcon>
        </div>
        <div class="configuring-internal-parameters-text">20:00</div>
        <div class="configuring-internal-parameters-button">
          <PlusButtonIcon></PlusButtonIcon>
        </div>
      </div>
      <div class="unit-time-text">min</div>
    </div>

    <div class="setting-parameters-el el-without-border-bottom">
      <div class="title-el height-title-el-with-circuit">Rounds</div>
      <div class="configuring-internal-parameters">
        <div class="configuring-internal-parameters-button">
          <MinusButtonIcon></MinusButtonIcon>
        </div>
        <div class="configuring-internal-parameters-text">6</div>
        <div class="configuring-internal-parameters-button">
          <PlusButtonIcon></PlusButtonIcon>
        </div>
      </div>
      <div class="rounds-circle-container">
        <div class="rounds-circle-container-el"></div>
        <div class="rounds-circle-container-el"></div>
        <div class="rounds-circle-container-el"></div>
        <div class="rounds-circle-container-el"></div>
        <div class="rounds-circle-container-el"></div>
        <div class="rounds-circle-container-el"></div>
      </div>
    </div>
  </div>
</template>

<style>
  .work {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .setting-parameters-el {
    height: 8.125rem;
    border-bottom: 1px solid var(--color-light);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

  .el-without-border-bottom {
    border-bottom: none;
  }

  .height-title-el-with-circuit {
    display: flex;
    align-items: end;
    height: 35%;
  }

  .rounds-circle-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 120px;
    width: 100%;
    margin: 0 auto;
    column-gap: 12px;
    row-gap: 7px;
    height: 35%;
    align-items: start;
  }

  .rounds-circle-container-el {
    width: 10px;
    height: 10px;
    background-color: var(--color-text);
    border-radius: 50%;
  }
</style>