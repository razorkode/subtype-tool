<script setup>
import { computed } from 'vue'
import blueTopBar from '@/assets/images/blue-top-bar.png'
import blueBottomBar from '@/assets/images/blue-bottom-bar.png'
import greyTopBar from '@/assets/images/grey-top-bar.png'
import purpleTopBar from '@/assets/images/purple-top-bar.png'
import purpleBottomBar from '@/assets/images/purple-bottom-bar.png'
import tealTopBar from '@/assets/images/teal-top-bar.png'
import tealBottomBar from '@/assets/images/teal-bottom-bar.png'

const props = defineProps({
    color: {
        type: String,
        default: 'grey',
        validator: (value) => ['blue', 'grey', 'purple', 'teal'].includes(value),
    },
    showTopTab: {
        type: Boolean,
        default: false,
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

// Text color: white for colored tabs, dark blue for grey
const tabTextColor = computed(() => (props.color === 'grey' ? 'text-[#05319B]' : 'text-white'))
</script>

<template>
    <div class="grow min-w-[300px] max-w-[520px] w-full">
        <div class="relative">
            <!-- Tab at top -->
            <div
                v-if="showTopTab"
                class="absolute -top-[14px] bg-contain bg-center bg-no-repeat w-[233px] h-[115px] left-1/2 transform -translate-x-1/2"
                :style="{
                    backgroundImage: `url(${topBarImage})`,
                }"
            >
                <div
                    class="font-bold text-lg mx-10 leading-tight h-[105px] flex items-center justify-center text-center"
                    :class="tabTextColor"
                >
                    <slot name="tab">HOW<br />TO USE</slot>
                </div>
            </div>

            <!-- Main content box -->
            <div
                class="border-2 border-[#ABABAB] rounded-3xl p-8 bg-white min-h-[540px]"
                :class="{ 'pt-[110px]': showTopTab, 'pb-[110px]': showBottomTab }"
            >
                <slot></slot>
            </div>

            <!-- Tab at bottom -->
            <div
                v-if="showBottomTab"
                class="absolute -bottom-[28px] bg-no-repeat bg-contain bg-center w-[233px] h-[115px] left-1/2 transform -translate-x-1/2"
                :style="{
                    backgroundImage: `url(${bottomBarImage})`,
                }"
            >
                <div
                    class="font-bold text-lg mx-10 leading-tight h-[105px] flex items-center justify-center text-center"
                    :class="tabTextColor"
                >
                    <slot name="bottomTab"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
