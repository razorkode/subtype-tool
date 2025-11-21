<script setup></script>

<template>
    <nav class="main-nav">
        <div class="nav-container">
            <div class="nav-brand">
                <router-link to="/">Dry Eye Project</router-link>
            </div>
            <ul class="nav-links">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
                <li>
                    <router-link to="/contact">Contact</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.main-nav {
    background: #2c3e50;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand a {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    padding: 0.5rem;
}

.nav-links a:hover {
    color: #42b983;
}

.nav-links a.router-link-active {
    color: #42b983;
    border-bottom: 2px solid #42b983;
}
</style>
