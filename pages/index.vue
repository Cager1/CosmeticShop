<script lang="ts" setup>
import NewProductsCard from "~/components/products/NewProductsCard.vue";
import {useProductStore} from "~/stores/product";

const carouselModel = ref(0)

const productStore = useProductStore()
await productStore.getLatestProducts()
const latestProducts = computed(() => productStore.latestProducts)
</script>

<template>
  <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'slide'"
      :autoplay="{
      delay: 5000,
      }"
  >
    <SwiperSlide>
      <div class="carousel__item sm:flex  w-full bg-orange-200">
        <div  class="px-5 py-14 flex flex-col gap-6 w-full">
          <h1 class="text-3xl md:text-5xl lg:text-7xl">
            Prirodna ljepota
          </h1>
          <h3 >
            Najbolji korektori tamnih mrlja za svaki budžet

          </h3>
          <div class="flex justify-center">
            <Button class="w-40" severity="default" nuxtLink to="/shop">Shop Now</Button>
          </div>
        </div>

      <div  class="relative float-right">
        <img src="/slide1.webp" class="md:max-w-[600px]">
        <div class="img-border"></div>
        <div class="image-border-left-bottom"></div>
        <div class="image-border-left-top"></div>
      </div>
    </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class=" carousel__item w-full bg-gray-400 sm:flex text-white">
        <div class="relative">
          <img src="/slide2.webp" class="md:max-w-[600px]">
          <div class="img-border"></div>
          <div class="image-border-left-bottom"></div>
          <div class="image-border-left-top"></div>
        </div>
        <div class="px-5 py-14 flex flex-col gap-6">
          <h1 class="text-3xl md:text-5xl lg:text-7xl">
            Moderni stil
          </h1>
          <h3 class="md:text-xl2">
            Paleta sjenila za oči koja će vam pomoći da izgledate kao da ste upravo izašli iz salona
          </h3>
          <div class="flex justify-center">
            <Button class="w-40" severity="default" nuxtLink to="/shop">Shop Now</Button>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  <div class="flex mt-10 justify-center items-center p-10">
    <h2 class="text-3xl">Najnovije u ponudi</h2>
  </div>
  <div>
    <div class="flex flex-col p-3 flex-wrap md:flex-row gap-16 md:gap-10 md:justify-center items-center md:items-stretch">
      <NewProductsCard v-for="(product, index) in latestProducts" :product="product"/>
    </div>
  </div>
</template>

<style scoped>
.img-border {
  border-top: 7px solid #ffffff;
  border-bottom: 7px solid #ffffff;
  border-left: 7px solid transparent;
  border-right: 7px solid #ffffff;
  content: "";
  position: absolute;
  z-index: 1;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  top: 30px;
  left: 30px;
}

.image-border-left-bottom {
  border-left: 7px solid #ffffff;
  content: "";
  position: absolute;
  width: 825px;
  height: 100px;
  top: 30px;
  left: 30px;
  z-index: 2;
}
.image-border-left-top {
  border-left: 7px solid #ffffff;
  content: "";
  position: absolute;
  width: 825px;
  height: 100px;
  bottom: 30px;
  left: 30px;
  z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
