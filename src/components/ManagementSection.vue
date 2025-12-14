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

const toggleSubItem = (parentIndex, subIndex) => {
    const newItems = [...props.items]
    const newSubOptions = [...newItems[parentIndex].subOptions]
    newSubOptions[subIndex] = {
        ...newSubOptions[subIndex],
        checked: !newSubOptions[subIndex].checked,
    }
    newItems[parentIndex] = { ...newItems[parentIndex], subOptions: newSubOptions }
    emit('update:items', newItems)
}

const hasSubOptions = (item) => {
    return item.subOptions && item.subOptions.length > 0
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

            <!-- Checkbox items - wrapper clips scrollbar to border radius -->
            <div class="rounded-b-[22px] overflow-hidden">
                <div class="space-y-2 p-6 pt-10 max-h-[280px] overflow-y-auto">
                    <template v-for="(item, index) in items" :key="index">
                        <CheckboxItem
                            :checked="item.checked"
                            :label="item.label"
                            :description="item.description"
                            @update:checked="toggleItem(index)"
                        />
                        <!-- Sub-options that expand when parent is checked -->
                        <div
                            v-if="hasSubOptions(item) && item.checked"
                            class="pl-8 space-y-2 border-l-2 border-gray-200 ml-2 mt-1"
                        >
                            <CheckboxItem
                                v-for="(subItem, subIndex) in item.subOptions"
                                :key="subIndex"
                                :checked="subItem.checked"
                                :label="subItem.label"
                                :description="subItem.description"
                                @update:checked="toggleSubItem(index, subIndex)"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
