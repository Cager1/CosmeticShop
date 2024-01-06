

export const useAuthStore = defineStore('auth', () => {
    const user = ref() as Ref<User | null>
    const isLoggedIn = computed(() => !!user.value)

    const getUser = async () => {
        const { data } = await useApi('/auth/user')
        user.value = data.value as User
    }

    const logout = async () => {
        await useApi('/auth/logout', {
            method: 'POST',
        })
        user.value = null
        await getUser()
    }

    return {
        user,
        isLoggedIn,
        getUser,
        logout,
    }
})
