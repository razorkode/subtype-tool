<script setup>
defineProps({
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        default: 'top',
        validator: (value) => ['top', 'right', 'bottom'].includes(value),
    },
    active: {
        type: Boolean,
        default: false,
    },
    menuId: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['click'])

const positionClasses = {
    top: 'top-[-174px]',
    right: 'right-[10px]',
    bottom: 'bottom-[-174px]',
}

const textTopPosition = {
    top: 'top-[80px]',
    right: 'top-[80px]',
    bottom: 'top-[78px]',
}
</script>

<template>
    <div
        class="absolute text-center h-[170px] w-[164px] bg-no-repeat bg-cover cursor-pointer transition-all duration-300 hover:opacity-90"
        :class="[
            positionClasses[position],
            {
                'text-blue-800': active,
                'grayscale opacity-60': !active,
            },
        ]"
        :style="{
            backgroundImage: `url(${image})`,
        }"
        @click="emit('click', menuId)"
    >
        <div
            class="absolute font-semibold text-xs text-center w-full leading-tight"
            :class="textTopPosition[position]"
            v-html="label"
        ></div>
    </div>
</template>
