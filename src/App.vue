<script setup>
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import HowToUse from '@/components/HowToUse.vue'
</script>

<template>
    <main class="flex min-h-screen flex-col min-w-5xl mx-auto p-8">
        <!-- Main Content (Above Footer) -->
        <div class="flex items-center justify-center gap-4">
            <!-- Left Navigation -->
            <MainNav />

            <div class="flex items-center justify-center">
                <!-- Diamond Buttons -->
                <DiamondButtons />

                <!-- Main Content -->
                <div class="relative bg-white py-8 px-2 max-w-xl">
                    <HowToUse />
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-6">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </main>
</template>
