<script setup>
</script>

<template>
  <div class="about">
    <h1>About This Project</h1>
    <p>This is a Vue 3 application for the Dry Eye Project.</p>

    <div class="features">
      <h2>Features</h2>
      <ul>
        <li>Vue 3 with Composition API</li>
        <li>Vue Router for navigation</li>
        <li>Pinia for state management</li>
        <li>Modern build setup with Vite</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

h2 {
  color: #42b983;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #42b983;
  font-weight: bold;
}
</style>
