<script setup>
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()
</script>

<template>
    <div class="border w-[420px] h-[420px]">
        <div class="top-1/2 relative flex min-w-[420px] items-center justify-center">
            <!-- Text Block -->
            <div class="absolute left-0 text-gray-500 leading-tight">
                <span class="font-bold">DRY EYE RELIEF</span><br />& MANAGEMENT
            </div>

            <!-- Tear Film Deficiencies -->
            <div
                class="absolute top-[-100px] text-center"
                :class="{
                    'text-blue-800': navigationStore.activeMenuItem === 'tear-film-deficiencies',
                }"
            >
                TEAR FILM<br />DEFICIENCIES
            </div>

            <!-- Eyelid Anomalies -->
            <div
                class="absolute right-0 text-center"
                :class="{ 'text-blue-800': navigationStore.activeMenuItem === 'eyelid-anomalies' }"
            >
                EYELID<br />ANOMALIES
            </div>

            <!-- Ocular Surface Abnormalities -->
            <div
                class="absolute bottom-[-100px] text-center"
                :class="{
                    'text-blue-800':
                        navigationStore.activeMenuItem === 'ocular-surface-abnormalities',
                }"
            >
                OCULAR SURFACE<br />ABNORMALITIES
            </div>
        </div>
    </div>
</template>
