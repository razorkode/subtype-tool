<script setup>
import MainNav from '@/components/MainNav.vue'
</script>

<template>
    <div id="app">
        <MainNav />
        <main>
            <router-view />
        </main>
    </div>
</template>

<style scoped>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
</style>
