<script setup>
import ContentBox from '@/components/ContentBox.vue'

defineProps({
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'teal', 'purple'].includes(value),
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <ContentBox :color="color" show-top-tab show-bottom-tab>
        <template #tab>
            <div class="flex flex-col items-center justify-center">
                <span class="text-xs font-medium opacity-90">{{ category }}</span>
                <span class="text-xl font-bold">{{ title }}</span>
            </div>
        </template>
        <slot></slot>
        <template #bottomTab></template>
    </ContentBox>
</template>
