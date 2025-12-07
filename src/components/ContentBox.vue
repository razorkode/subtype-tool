<script setup>
import { computed } from 'vue'
import blueTopBar from '@/assets/blue-top-bar.png'
import blueBottomBar from '@/assets/blue-bottom-bar.png'
import greyTopBar from '@/assets/grey-top-bar.png'
import purpleTopBar from '@/assets/purple-top-bar.png'
import purpleBottomBar from '@/assets/purple-bottom-bar.png'
import tealTopBar from '@/assets/teal-top-bar.png'
import tealBottomBar from '@/assets/teal-bottom-bar.png'

const props = defineProps({
    color: {
        type: String,
        default: 'grey',
        validator: (value) => ['blue', 'grey', 'purple', 'teal'].includes(value),
    },
    showBottomTab: {
        type: Boolean,
        default: false,
    },
})

const topBarImages = {
    blue: blueTopBar,
    grey: greyTopBar,
    purple: purpleTopBar,
    teal: tealTopBar,
}

const bottomBarImages = {
    blue: blueBottomBar,
    purple: purpleBottomBar,
    teal: tealBottomBar,
}

const topBarImage = computed(() => topBarImages[props.color])
const bottomBarImage = computed(() => bottomBarImages[props.color])
</script>

<template>
    <div class="grow min-w-[460px]">
        <div class="relative">
            <!-- Tab at top -->
            <div
                class="absolute -top-[14px] bg-contain bg-center w-[233px] h-[115px] left-1/2 transform -translate-x-1/2"
                :style="{
                    backgroundImage: `url(${topBarImage})`,
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <div
                    class="text-[#05319B] font-bold text-lg mx-10 leading-tight h-[105px] flex items-center justify-center text-center"
                >
                    <slot name="tab">HOW<br />TO USE</slot>
                </div>
            </div>

            <!-- Main content box -->
            <div
                class="border-4 border-gray-300 rounded-3xl p-8 bg-white min-h-[420px] pt-[110px]"
                :class="{ 'pb-[110px]': showBottomTab }"
            >
                <slot></slot>
            </div>

            <!-- Tab at bottom -->
            <div
                v-if="showBottomTab"
                class="absolute -bottom-[28px] bg-contain bg-center w-[233px] h-[115px] left-1/2 transform -translate-x-1/2"
                :style="{
                    backgroundImage: `url(${bottomBarImage})`,
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <div
                    class="text-[#05319B] font-bold text-lg mx-10 leading-tight h-[105px] flex items-center justify-center text-center"
                >
                    <slot name="bottomTab"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
