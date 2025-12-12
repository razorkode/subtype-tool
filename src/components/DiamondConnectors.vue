<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const svgContainer = ref(null)
const connectors = ref([])
const svgWidth = ref(800)
const svgHeight = ref(1000)

// Define connector configurations with colors
const connectorConfig = [
    {
        id: 'tear-film',
        color: '#3AADE1', // Blue
        startY: 120, // Top diamond position
        endY: 80, // First content box position
    },
    {
        id: 'eyelid',
        color: '#52A5A4', // Teal
        startY: 500, // Middle diamond position
        endY: 420, // Second content box position
    },
    {
        id: 'ocular',
        color: '#7B5295', // Purple
        startY: 880, // Bottom diamond position
        endY: 820, // Third content box position
    },
]

const calculateConnectors = () => {
    if (!svgContainer.value) return

    const rect = svgContainer.value.getBoundingClientRect()
    svgWidth.value = rect.width
    svgHeight.value = rect.height

    connectors.value = connectorConfig.map((config) => {
        // Start from left edge (where diamonds end)
        const startX = 20
        const startY = config.startY

        // End at right edge (where content boxes start)
        const endX = svgWidth.value - 20
        const endY = config.endY

        // Calculate control points for smooth Bezier curve
        const controlPoint1X = startX + (endX - startX) * 0.35
        const controlPoint1Y = startY
        const controlPoint2X = startX + (endX - startX) * 0.65
        const controlPoint2Y = endY

        // Create SVG path
        const path = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`

        return {
            ...config,
            startX,
            startY,
            endX,
            endY,
            path,
        }
    })
}

onMounted(() => {
    nextTick(() => {
        setTimeout(calculateConnectors, 100)
    })
    window.addEventListener('resize', calculateConnectors)
})

onUnmounted(() => {
    window.removeEventListener('resize', calculateConnectors)
})
</script>

<template>
    <svg
        ref="svgContainer"
        class="absolute pointer-events-none"
        style="z-index: 10"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="none"
    >
        <!-- Draw connector lines -->
        <g v-for="connector in connectors" :key="connector.id">
            <!-- Main curved line -->
            <path
                :d="connector.path"
                stroke="#D1D5DB"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
                opacity="0.9"
            />

            <!-- Connection point circles at start -->
            <circle
                :cx="connector.startX"
                :cy="connector.startY"
                r="7"
                :fill="connector.color"
                stroke="white"
                stroke-width="2.5"
            />
            <circle
                :cx="connector.startX"
                :cy="connector.startY"
                r="8.75"
                fill="none"
                stroke="#D1D5DB"
                stroke-width="1.5"
            />
            <!-- Connection point circles at end -->
            <circle
                :cx="connector.endX"
                :cy="connector.endY"
                r="7"
                :fill="connector.color"
                stroke="white"
                stroke-width="2.5"
            />
            <circle
                :cx="connector.endX"
                :cy="connector.endY"
                r="8.75"
                fill="none"
                stroke="#D1D5DB"
                stroke-width="1.5"
            />
        </g>
    </svg>
</template>
