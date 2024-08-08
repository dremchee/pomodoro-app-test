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
  <RouterLink to="/stats" class="navigation-link">
   <StattisticsButtonIcon />
  </RouterLink>
  <RouterLink to="/settings" class="navigation-link">
   <CustomisationButtonIcon />
  </RouterLink>
 </nav>
</template>

<style scoped>
.navigation {
 display: flex;
 width: 100%;
 align-items: center;
 justify-content: space-around;
 border-top: 1px solid var(--color-light);
 min-height: 65px;
 height: 100%;
 color: var(--color-text);
}

.navigation-link {
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--color-light);

 &.router-link-exact-active {
  color: var(--color-text);
 }
}
</style>