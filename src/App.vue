<script setup>
import MainNav from '@/components/MainNav.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <MainNav />
        <main class="flex-1">
            <router-view />
        </main>
    </div>
</template>
