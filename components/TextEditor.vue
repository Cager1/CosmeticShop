<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue";
import {useField} from "vee-validate";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: Object,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  formats: {
    type: Array,
    default: () => ["jpg", "jpeg", "png", "gif", "svg"],
  },
  uploadUrl: {
    type: String,
    default: () => "/files",
  },
});

const { value, errorMessage } = useField(() => props.name, props.rules, {
  syncVModel: true,
})
</script>

<template>
  <Editor api-key="hcdtmcwn9vc7kmoup52yi151h0qow6zn9c1huhpnkaqez4r6"
          style="z-index: 9000"
          :init="{
            plugins: 'lists link table code help wordcount',
            branding: false,
            language: 'hr',
            }"
          v-model="value"
  />
</template>

<style scoped></style>
