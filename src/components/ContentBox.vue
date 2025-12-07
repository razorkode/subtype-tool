<script setup>
import greyTopBar from '@/assets/grey-top-bar.png'
</script>

<template>
    <div class="grow min-w-[460px]">
        <div class="relative">
            <!-- Tab at top -->
            <div
                class="absolute -top-[14px] bg-contain bg-center w-[233px] h-[115px] left-1/2 transform -translate-x-1/2"
                :style="{
                    backgroundImage: `url(${greyTopBar})`,
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <div
                    class="text-[#05319B] font-bold text-sm mx-10 h-[105px] flex items-center justify-center"
                >
                    <slot name="tab">HOW<br />TO USE</slot>
                </div>
            </div>

            <!-- Main content box -->
            <div class="border-4 border-gray-300 rounded-3xl p-8 bg-white min-h-[420px] pt-[110px]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
