<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String || Boolean,
    default: 'info',
  },
  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  nuxtLink: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
  },

  type: {
    type: String,
    default: 'button',
  },
})

const severities = {
  active: 'm-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-700 px-5 py-3 font-medium text-white shadow ',
  inactive: 'm-2 inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 font-medium shadow',
  info: 'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mb-2',
  success: 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 ',
  warning: 'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2',
  error: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2',
  default: 'focus:outline-none text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-2.5 py-2.5 mr-2 mb-2',
}
</script>

<template>
  <button :type="type"  :disabled="disabled" class="relative" :class="{'cursor-not-allowed pointer-events-none relative ' : disabled} + severity ? severities[severity] : ''">
    <NuxtLink v-if="nuxtLink" :to="to">
      <div class="flex justify-center">
        <div class="flex align-middle">
          <Icon v-if="prependIcon" :name="prependIcon" class="w-5 h-5 mr-1" />
        </div>

        <slot/>

        <div class="flex align-middle">
          <Icon v-if="appendIcon" :name="appendIcon" class="w-5 h-5 ml-1" />
        </div>
      </div>
    </NuxtLink>
    <div v-else class="flex justify-center">
      <div class="flex align-middle">
        <Icon v-if="prependIcon" :name="prependIcon" class="w-5 h-5 mr-1" />
      </div>

      <slot/>

      <div class="flex align-middle">
        <Icon v-if="appendIcon" :name="appendIcon" class="w-5 h-5 ml-1" />
      </div>
    </div>
    <div v-if="disabled" class="absolute h-full w-full bg-opacity-20 bg-gray-400 top-0 left-0 z-10"></div>
  </button>

</template>

<style scoped></style>
