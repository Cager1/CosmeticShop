


export const useProductStore = defineStore('product', () => {
    const latestProducts = ref<Product[]>([])
    // get project from project store
    const projectStore = useProjectStore()
    const project = computed(() => projectStore.project)

    const getLatestProducts = async () => {
        const { data, error } = await useApi('/api/projects/' + project.value?.id + '/get-latest-products')
        latestProducts.value = data.value as Product[]

        console.log(error)
    }

    return {
        latestProducts,
        getLatestProducts
    }
})
