<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  alert(`Thank you, ${name.value}! Your message has been received (demo only).`)
  // Reset form
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
    <p class="text-lg text-slate-600">Have questions? Send us a message!</p>

    <form @submit.prevent="handleSubmit" class="mt-8 bg-slate-50 p-8 rounded-lg">
      <div class="mb-6">
        <label for="name" class="block mb-2 font-semibold text-slate-800">Name:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Your name"
          class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-emerald-500 text-base"
        />
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 font-semibold text-slate-800">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="your.email@example.com"
          class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-emerald-500 text-base"
        />
      </div>

      <div class="mb-6">
        <label for="message" class="block mb-2 font-semibold text-slate-800">Message:</label>
        <textarea
          id="message"
          v-model="message"
          required
          rows="5"
          placeholder="Your message here..."
          class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-emerald-500 text-base font-sans"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full px-8 py-3 text-base bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
      >
        Send Message
      </button>
    </form>
  </div>
</template>
