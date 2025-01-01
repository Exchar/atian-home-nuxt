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
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>