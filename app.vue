<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  <client-only>
      <div v-if="cartAnimation" style="z-index: 2000" id="toast-bottom-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-gray-700 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5" role="alert">
        Uspješno dodano u kasu
        <Vue3Lottie
            class="rounded-full"
            animationLink="https://lottie.host/6dd93cc1-5016-4347-b861-30b296a3ff47/PfccrCwnQn.json"
            :height="50"
            :width="50"
            background-color="white"
        />
      </div>

  </client-only>
</template>
<script setup lang="ts">
import {Vue3Lottie} from "vue3-lottie";

const cartStore = useCartStore()
const cartAnimation = computed(() => cartStore.cartAnimation)

// watch cartAnimation
watch(cartAnimation, (value) => {
  if (value) {
    setTimeout(() => {
      cartStore.cartAnimation = false
    }, 2000)
  }
})

</script>
