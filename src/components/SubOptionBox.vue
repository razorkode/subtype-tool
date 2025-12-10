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
        gradientFrom: '#3AADE1',
        gradientTo: '#05319B',
        headerBg: 'linear-gradient(to right, #3AADE1, #05319B)',
    },
    teal: {
        gradientFrom: '#52A5A4',
        gradientTo: '#2D5A59',
        headerBg: 'linear-gradient(to right, #52A5A4, #2D5A59)',
    },
    purple: {
        gradientFrom: '#9B6FB5',
        gradientTo: '#5A3D6E',
        headerBg: 'linear-gradient(to right, #9B6FB5, #5A3D6E)',
    },
}

const gradientFrom = computed(() => colorConfig[props.color].gradientFrom)
const gradientTo = computed(() => colorConfig[props.color].gradientTo)
const headerBg = computed(() => colorConfig[props.color].headerBg)
</script>

<template>
    <div class="flex items-stretch">
        <!-- Content Box - white with gradient bar on left -->
        <div
            class="relative w-full max-w-[420px] min-w-[280px] flex rounded-2xl overflow-hidden border border-gray-300"
        >
            <!-- Gradient bar on left -->
            <div
                class="w-6 shrink-0"
                :style="{
                    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
                }"
            ></div>

            <!-- Content area -->
            <div class="flex-1 bg-white">
                <!-- Header with category and title -->
                <div
                    class="text-white py-3 px-5 text-center"
                    :style="{ background: headerBg }"
                >
                    <div class="text-xs font-medium opacity-90">{{ category }}</div>
                    <div class="text-xl font-bold">{{ title }}</div>
                </div>

                <!-- Content -->
                <div class="py-4 px-5 text-gray-700 text-sm">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
