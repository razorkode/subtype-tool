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
  <div class="contact">
    <h1>Contact Us</h1>
    <p>Have questions? Send us a message!</p>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Your name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="message"
          required
          rows="5"
          placeholder="Your message here..."
        ></textarea>
      </div>

      <button type="submit" class="btn-submit">Send Message</button>
    </form>
  </div>
</template>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact-form {
  margin-top: 2rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #359268;
}
</style>
