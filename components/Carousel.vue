<script lang="ts" setup>

import 'swiper/css';

import 'swiper/css/navigation';
import {Navigation, Pagination} from "swiper/modules";

const props = defineProps({
  images: {
    type: Array as PropType<Image[]>,
    required: true,
  },
  breakpoints: {
    type: Object
  },
  settings: {
    type: Object,
    default: () => ({
      itemsToShow: 1,
      snapAlign: 'center',
    }),
  },
  wrapAround: {
    type: Boolean,
    default: false,
  },
  itemsToShow: {
    type: Number,
    default: 1,
  },
})

</script>

<template>
  <Swiper
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
      :loop="true"
      :effect="'slide'"
      :navigation="images.length > 1"
      :pagination="images.length > 1"
  >
    <SwiperSlide class="!flex justify-center items-center" v-for="image in images" :key="image.id">
      <div class="flex justify-center items-center">
        <img :src="image.url" :alt="image.name" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper-button-next {
  background-color: red !important;
}
</style>
