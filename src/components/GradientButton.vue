<script setup>
defineProps({
    variant: {
        type: String,
        default: 'cyan',
        validator: (value) => ['cyan', 'teal', 'purple', 'gray', 'blue'].includes(value),
    },
})
</script>

<template>
    <button
        :class="[
            'rounded-full font-normal text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg w-73.5 h-11 flex items-center justify-center',
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
