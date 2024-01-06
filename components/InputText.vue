<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: null
  },
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'input-text'
  },
  rules: {
    type: Object,
  },
  type: {
    type: String,
    default: 'text'
  },
})

const { value, errorMessage } = useField(() => props.name, props.rules, {
  syncVModel: true,
})


</script>

<template>
  <div>
    <label :for="name" class="block mb-1 text-sm font-black text-gray-900 dark:text-white">{{ label}} </label>
    <div  class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-1 flex items-center pointer-events-none">
        <Icon class="w-5 h-5 text-gray-400" :name="icon"/>
      </div>
      <input :type="type" :class="{'pl-7' : icon, 'text-center' : type === 'number'}" v-model="value" :placeholder="placeholder"
             :name="name"
             class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
    </div>
    <div v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</div>
  </div>

</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
