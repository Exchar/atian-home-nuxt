<script lang="ts" setup>

</script>
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style lang="scss">
@use './assets/styles/index.scss';
@media screen and (max-width: 500px) {
  div.vs-navbar.my-navbar {
    background-color: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }

  .bing-wallpaper {
    .external-weather {
      top: 6vh !important;
    }
  }
}
</style>