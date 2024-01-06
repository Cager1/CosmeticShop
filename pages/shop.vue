<script lang="ts" setup></script>

<template>
  <vue-carousel :items-to-show="1.5">
    <vue-slide v-for="slide in 10" :key="slide">
      {{ slide }}
    </vue-slide>

    <template #addons>
      <vue-navigation />
      <vue-pagination />
    </template>
  </vue-carousel>
</template>

<style scoped></style>
