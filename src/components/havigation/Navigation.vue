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
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--color-light);
  min-height: 78px;
  gap: 0 104px;
  color: var(--color-text);
}

.navigation-link {
  color: var(--color-text);
}
</style>