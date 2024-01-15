<script lang="ts" setup>
import * as Yup from "yup";
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

const project = useProjectStore().project

const schema = ref([
  {
    label: '*Ime i prezime',
    name: 'name',
    placeholder: 'Unesite Ime i prezime',
    icon: 'mdi-light:account',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Ime i prezime su obavezni.'),
  },
  {
    label: '*Email',
    name: 'email',
    placeholder: 'Unesite email',
    icon: 'mdi-light:email',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Email je obavezan.'),
  },
  {
    label: '*Telefon',
    name: 'phone',
    placeholder: 'Unesite telefon',
    icon: 'mdi-light:phone',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Telefon je obavezan.'),
  },
  {
    label: '*Adresa',
    name: 'address',
    placeholder: 'Unesite adresu',
    icon: 'mdi:address-marker-outline',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Adresa je obavezna.'),
  },
  {
    label: '*Grad',
    name: 'city',
    placeholder: 'Unesite grad',
    icon: 'fluent:city-24-regular',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Grad je obavezan.'),
  },
  {
    label: '*Poštanski broj',
    name: 'zip',
    placeholder: 'Unesite poštanski broj',
    icon: 'icon-park-outline:zip',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Poštanski broj je obavezan.'),
  },
  {
    label: '*Država',
    name: 'country',
    placeholder: 'Unesite državu',
    icon: 'gis:search-country',
    modelValue: '',
    classes: 'w-full',
    rules: Yup.string().required('Država je obavezna.'),
  },
  {
    label: 'Županija',
    name: 'county',
    placeholder: 'Unesite županiju',
    icon: 'map:real-estate-agency',
    modelValue: '',
    classes: 'w-full',
  }
])

const form = ref(false)
const completeOrder = ref(true)

const changeView = () => {
  completeOrder.value = !completeOrder.value
  setTimeout(() => {
    form.value = !form.value
  }, 800)
}

const order = async (data: any) => {
  const { data: order } = await useApi('api/orders', {
    method: 'POST',
    body: {
      ...data,
      products: cartStore.cart
    }
  })
  cartStore.clearCart()
}
</script>

<template>
  <div class=" bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Košara</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <template v-for="(product, index) in cart" :key="index">
          <ShoppingCartItem  v-model:product="cart[index]" />
        </template>

      </div>
      <!-- Sub total -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 mb-10 shadow-md md:mt-0 md:w-1/3">
        <transition name="slide-fade">
          <FormGenerator :schema="schema"
                         submit-icon="material-symbols:box-add-outline"
                         submit-text="Naruči"
                         @submit="order"
                         v-if="form"
          />
        </transition>
        <transition name="slide-fade">
          <div v-if="completeOrder">
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Zbroj</p>
              <p class="text-gray-700">{{ cartStore.totalPrice.toFixed(2) + project.currency}}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Dostava</p>
              <p class="text-gray-700">{{ (5).toFixed(2) + project.currency}}</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Ukupno</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">{{ (cartStore.totalPrice + 5).toFixed(2) + project.currency }}</p>
                <p class="text-sm text-gray-700">PDV uključen</p>
              </div>
            </div>
            <button @click="changeView" class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Završi narudžbu</button>
          </div>
        </transition>



      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
