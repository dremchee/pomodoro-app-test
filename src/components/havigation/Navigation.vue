<script setup lang="ts">
  import HouseButtonIcon from '../../assets/img/house-button.svg'
  import StattisticsButtonIcon from '../../assets/img/statistics-button.svg'
  import CustomisationButtonIcon from '../../assets/img/customisation-button.svg'
</script>

<template>
  <nav class="navigation">
    <RouterLink to="/" class="navigation-link">
      <HouseButtonIcon></HouseButtonIcon> 
    </RouterLink>
    <RouterLink to="/stats">
      <StattisticsButtonIcon />
    </RouterLink>
    <RouterLink to="/settings">
      <CustomisationButtonIcon />
    </RouterLink>
  </nav>
</template>

<style scoped>
  .navigation {
    /* display: flex;
    gap: 2 rem; */
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #3E3D3A;
    min-height: 78px;
    gap: 0 104px;
    color: #E2DCCB;
  }

  .navigation-link {
    color: #E2DCCB;
  }
</style>