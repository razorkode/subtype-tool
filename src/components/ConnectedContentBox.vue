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
    // Which circle the connector line connects to: 'top' or 'bottom'
    connectTo: {
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
        <!-- Connector + Bracket SVG -->
        <svg 
            width="120" 
            :height="boxHeight" 
            class="shrink-0"
            :viewBox="`0 0 120 ${boxHeight}`"
            style="margin-right: -2px;"
        >
            <!-- Curved connector line -->
            <path
                v-if="connectTo === 'top'"
                :d="`M 0 ${boxHeight / 2} 
                     C 30 ${boxHeight / 2}, 50 ${boxHeight / 2}, 60 20
                     L 80 20`"
                :stroke="lineColor"
                stroke-width="2"
                fill="none"
            />
            <path
                v-else
                :d="`M 0 ${boxHeight / 2} 
                     C 30 ${boxHeight / 2}, 50 ${boxHeight / 2}, 60 ${boxHeight - 20}
                     L 80 ${boxHeight - 20}`"
                :stroke="lineColor"
                stroke-width="2"
                fill="none"
            />
            
            <!-- Bracket - curved line bulging outward on left of box -->
            <path
                :d="`M 120 10 
                     Q 90 10, 80 20
                     L 80 ${boxHeight - 20}
                     Q 90 ${boxHeight - 10}, 120 ${boxHeight - 10}`"
                :stroke="lineColor"
                stroke-width="2"
                fill="none"
            />
            
            <!-- Start dot (left side of connector) -->
            <circle 
                cx="0" 
                :cy="boxHeight / 2" 
                r="5" 
                :fill="lineColor" 
                stroke="white" 
                stroke-width="2" 
            />
            
            <!-- Top bracket circle -->
            <circle 
                cx="80" 
                cy="20" 
                r="5" 
                :fill="lineColor" 
                stroke="white" 
                stroke-width="2" 
            />
            
            <!-- Bottom bracket circle -->
            <circle 
                cx="80" 
                :cy="boxHeight - 20" 
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
