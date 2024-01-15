export const useCartStore = defineStore('cart', () => {
    const cart = ref<Product[]>([])
    const cartAnimation = ref(false)
    const totalPrice = computed(() => {
        let price = cart.value.reduce((total, product) => {
            if (product.price && product.quantity) {
                return total + product.price * product.quantity
            } else {
                return total
            }
        }, 0)

        // round to 2 decimals, show as 20.00 instead of 20
        return Math.round(price * 100) / 100
    })


    const addToCart = (product: Product) => {
        // add quantity of 1 to the product
        // if the product is already in the cart, increase the quantity
        // otherwise, add the product to the cart
        cartAnimation.value = true
        const productInCart = cart.value.find((p) => p.id === product.id)
        if (productInCart) {
            // @ts-ignore
            productInCart.quantity++
            return
        }
        product.quantity = 1
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
        cartAnimation,
        addToCart,
        removeFromCart,
        clearCart,
    }
})
