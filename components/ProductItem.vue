<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const project = useProjectStore().project

const cart = useCartStore()

const optionsVisible = ref(false)
</script>

<template>
  <div class="lg:w-1/4 md:w-1/2 p-4 w-full flex flex-col justify-between" @mouseenter="optionsVisible = true" @mouseleave="optionsVisible = false">
    <div>
      <a class="block relative rounded overflow-hidden">
        <LazyCarousel v-if="product.images" :images="product.images"  />
        <div v-else class="w-full h-60 bg-gray-200">
          <div class="flex justify-center items-center w-full h-full">
            <Icon name="carbon:no-image" size="30" />
          </div>
        </div>
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          <template v-for="(category, index) in product.categories">{{ index === product.categories.length -1 ? category.name : category.name + ' - ' }}</template>
        </h3>
        <NuxtLink :to="'products/' + product.id">
          <h2 class="text-gray-900 title-font text-lg font-medium">{{ product.name }}</h2>
        </NuxtLink>
        <p class="mt-1">{{ product.price + project.currency }}</p>

      </div>
    </div>
    <div class="h-20">
      <transition name="fade">
        <div v-if="optionsVisible" class="mt-2 pr-10">
          <Button @click="cart.addToCart(product)" class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" prepend-icon="mdi:basket-fill">U košaricu</Button>
        </div>
      </transition>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
