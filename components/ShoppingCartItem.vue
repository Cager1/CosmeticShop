<script lang="ts" setup>
// define model product as type Product
const product = defineModel('product')

const cartStore = useCartStore()
const project = useProjectStore().project
</script>

<template>
  <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img v-if="product?.images.length" :src="product.images[0].url" alt="product-image" class="w-full rounded-lg sm:w-40" />
    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div class="mt-5 sm:mt-0">
        <h2 class="text-lg font-bold text-gray-900">{{ product.name }}</h2>
        <p class="mt-1 text-xs text-gray-700">36EU - 4US</p>
      </div>
      <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div class="flex items-center border-gray-100">
          <Button @click="product.quantity > 0 ? product.quantity-- : product.quantity" class="w-8" severity="none"><Icon name="ic:baseline-minus" /></Button>
          <InputText class="w-12" type="number" v-model="product.quantity" />
          <Button @click="product.quantity++" class="w-8" severity="none"><Icon name="ic:baseline-plus" /></Button>
        </div>
        <div class="flex items-center space-x-4">
          <p class="text-sm">{{ (product.price * product.quantity).toFixed(2) + project.currency}}</p>
          <Icon name="ph:x" @click="cartStore.removeFromCart(<Product>product)" class="w-5 h-5 cursor-pointer duration-150 hover:text-red-500" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
