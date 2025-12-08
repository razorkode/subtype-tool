<script setup>
import DiamondButton from '@/components/DiamondButton.vue'
import { useNavigationStore } from '@/stores/navigation'
import tearDiamond from '@/assets/images/tear-diamond.png'
import eyelidDiamond from '@/assets/images/eyelid-diamond.png'
import ocularDiamond from '@/assets/images/ocular-diamond.png'

const navigationStore = useNavigationStore()

const handleDiamondClick = (menuId) => {
    navigationStore.setActiveMenuItem(menuId)
}
</script>

<template>
    <div class="w-[400px] h-[400px]">
        <div class="top-1/2 relative flex min-w-[380px] items-center justify-center">
            <!-- Text Block -->
            <div class="absolute left-[20px] text-gray-500 leading-tight">
                <span class="font-bold">DRY EYE RELIEF</span><br />& MANAGEMENT
            </div>

            <!-- Tear Film Deficiencies -->
            <DiamondButton
                :image="tearDiamond"
                label="TEAR FILM<br />DEFICIENCIES"
                position="top"
                menu-id="tear-film-deficiencies"
                :active="
                    !navigationStore.activeMenuItem ||
                    navigationStore.activeMenuItem === 'tear-film-deficiencies'
                "
                @click="handleDiamondClick"
            />

            <!-- Eyelid Anomalies -->
            <DiamondButton
                :image="eyelidDiamond"
                label="EYELID<br />ANOMALIES"
                position="right"
                menu-id="eyelid-anomalies"
                :active="
                    !navigationStore.activeMenuItem ||
                    navigationStore.activeMenuItem === 'eyelid-anomalies'
                "
                @click="handleDiamondClick"
            />

            <!-- Ocular Surface Abnormalities -->
            <DiamondButton
                :image="ocularDiamond"
                label="OCULAR SURFACE<br />ABNORMALITIES"
                position="bottom"
                menu-id="ocular-surface-abnormalities"
                :active="
                    !navigationStore.activeMenuItem ||
                    navigationStore.activeMenuItem === 'ocular-surface-abnormalities'
                "
                @click="handleDiamondClick"
            />
        </div>
    </div>
</template>
