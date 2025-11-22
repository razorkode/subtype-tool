<script setup>
defineProps({
    variant: {
        type: String,
        default: 'cyan',
        validator: (value) => ['cyan', 'teal', 'purple', 'gray', 'blue'].includes(value),
    },
    active: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <button
        class="cursor-pointer border-3 transition-all duration-300 hover:opacity-90 hover:shadow-lg w-60 h-9 flex items-center justify-center rounded-full font-normal text-xs"
        :class="[
            active ? 'border-blue-800' : 'border-transparent hover:border-blue-300',
            {
                'bg-[linear-gradient(to_right,#05ADEE,#68CCF4,#05ADEE)] text-white':
                    variant === 'cyan',
                'bg-[linear-gradient(to_right,#027583,#66AAB4,#027583)] text-white':
                    variant === 'teal',
                'bg-[linear-gradient(to_right,#4F0F79,#936EAC,#4F0F79)] text-white':
                    variant === 'purple',
                'bg-[linear-gradient(to_right,#E5E6E7,#FBFBFB,#E5E6E7)] text-[#05319B] font-semibold':
                    variant === 'gray',
                'bg-blue-800 text-white': variant === 'blue',
            },
        ]"
    >
        <slot />
    </button>
</template>
