<script setup lang="ts">

// get project from store

const projectStore = useProjectStore()
const project = computed(() => {
  return projectStore.project
})

// get product from route params
const { params } = useRoute()
const { produkt } = params

const { data: product, error } = await useApi(`api/products/${produkt}`, {
      params: {
        'with[]': ['images', 'categories'],
      }
    }
)

</script>

<template>
  <ProductDetails :product="product" :project="project" />
</template>

<style scoped>

</style>
