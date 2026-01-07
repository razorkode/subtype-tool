<script setup>
import { computed } from 'vue'

const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:checked'])

const toggle = () => {
    emit('update:checked', !props.checked)
}
</script>

<template>
    <button
        @click="toggle"
        class="flex items-start gap-3 text-left w-full hover:bg-gray-50 rounded p-1 -ml-1 transition-colors"
    >
        <!-- Checkbox -->
        <div
            class="w-5 h-5 mt-0.5 shrink-0 border-2 border-[#05319B] rounded-sm flex items-center justify-center transition-colors"
            :class="checked ? 'bg-[#05319B]' : 'bg-white'"
        >
            <svg
                v-if="checked"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </div>

        <!-- Label and description -->
        <div class="flex-1">
            <div class="font-bold text-sm text-[#193BB8]">{{ label }}</div>
            <div v-if="description" class="text-xs text-gray-500">{{ description }}</div>
        </div>
    </button>
</template>
