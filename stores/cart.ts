export const useCartStore = defineStore('cart', () => {
    const cart = ref<Product[]>([])
    const totalPrice = computed(() => {
        return cart.value.reduce((total, product) => {
            if (product.price && product.amount) {
                return total + product.price * product.amount
            } else {
                return total
            }
        }, 0)
    })

    const addToCart = (product: Product) => {
        // add amount of 1 to the product
        // if the product is already in the cart, increase the amount
        // otherwise, add the product to the cart
        const productInCart = cart.value.find((p) => p.id === product.id)
        if (productInCart) {
            // @ts-ignore
            productInCart.amount++
            return
        }
        product.amount = 1
        cart.value.push(product)
    }

    const removeFromCart = (product: Product) => {
        cart.value = cart.value.filter((p) => p.id !== product.id)
    }

    const clearCart = () => {
        cart.value = []
    }

    return {
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
    }
})
