<script lang="ts" setup>

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'checkbox'
  },
  rules: {
    type: Object,
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
})

const { value, errorMessage } = useField(() => props.name, props.rules, {
  syncVModel: true,
})

</script>

<template>
  <div>
    <label :for="name" class="block mb-1 text-sm font-black text-gray-900">{{ label}} </label>
    <div  class="relative flex gap-2">
      <input type="checkbox" class="scale-125 ml-1" v-model="value"
             :name="name">
      <p class="text-sm text-gray-500">{{ placeholder }}</p>
    </div>
    <div v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<style scoped></style>
