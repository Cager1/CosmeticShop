<script lang="ts" setup>


import {Vue3Lottie} from "vue3-lottie";

const { $listen } = useNuxtApp()

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
    name: 'Početna',
    link: '/'
  },
  {
    name: 'Shop',
    link: '/shop'
  },
  {
    name: 'O nama',
    link: '/about'
  },
  {
    name: 'Kontakt',
    link: '/contact'
  },
])

const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLoggedIn)

const projectStore = useProjectStore()
const project = computed(() => projectStore.project as Project)
const title = computed(() => projectStore.project?.name)

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

useHead({
  title: title.value,
})


const cartAnimation = computed(() => cartStore.cartAnimation)





</script>

<template>
  <header class="flex md:hidden flex-col gap-4 pt-3 bg-white">
    <div class="flex justify-center items-center">
      <Icon size="50" name="ph:flower-tulip-thin" />
      <h1 class="text-6xl text-center">{{ project?.name}}</h1>
    </div>
    <div class="flex justify-center items-center gap-4">
      <Icon size="30" class="cursor-pointer transform transition ease-in-out duration-500 hover:text-red-500 hover:delay-300" name="streamline:magnifying-glass" />
      <div  class="relative cursor-pointer ">
        <Icon @click="navigateTo('/shopping-cart')" size="35" class="transform transition ease-in-out duration-500 hover:text-red-500 hover:delay-300"  name="tdesign:shop" />
        <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">{{ cart.length }}</div>
      </div>
      <Icon @click="sideNav = !sideNav" size="35" class="cursor-pointer transform transition duration-500 ease-in-out hover:delay-300 hover:text-red-500" name="solar:hamburger-menu-broken" />
    </div>
  </header>
  <header class="text-gray-600 p-5 hidden md:block body-font">
    <div class="grid grid-cols-3 justify-center items-center">
      <div class="flex justify-start items-center">
        <NuxtLink to="/" class="flex title-font font-medium items-center mb-4 md:mb-0">
          <Icon size="40" name="ph:flower-tulip-thin" />
          <h1 class="text-3xl">{{ project?.name}}</h1>
        </NuxtLink>
      </div>
      <nav class=" ml-auto mr-auto flex flex-wrap items-center text-base justify-center">
          <NuxtLink  v-for="(link, index) in navLinks" :to="link.link" class=" p-2 text-gray-800 text-center  hover:bg-gray-100 hover:text-gray-800 rounded-lg">
            <span>{{ link.name }}</span>
          </NuxtLink>
      </nav>
      <div  class="relative flex justify-end items-center mr-5 cursor-pointer ">
        <Icon @click="navigateTo('/shopping-cart')" size="35" class="transform transition ease-in-out duration-500 hover:text-red-500 hover:delay-300"  name="tdesign:shop" />
        <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">{{ cart.length }}</div>
      </div>
    </div>
  </header>
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
            <template v-for="(category, index) in project.categories" >
              <li v-if="!category?.parent_id">
                <NuxtLink class="text-gray-600 hover:text-gray-800">{{ category.name }}</NuxtLink>
              </li>
            </template>

          </nav>
        </div>

        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">NEWSLETTER</h2>
          <div class="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
            <div class="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
              <label for="footer-field" class="leading-7 text-sm text-gray-600">E-mail</label>
              <input type="text" id="footer-field" name="footer-field" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <button class="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Preplati se</button>
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
          <span class="ml-3 text-xl">{{ project.name}}</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© 2024 {{ project.name}}
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center items-center sm:justify-start">
        <a v-if="project.facebook_url" :href="project.facebook_url" target="_blank" class="text-gray-500">
          <Icon size="25" name="ri:facebook-fill" />
        </a>
        <a v-if="project.instagram_url" :href="project.instagram_url" target="_blank" class="ml-3 text-gray-500">
          <Icon size="25" name="mdi:instagram" />
        </a>
        <a v-if="project.youtube_url" :href="project.youtube_url" target="_blank" class="ml-3 text-gray-500">
          <Icon size="32" name="mingcute:youtube-line" />
        </a>
        <a v-if="project.linkedin_url" :href="project.linkedin_url" target="_blank" class="ml-3 text-gray-500">
          <Icon size="28" name="mingcute:linkedin-line" />
        </a>
          <a v-if="project.tiktok_url" :href="project.tiktok_url" target="_blank" class="ml-3 text-gray-500">
            <Icon size="27" name="ic:baseline-tiktok"/>
          </a>
      </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
