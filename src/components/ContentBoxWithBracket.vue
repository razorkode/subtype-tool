<script setup>
import { computed, ref, onMounted, nextTick } from 'vue'

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

const boxRef = ref(null)
const boxHeight = ref(140)

onMounted(() => {
    nextTick(() => {
        if (boxRef.value) {
            boxHeight.value = boxRef.value.offsetHeight
        }
    })
})
</script>

<template>
    <div class="flex items-stretch">
        <!-- Bracket SVG (left side of box) -->
        <svg
            width="40"
            :height="boxHeight"
            class="shrink-0"
            :viewBox="`0 0 40 ${boxHeight}`"
            style="margin-right: -2px"
        >
            <!-- Bracket - curved line bulging outward -->
            <path
                :d="`M 40 8
                     Q 15 8, 10 30
                     L 10 ${boxHeight - 30}
                     Q 15 ${boxHeight - 8}, 40 ${boxHeight - 8}`"
                :stroke="lineColor"
                stroke-width="2"
                fill="none"
            />

            <!-- Single bracket circle - position based on bracketConnect -->
            <circle
                v-if="bracketConnect === 'top'"
                cx="10"
                cy="30"
                r="5"
                :fill="lineColor"
                stroke="white"
                stroke-width="2"
            />
            <circle
                v-else
                cx="10"
                :cy="boxHeight - 30"
                r="5"
                :fill="lineColor"
                stroke="white"
                stroke-width="2"
            />
        </svg>

        <!-- Content Box -->
        <div
            ref="boxRef"
            class="relative flex-1 min-w-[280px] bg-white border-2 border-gray-300 border-l-0 rounded-r-2xl py-4 px-5"
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
