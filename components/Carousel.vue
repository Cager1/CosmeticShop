<script lang="ts" setup>

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
<!--  <VueCarousel-->
<!--    :breakpoints="breakpoints"-->
<!--    :settings="settings"-->
<!--    :wrap-around="wrapAround"-->
<!--    :items-to-show="itemsToShow">-->
<!--    <VueSlide v-for="image in images" :key="image.id">-->
<!--      <div class="carousel__item">-->
<!--        <img :src="image.url" :alt="image.name" />-->
<!--      </div>-->
<!--    </VueSlide>-->
<!--    <template #addons>-->
<!--      <VueNavigation />-->
<!--      <VuePagination />-->
<!--    </template>-->
<!--  </VueCarousel>-->
</template>

<style scoped>
.carousel__item {
  width: 100%;
  min-height: 200px;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
