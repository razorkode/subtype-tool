<script setup>
import { useCounterStore } from '@/stores/counter'
import GradientButton from '@/components/GradientButton.vue'

const counterStore = useCounterStore()
</script>

<template>
    <div class="max-w-3xl mx-auto p-8">
        <div class="mt-12">
            <h2 class="text-2xl font-semibold text-emerald-600 mb-6">Pinia Counter Demo</h2>
            <div class="bg-slate-50 border-2 border-emerald-500 rounded-lg p-8 text-center">
                <p class="text-xl my-2">
                    Count: <strong>{{ counterStore.count }}</strong>
                </p>
                <p class="text-xl my-2">
                    Double Count: <strong>{{ counterStore.doubleCount }}</strong>
                </p>
                <button
                    @click="counterStore.increment"
                    class="mt-4 px-8 py-3 text-base bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                >
                    Increment Counter
                </button>
            </div>
        </div>

        <div class="mt-12">
            <h2 class="text-2xl font-semibold text-emerald-600 mb-6">Gradient Button Styles</h2>
            <div class="bg-slate-50 border-2 border-emerald-500 rounded-lg p-8">
                <div class="flex flex-col gap-4 items-center">
                    <GradientButton variant="cyan"> Cyan Gradient </GradientButton>
                    <GradientButton variant="teal"> Teal Gradient </GradientButton>
                    <GradientButton variant="purple"> Purple Gradient </GradientButton>
                    <GradientButton variant="purple">
                        <div class="text-center leading-[1.1rem]">
                            <div>Ocular surface cellular</div>
                            <div>damage / disruption</div>
                        </div>
                    </GradientButton>
                    <GradientButton variant="gray"> Gray Gradient </GradientButton>
                    <GradientButton variant="blue"> Solid Blue </GradientButton>
                </div>
            </div>
        </div>
    </div>
</template>
