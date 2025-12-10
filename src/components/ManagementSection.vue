<script setup>
import { computed } from 'vue'
import CheckboxItem from './CheckboxItem.vue'

const props = defineProps({
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

const emit = defineEmits(['update:items'])

const colorClasses = computed(() => {
    const colors = {
        blue: {
            bg: 'bg-gradient-to-r from-[#3AADE1] to-[#05319B]',
            border: 'border-[#3AADE1]',
        },
        teal: {
            bg: 'bg-gradient-to-r from-[#52A5A4] to-[#2D5A59]',
            border: 'border-[#52A5A4]',
        },
        purple: {
            bg: 'bg-gradient-to-r from-[#9B6FB5] to-[#5A3D6E]',
            border: 'border-[#9B6FB5]',
        },
    }
    return colors[props.color]
})

const toggleItem = (index) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], checked: !newItems[index].checked }
    emit('update:items', newItems)
}
</script>

<template>
    <div>
        <!-- Eye icon -->
        <div class="flex justify-center my-4">
            <div
                class="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center"
            >
                <svg
                    class="w-10 h-10 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <!-- Heart in center -->
                    <path
                        fill="currentColor"
                        d="M12 13.5l-1.5-1.5c-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0l-.3.3-.3-.3c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.8L12 13.5z"
                    />
                </svg>
            </div>
        </div>

        <div class="border-2 rounded-b-3xl relative mt-8" :class="colorClasses.border">
            <!-- Management header banner -->
            <div
                class="absolute -top-[19px] left-1/2 transform -translate-x-1/2 w-[70%] py-2 px-4"
                :class="colorClasses.bg"
            >
                <div class="text-white text-center font-bold text-sm tracking-wide">
                    DRY EYE DISEASE MANAGEMENT
                </div>
            </div>

            <!-- Checkbox items -->
            <div class="space-y-2 p-6 pt-10">
                <CheckboxItem
                    v-for="(item, index) in items"
                    :key="index"
                    :checked="item.checked"
                    :label="item.label"
                    :description="item.description"
                    @update:checked="toggleItem(index)"
                />
            </div>
        </div>
    </div>
</template>
