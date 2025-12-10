<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'teal', 'purple'].includes(value),
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})

const colorConfig = {
    blue: {
        headerBg: 'linear-gradient(to right, #3AADE1, #05319B)',
    },
    teal: {
        headerBg: 'linear-gradient(to right, #52A5A4, #2D5A59)',
    },
    purple: {
        headerBg: 'linear-gradient(to right, #9B6FB5, #5A3D6E)',
    },
}

const headerBg = computed(() => colorConfig[props.color].headerBg)
</script>

<template>
    <div class="flex items-stretch">
        <!-- Content Box - white, no gradient bar on left for sub-options -->
        <div
            class="relative w-full max-w-[420px] min-w-[280px] flex flex-col rounded-2xl overflow-hidden border border-gray-300"
        >
            <!-- Header with category and title -->
            <div
                class="text-white py-3 px-5 text-center"
                :style="{ background: headerBg }"
            >
                <div class="text-xs font-medium opacity-90">{{ category }}</div>
                <div class="text-xl font-bold">{{ title }}</div>
            </div>

            <!-- Content area -->
            <div class="flex-1 bg-white py-4 px-5 text-gray-700 text-sm">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
