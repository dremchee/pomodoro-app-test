<script setup lang="ts">
import DirectionLeftIcon from '../../../assets/img/direction-left-icon.svg'
import DirectionRightIcon from '../../../assets/img/direction-right-icon.svg'
</script>

<template>
  <div class="container work">
    <div class="change-month-and-year-conatiner">
      <button class="month-and-year-switch arrow-button">
        <DirectionLeftIcon></DirectionLeftIcon>
      </button>
      <div class="month-and-year-text">January 2024</div>
      <button class="month-and-year-switch arrow-button">
        <DirectionRightIcon></DirectionRightIcon>
      </button>
    </div>
    <div class="graphical-analytics-container">
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
      <div class="graphical-analytics-el"></div>
    </div>
    <div class="activity-statistics-container">
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">12.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">11.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">10.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">09.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">08.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">07.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
      </div>
      <div class="activity-statistics-el">
        <div class="activity-statistics-el-date">08.01.2024</div>
        <div class="activity-statistics-el-circle-container">
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
          <div class="activity-statistics-el-circle"></div>
        </div>
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

  .change-month-and-year-conatiner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5.5rem;
    height: 10%;
  }

  .month-and-year-switch {
    border: 1px solid var(--color-light);
    cursor: pointer;
    color: var(--color-text);
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    background-color: var(--color-background);
    flex-shrink: 0;
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