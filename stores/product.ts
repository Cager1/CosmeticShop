


export const useProductStore = defineStore('product', () => {
    const latestProducts = ref<Product[]>([])
    const products = ref({})
    // get project from project store
    const projectStore = useProjectStore()
    const project = computed(() => projectStore.project)

    const getLatestProducts = async () => {
        const { data, error } = await useApi('/api/projects/' + project.value?.id + '/get-latest-products')
        latestProducts.value = data.value as Product[]

    }

    const getProducts = async (params = {}) => {
        const { data } = await  useApi('api/projects/get-relation/' + project.value?.id + '/products', {
            params: {
                'with[]': ['images', 'categories'],
                ...params
            }
        });
        // @ts-ignore
        products.value = data.value
    }

    return {
        latestProducts,
        products,
        getProducts,
        getLatestProducts
    }
})
