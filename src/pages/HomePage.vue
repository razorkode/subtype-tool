<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
    <div class="max-w-3xl mx-auto p-8">
        <h1 class="text-4xl font-bold text-slate-800 mb-4">Welcome to Subtype Tool</h1>
        <p class="text-lg text-slate-600">This is the home page with a Pinia counter demo.</p>

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
    </div>
</template>
