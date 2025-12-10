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
            <span class="text-xs font-medium opacity-90">{{ category }}</span
            ><br />
            {{ title }}
        </template>
        <slot></slot>
        <template #bottomTab></template>
    </ContentBox>
</template>
