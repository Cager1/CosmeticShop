<script lang="ts" setup>
import type {PropType} from "vue";
import * as Yup from "yup";
// import field from Field.ts
import InputText from "~/components/InputText.vue";
const props = defineProps({
  schema: {
    type: Array as PropType<Schema>,
    required: true
  },
  as: {
    type: String,
    default: 'form'
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  submitIcon: {
    type: String,
    default: 'formkit:submit'
  },
  loading: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  }
})

// submit emit
const emit = defineEmits(['submit'])

// get all keys of schema object only if it has name attribute
const keys = props.schema.filter((field: Field) => field.name).map((field: Field) => field.name)

// make reactive schema object of each key only if it has name attribute
const reactiveSchema = reactive(Object.fromEntries(keys.map((key: string) => [key, ''])))
// set value of each key to value of modelValue from each schema object only if it has name attribute
props.schema.forEach((field: Field) => {
  if (field.name)
    reactiveSchema[field.name] = field.modelValue
})

// get all rules  from schema object that has name attribute and make Yup object where key is name of field and value is Yup rule
const rules = props.schema.filter((field: Field) => field.name).map((field: Field) => [field.name, field.rules])
const schemaRules = Yup.object().shape({
  ...Object.fromEntries(rules)
})

const onSubmit = () => {
  console.log(reactiveSchema)
  emit('submit', reactiveSchema)
}
</script>

<template>
  <Form :as="as"  class="space-y-4 md:space-y-6" :validation-schema="schemaRules"  @submit="onSubmit" >
    <div class="flex flex-wrap">
      <div v-for="(field, index) in schema" :class="field.classes" class="p-3">
        <label v-if="field.label" :for="field.name" class="block mb-1 text-sm font-black text-gray-700">{{ field.label}} </label>
        <hr v-if="field.type === 'line'" class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
<!--        <Autocomplete v-else-if="field.type === 'autocomplete'"-->
<!--                      :name="field.name"-->
<!--                      v-model="reactiveSchema[field.name]"-->
<!--                      :items="field.items ? field.items : []"-->
<!--                      :placeholder="field.placeholder"-->
<!--                      :label="field.label"/>-->
<!--        <Dropzone v-else-if="field.type === 'dropzone'"-->
<!--                  :name="field.name"-->
<!--                  autoUpload-->
<!--                  v-model="reactiveSchema[field.name]"-->
<!--                  :upload-url="field.upload_url"-->
<!--        />-->
<!--        <TextEditor v-else-if="field.type === 'texteditor'"-->
<!--                    :name="field.name"-->
<!--                    v-model="reactiveSchema[field.name]"-->

<!--        />-->
<!--        <Dropdown v-else-if="field.type === 'dropdown' && field.items"-->
<!--                  :name="field.name"-->
<!--                  :label="field.dropdownLabel"-->
<!--                  :value="field.value"-->
<!--                  v-model="reactiveSchema[field.name]"-->
<!--                  :items="field.items"-->
<!--                  :placeholder="field.label"-->
<!--                  :icon="field.icon"-->
<!--        />-->
<!--        <Treeview v-else-if="field.type === 'treeview'"-->
<!--                  :name="field.name"-->
<!--                  v-model="reactiveSchema[field.name]"-->
<!--                  :data="field.items"-->
<!--        />-->
<!--        <Checkbox v-else-if="field.type === 'checkbox'"-->
<!--                  :name="field.name"-->
<!--                  v-model="reactiveSchema[field.name]"-->
<!--                  :label="field.label"-->
<!--                  :placeholder="field.placeholder"-->
<!--        />-->
<!--        <TimePicker v-else-if="field.type === 'timepicker'"-->
<!--                    :name="field.name"-->
<!--                    v-model="reactiveSchema[field.name]"/>-->
<!--        <ChipSelector v-else-if="field.type === 'chipselector'"-->
<!--                      :name="field.name"-->
<!--                      v-model="reactiveSchema[field.name]"-->
<!--                      :placeholder="field.placeholder"-->
<!--                      :items="field.items"/>-->
        <InputText v-else
                   :key="index"
                   :icon="field.icon"
                   :placeholder="field.placeholder"
                   :name="field.name"
                   :type="field.type"
                   v-model="reactiveSchema[field.name]"
        />
      </div>

      <Button :loading="loading" type="submit" class="w-full !mr-0 !bg-gray-800" :prepend-icon="submitIcon">{{ submitText }}</Button>
    </div>

  </Form>
</template>

<style scoped></style>
