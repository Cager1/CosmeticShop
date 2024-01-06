<script lang="ts" setup>

const sideNav = ref(true)

const loginUrl = useRuntimeConfig().public.loginUrl

// get current url of the page
const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return ''
})

const fullLoginUrl = computed(() => {
  return loginUrl + '?redirect=' + currentUrl.value
})

const fullRegisterUrl = computed(() => {
  return loginUrl + '/register' + '?redirect_to=' + currentUrl.value
})

console.log(fullLoginUrl.value)

const navLinks = ref([
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Shop',
    link: '/shop'
  },
  {
    name: 'About',
    link: '/about'
  },
  {
    name: 'Contact',
    link: '/contact'
  },
])

const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLoggedIn)

const projectStore = useProjectStore()
const project = computed(() => projectStore.project)
const title = computed(() => projectStore.project?.name)

useHead({
  title: title.value,
})


</script>

<template>
  <div class="flex flex-col gap-4 pt-3 bg-white">
    <div class="flex justify-center items-center">
      <Icon size="50" name="ph:flower-tulip-thin" />
      <h1 class="text-6xl text-center">{{ project?.name}}</h1>
    </div>
    <div class="flex justify-center items-center gap-4">
      <Icon size="30" class="cursor-pointer transform transition ease-in-out duration-500 hover:text-red-500 hover:delay-300" name="streamline:magnifying-glass" />
      <div  class="relative cursor-pointer ">
        <Icon @click="navigateTo('shopping-cart')" size="35" class="transform transition ease-in-out duration-500 hover:text-red-500 hover:delay-300"  name="tdesign:shop" />
        <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">20</div>
      </div>
      <Icon @click="sideNav = !sideNav" size="35" class="cursor-pointer transform transition duration-500 ease-in-out hover:delay-300 hover:text-red-500" name="solar:hamburger-menu-broken" />
    </div>
  </div>
  <div :class="{'-translate-x-full' : sideNav}" class="fixed top-0 pt-10 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform duration-700 bg-stone-950" tabindex="-1">
    <div class="flex justify-end">
      <button @click="sideNav = !sideNav" class="transform transition ease-in-out hover:rotate-180 duration-500 text-white hover:text-red-300" type="button" >
        <Icon  size="30" name="material-symbols:close" />
      </button>
    </div>

    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li v-for="(link, index) in navLinks">
          <NuxtLink :to="link.link" class="flex items-center p-2 text-gray-300  hover:bg-gray-100 hover:text-gray-800 rounded-lg group">
            <span class="ms-3">{{ link.name }}</span>
          </NuxtLink>
        </li>
        <client-only>
          <li>
            <NuxtLink v-if="!isLogged" :to="fullLoginUrl" class="flex items-center p-2 text-gray-300  hover:bg-gray-100 hover:text-gray-800 rounded-lg group">
              <span class="ms-3">Prijava</span>
            </NuxtLink>
            <NuxtLink v-else @click="authStore.logout()" class="flex items-center p-2 text-gray-300  hover:bg-gray-100 hover:text-gray-800 rounded-lg group">
              <span class="ms-3">Odjava</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-if="!isLogged" :to="fullRegisterUrl" class="flex items-center p-2 text-gray-300  hover:bg-gray-100 hover:text-gray-800 rounded-lg group">
              <span class="ms-3">Registracija</span>
            </NuxtLink>
          </li>
        </client-only>
      </ul>
    </div>
  </div>
  <div class="mt-7">
    <slot />
  </div>

  <footer class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap md:text-left text-center order-first">
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">LINKOVI</h2>
          <nav class="list-none mb-10">
            <li v-for="(link, index) in navLinks" :key="index">
              <NuxtLink :to="link.link" class="text-gray-600 hover:text-gray-800">{{ link.name }}</NuxtLink>
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">KATEGORIJE</h2>
          <nav class="list-none mb-10">
            <li v-for="(category, index) in project.categories" v-if="!category?.parent_id">
              <NuxtLink class="text-gray-600 hover:text-gray-800">{{ category.name }}</NuxtLink>
            </li>
          </nav>
        </div>

        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">NEWSLETTER</h2>
          <div class="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
            <div class="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
              <label for="footer-field" class="leading-7 text-sm text-gray-600">E-mail</label>
              <input type="text" id="footer-field" name="footer-field" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <button class="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
          </div>
          <p class="text-gray-500 text-sm mt-2 md:text-left text-center">
            Uvijek budite u toku sa novostima.
            <br class="lg:block hidden">Otkažite pretplatu u bilo kojem trenutku.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-gray-100">
      <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Tailblocks</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© 2020 Tailblocks —
          <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@knyttneve</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
