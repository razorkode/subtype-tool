<script setup>
import { computed } from 'vue'
import CheckboxItem from './CheckboxItem.vue'
import eyeIcon from '@/assets/images/eye-icon.png'

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
            <img :src="eyeIcon" alt="Eye icon" class="w-16 h-16 object-contain" />
        </div>

        <div class="border-2 rounded-b-3xl relative mt-8 z-10" :class="colorClasses.border">
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
