<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'teal', 'purple'].includes(value),
    },
    items: {
        type: Array,
        default: () => [],
    },
})

const colorClasses = computed(() => {
    const colors = {
        blue: {
            text: 'text-[#3AADE1]',
            border: 'border-[#3AADE1] bg-[#3AADE1]',
        },
        teal: {
            text: 'text-[#52A5A4]',
            border: 'border-[#52A5A4] bg-[#52A5A4]',
        },
        purple: {
            text: 'text-[#7B5295]',
            border: 'border-[#7B5295] bg-[#7B5295]',
        },
    }
    return colors[props.color]
})
</script>

<template>
    <div class="mb-4">
        <!-- Section header with lines -->
        <div class="flex items-center gap-2 mb-3">
            <div class="flex-1 h-[1px]" :class="colorClasses.border"></div>
            <span class="font-bold text-xs tracking-wide" :class="colorClasses.text">{{
                title
            }}</span>
            <div
                class="flex-1 h-[1px]"
                :class="colorClasses.border"
                :style="{ background: colorClasses.bg }"
            ></div>
        </div>

        <!-- Testing items -->
        <div class="space-y-3 text-center">
            <div v-for="(item, index) in items" :key="index">
                <div class="font-bold text-sm text-[#6D6E71]">{{ item.name }}</div>
                <div v-if="item.description || item.refs" class="text-xs text-gray-500">
                    {{ item.description }}{{ item.refs ? ' ' + item.refs.join(', ') : '' }}
                </div>
            </div>
        </div>
    </div>
</template>
