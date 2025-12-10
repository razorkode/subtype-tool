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
    blue: '#3AADE1',
    teal: '#52A5A4',
    purple: '#7B5295',
}

const lineColor = computed(() => colorConfig[props.color])
</script>

<template>
    <div class="flex items-stretch">
        <!-- Bracket container - stretches to match box height -->
        <div class="relative shrink-0 w-[30px]" style="margin-right: -8px;">
            <!-- Top curve -->
            <svg
                class="absolute top-0 left-0"
                width="30"
                height="15"
                viewBox="0 0 30 15"
                style="transform: translateY(-100%);"
            >
                <path
                    d="M 30 0 Q 10 0, 8 15"
                    :stroke="lineColor"
                    stroke-width="2"
                    fill="none"
                />
            </svg>

            <!-- Straight line - stretches with content -->
            <div
                class="absolute left-[7px] top-0 bottom-0 w-[2px]"
                :style="{ backgroundColor: lineColor }"
            ></div>

            <!-- Circle in middle -->
            <svg
                class="absolute left-0 top-1/2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                style="transform: translateY(-50%);"
            >
                <circle
                    cx="8"
                    cy="8"
                    r="5"
                    :fill="lineColor"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>

            <!-- Bottom curve -->
            <svg
                class="absolute bottom-0 left-0"
                width="30"
                height="15"
                viewBox="0 0 30 15"
                style="transform: translateY(100%);"
            >
                <path
                    d="M 8 0 Q 10 15, 30 15"
                    :stroke="lineColor"
                    stroke-width="2"
                    fill="none"
                />
            </svg>
        </div>

        <!-- Content Box - plain white with border radius on all sides, responsive width -->
        <div
            class="relative w-full max-w-[380px] min-w-[280px] bg-white border-2 border-gray-300 rounded-2xl py-4 px-5"
        >
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
</template>
