<script lang="ts" setup>
import {opt} from "ts-interface-checker";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const optionsVisible = ref(false)

const cartStore = useCartStore()
const project = useProjectStore().project
</script>

<template>
  <div @mouseenter="optionsVisible = true" @mouseleave="optionsVisible = false">
    <div class="border-black flex justify-center w-full border relative">
      <div class="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]">
        <Carousel v-if="product.images" :images="product.images"  />
        <div v-else class="w-full h-full flex justify-center items-center">
          <Icon size="40"  name="mdi:image-off-outline" />
        </div>
      </div>

      <div :class="[optionsVisible ? 'opacity-100' : '-translate-y-full opacity-0']" class="absolute z-10 bottom-5 w-full transition duration-500 flex gap-2 justify-center items-center">
        <Button severity="none" @click="cartStore.addToCart(product)"  class="border-gray-400 hover:scale-125 transition duration-300 border bg-white p-1 rounded-full">
          <Icon name="mi:shopping-cart-add" size="30" />
        </Button>
        <Button nuxt-link :to="'products/' + product.id" severity="none"  class="border-gray-400 hover:scale-125 transition duration-300 border bg-white p-1 rounded-full">
          <Icon name="ph:eye" size="30" />
        </Button>
      </div>
    </div>
    <div class="flex flex-col mt-1 text-center gap-1">
      <p class="font-bold">{{ product.name }}</p>
      <p class="text-sm">{{ product.price ? product.price  + project.currency : null }}</p>
    </div>
  </div>
</template>

<style scoped></style>
