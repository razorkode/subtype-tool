<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'teal', 'purple'].includes(value),
    },
    title: {
        type: String,
        required: true,
    },
    bracketConnect: {
        type: String,
        default: 'top',
        validator: (value) => ['top', 'bottom'].includes(value),
    },
})

const colorConfig = {
    blue: {
        line: '#3AADE1',
        gradientFrom: '#3AADE1',
        gradientTo: '#05319B',
    },
    teal: {
        line: '#52A5A4',
        gradientFrom: '#52A5A4',
        gradientTo: '#2D5A59',
    },
    purple: {
        line: '#7B5295',
        gradientFrom: '#9B6FB5',
        gradientTo: '#5A3D6E',
    },
}

const lineColor = computed(() => colorConfig[props.color].line)
const gradientFrom = computed(() => colorConfig[props.color].gradientFrom)
const gradientTo = computed(() => colorConfig[props.color].gradientTo)
</script>

<template>
    <div class="flex items-stretch">
        <!-- Bracket container - stretches to match box height -->
        <div class="relative shrink-0 w-[30px]" style="margin-right: -8px">
            <!-- Top curve -->
            <svg
                class="absolute top-0 left-0"
                width="30"
                height="15"
                viewBox="0 0 30 15"
                style="transform: translateY(-100%)"
            >
                <path d="M 30 0 Q 10 0, 8 15" stroke="#6B7280" stroke-width="2" fill="none" />
            </svg>

            <!-- Straight line - stretches with content -->
            <div
                class="absolute left-[7px] top-0 bottom-0 w-[2px]"
                style="background-color: #6b7280"
            ></div>

            <!-- Circle in middle -->
            <svg
                class="absolute left-0 top-1/2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style="transform: translateY(-50%)"
            >
                <circle cx="10" cy="10" r="5" :fill="lineColor" stroke="white" stroke-width="2" />
                <circle cx="10" cy="10" r="6.5" fill="none" stroke="#6B7280" stroke-width="1" />
            </svg>

            <!-- Bottom curve -->
            <svg
                class="absolute bottom-0 left-0"
                width="30"
                height="15"
                viewBox="0 0 30 15"
                style="transform: translateY(100%)"
            >
                <path d="M 8 0 Q 10 15, 30 15" stroke="#6B7280" stroke-width="2" fill="none" />
            </svg>
        </div>

        <!-- Content Box - white with gradient bar on left -->
        <div
            class="relative w-full max-w-[380px] min-w-[234px] flex rounded-2xl overflow-hidden border border-gray-300"
        >
            <!-- Gradient bar on left -->
            <div
                class="w-6 shrink-0"
                :style="{
                    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
                }"
            ></div>

            <!-- Content area -->
            <div class="flex-1 bg-white py-4 px-5">
                <!-- Title -->
                <h3 class="font-bold text-[#05319B] text-sm mb-3">
                    <span class="border-b-2 border-[#05319B] pb-0.5">{{ title }}</span>
                </h3>

                <!-- Content -->
                <div class="text-gray-700 text-sm">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
