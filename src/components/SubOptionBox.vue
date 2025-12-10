<script setup>
import ContentBox from '@/components/ContentBox.vue'
import emailIcon from '@/assets/images/email-icon.png'

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

const emit = defineEmits(['email', 'previous', 'next'])

const handleEmail = () => {
    emit('email')
}

const handlePrevious = () => {
    emit('previous')
}

const handleNext = () => {
    emit('next')
}
</script>

<template>
    <div class="relative">
        <ContentBox :color="color" show-top-tab show-bottom-tab>
            <template #tab>
                <div class="flex flex-col items-center justify-center">
                    <span class="text-xs font-medium opacity-90">{{ category }}</span>
                    <span class="text-xl font-bold leading-5">{{ title }}</span>
                </div>
            </template>
            <slot></slot>
            <template #bottomTab>
                <!-- Email button only - centered in the blue tab -->
                <button
                    @click="handleEmail"
                    class="flex flex-col items-center text-white hover:opacity-80 transition-opacity"
                >
                    <img :src="emailIcon" alt="Email" class="w-14 h-14 object-contain ml-2" />
                    <span class="text-[10px] font-bold tracking-wider">EMAIL</span>
                </button>
            </template>
        </ContentBox>

        <!-- Navigation buttons - positioned to align text labels with EMAIL text -->
        <div
            class="absolute w-[310px] mx-auto -bottom-[22px] left-0 right-0 flex justify-between px-4 h-[105px] pointer-events-none"
        >
            <!-- Previous button - left side, outside blue tab -->
            <button
                @click="handlePrevious"
                class="min-w-[52px] flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors pointer-events-auto"
            >
                <span class="text-2xl mb-1 leading-5">←</span>
                <span class="text-[10px] font-medium tracking-wide">PREVIOUS</span>
            </button>

            <!-- Spacer for the center email button area -->
            <div class="w-[233px]"></div>

            <!-- Next button - right side, outside blue tab -->
            <button
                @click="handleNext"
                class="min-w-[52px] flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors pointer-events-auto"
            >
                <span class="text-2xl mb-1 leading-5">→</span>
                <span class="text-[10px] font-medium tracking-wide">NEXT</span>
            </button>
        </div>
    </div>
</template>
