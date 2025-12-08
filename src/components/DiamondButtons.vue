<script setup>
import { useNavigationStore } from '@/stores/navigation'
import tearDiamond from '@/assets/images/tear-diamond.png'
import eyelidDiamond from '@/assets/images/eyelid-diamond.png'
import ocularDiamond from '@/assets/images/ocular-diamond.png'

const navigationStore = useNavigationStore()
</script>

<template>
    <div class="w-[400px] h-[400px]">
        <div class="top-1/2 relative flex min-w-[380px] items-center justify-center">
            <!-- Text Block -->
            <div class="absolute left-[20px] text-gray-500 leading-tight">
                <span class="font-bold">DRY EYE RELIEF</span><br />& MANAGEMENT
            </div>

            <!-- Tear Film Deficiencies -->
            <div
                class="absolute top-[-174px] text-center h-[170px] w-[164px] bg-no-repeat bg-cover"
                :class="{
                    'text-blue-800': navigationStore.activeMenuItem === 'tear-film-deficiencies',
                }"
                :style="{
                    backgroundImage: `url(${tearDiamond})`,
                }"
            >
                <div
                    class="absolute top-[80px] font-semibold text-xs text-center w-full leading-tight"
                >
                    TEAR FILM<br />DEFICIENCIES
                </div>
            </div>

            <!-- Eyelid Anomalies -->
            <div
                class="absolute right-[10px] text-center h-[170px] w-[164px] bg-no-repeat bg-cover"
                :class="{
                    'text-blue-800': navigationStore.activeMenuItem === 'eyelid-anomalies',
                }"
                :style="{
                    backgroundImage: `url(${eyelidDiamond})`,
                }"
            >
                <div
                    class="absolute top-[80px] font-semibold text-xs text-center w-full leading-tight"
                >
                    EYELID<br />ANOMALIES
                </div>
            </div>

            <!-- Ocular Surface Abnormalities -->
            <div
                class="absolute bottom-[-174px] text-center h-[170px] w-[164px] bg-no-repeat bg-cover"
                :class="{
                    'text-blue-800':
                        navigationStore.activeMenuItem === 'ocular-surface-abnormalities',
                }"
                :style="{
                    backgroundImage: `url(${ocularDiamond})`,
                }"
            >
                <div
                    class="absolute top-[78px] font-semibold text-xs text-center w-full leading-tight"
                >
                    OCULAR SURFACE<br />ABNORMALITIES
                </div>
            </div>
        </div>
    </div>
</template>
