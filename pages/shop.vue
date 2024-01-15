<script lang="ts" setup>

const projectStore = useProjectStore()
const { project } = projectStore

// get query params of search and filters
const route = useRoute()
const router = useRouter()
const query = route.query

console.log(query)

const searchValue = ref('')

const filters = ref<Category[]>([]);
const tableQuery = ref({})

if (query) {
  tableQuery.value = {
    ...query
  }
}

// if query has search add its value ti searchValue
if (query['search[name]']) {
  searchValue.value = query['search[name]'].toString()
}

// if query has filters add them to filters array
if (query['filter[categories.category_id]'] && project) {
  const categories = query['filter[categories.category_id]'].split(',')
  console.log(categories)
  // find categories that are in project.categories with those ids
  filters.value = project.categories.filter((category) => categories.includes(category.id.toString()))
}
const config = useRuntimeConfig()
const page = ref(1)
const { data: products, error } = await useAsyncData(
    'posts',
    () => $fetch('api/projects/get-relation/' + 1 + '/products',{
      baseURL: config.public.apiUrl, credentials: 'include',
      params: {
        'with[]': ['images', 'categories'],
        ...tableQuery.value,
      }
    }), {
      watch: [tableQuery]
    }
)


const filterProducts = async (category: Category) => {
  // check if category exists in filters, if it exists remove it, if it doesn't add it
  if (filters.value.includes(category)) {
    filters.value = filters.value.filter((item) => item.id !== category.id)
  } else {
    filters.value.push(category)
  }


  tableQuery.value = {
    ...tableQuery.value,
    'filter[categories.category_id]': filters.value.map((item) => item.id).join(',')
  }

  // place tableQuery into url
  await router.push({query: tableQuery.value})
};

let searchTimeout: NodeJS.Timeout
const search = (columnKey: string, value: string) => {
  clearInterval(searchTimeout)

  searchTimeout = setTimeout( async () => {
    let filterObject = {
      [`search[${columnKey}]`]: value,
    }


    tableQuery.value = {
      ...tableQuery.value,
      ...filterObject
    }

    // place tableQuery into url
    await router.push({query: tableQuery.value})


    // await productStore.getProducts(tableQuery.value)
  }, 500)

}

// check if category is in filters
const isFiltered = (category: Category) => {
  return filters.value.includes(category)
};
</script>

<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col items-center md:block">
        <InputText @input="search('name', searchValue)" icon="streamline:magnifying-glass" class="max-w-[250px]" v-model="searchValue" placeholder="Pretraži proizvode" />
        <div class="flex flex-wrap gap-1 mt-2">
          <Button @click="filterProducts(category)" :severity="isFiltered(category) ? 'active' : 'inactive'"  v-for="(category, index) in project.categories" :key="index" class="bg-gray-100 text-gray-900">
            {{ category.name }}
          </Button>
        </div>
      </div>

      <div v-if="products" class="flex flex-wrap mb-10">
        <ProductItem v-for="(product, index) in products.data" :product="product" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
