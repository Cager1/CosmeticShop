<script lang="ts" setup></script>

<template>
  <section class="text-gray-600 body-font relative">
    <div class="absolute inset-0 bg-gray-300">
      <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23163.872637277724!2d17.308135434692343!3d43.47136709584614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b26df70a1f60f%3A0xab55804f498b7c75!2zUG9zdcWhamU!5e0!3m2!1sen!2sba!4v1704630113754!5m2!1sen!2sba" style="filter: grayscale(1) contrast(1.2) opacity(0.4);"></iframe>
    </div>
    <div class="container px-5 py-24 mx-auto flex">
      <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Povratne informacije</h2>
        <p class="leading-relaxed mb-5 text-gray-600">
          Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte. Odgovorit ćemo vam u najkraćem mogućem roku.
        </p>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">E-mail</label>
          <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Poruka</label>
          <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Pošalji</button>
        <p class="text-xs text-gray-500 mt-3">
          Odgovorit ćemo vam u najkraćem mogućem roku.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
