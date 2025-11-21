<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div class="home">
    <h1>Welcome to Dry Eye Project</h1>
    <p>This is the home page with a Pinia counter demo.</p>

    <div class="counter-demo">
      <h2>Pinia Counter Demo</h2>
      <div class="counter-card">
        <p class="count-display">Count: <strong>{{ counterStore.count }}</strong></p>
        <p class="count-display">Double Count: <strong>{{ counterStore.doubleCount }}</strong></p>
        <button @click="counterStore.increment" class="btn-increment">
          Increment Counter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.counter-demo {
  margin-top: 3rem;
}

h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
}

.counter-card {
  background: #f8f9fa;
  border: 2px solid #42b983;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.count-display {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.btn-increment {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-increment:hover {
  background: #359268;
}
</style>
