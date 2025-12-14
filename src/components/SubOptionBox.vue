<script setup>
import ContentBox from '@/components/ContentBox.vue'
import emailIcon from '@/assets/images/email-icon.png'

const props = defineProps({
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
    disablePrevious: {
        type: Boolean,
        default: false,
    },
    disableNext: {
        type: Boolean,
        default: false,
    },
    disableEmail: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['email', 'previous', 'next'])

const handleEmail = () => {
    if (!props.disableEmail) {
        emit('email')
    }
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
                    :disabled="disableEmail"
                    class="flex flex-col items-center text-white transition-opacity"
                    :class="
                        disableEmail
                            ? 'opacity-40 cursor-not-allowed'
                            : 'cursor-pointer hover:opacity-80'
                    "
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
                :disabled="disablePrevious"
                class="min-w-[52px] flex flex-col items-center justify-center transition-colors pointer-events-auto"
                :class="
                    disablePrevious
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 cursor-pointer'
                "
            >
                <span class="text-2xl mb-1 leading-5">←</span>
                <span class="text-[10px] font-medium tracking-wide">PREVIOUS</span>
            </button>

            <!-- Spacer for the center email button area -->
            <div class="w-[233px]"></div>

            <!-- Next button - right side, outside blue tab -->
            <button
                @click="handleNext"
                :disabled="disableNext"
                class="min-w-[52px] flex flex-col items-center justify-center transition-colors pointer-events-auto"
                :class="
                    disableNext
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 cursor-pointer'
                "
            >
                <span class="text-2xl mb-1 leading-5">→</span>
                <span class="text-[10px] font-medium tracking-wide">NEXT</span>
            </button>
        </div>
    </div>
</template>
