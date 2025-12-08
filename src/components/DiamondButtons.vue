<script setup>
import { computed } from 'vue'
import DiamondButton from '@/components/DiamondButton.vue'
import { useNavigationStore } from '@/stores/navigation'
import tearDiamond from '@/assets/images/tear-diamond.png'
import eyelidDiamond from '@/assets/images/eyelid-diamond.png'
import ocularDiamond from '@/assets/images/ocular-diamond.png'

const navigationStore = useNavigationStore()

// Define parent-child relationships
const tearFilmItems = ['tear-film-deficiencies', 'lipid', 'aqueous', 'mucin-glycocalyx']
const eyelidItems = ['eyelid-anomalies', 'blink-lid-closure', 'lid-margin']
const ocularSurfaceItems = [
    'ocular-surface-abnormalities',
    'anatomical-misalignment',
    'neural-dysfunction',
    'ocular-surface-cellular',
    'primary-inflammation',
]

// Check if diamond buttons should be active
const isTearFilmActive = computed(() => {
    return !navigationStore.activeMenuItem || tearFilmItems.includes(navigationStore.activeMenuItem)
})

const isEyelidActive = computed(() => {
    return !navigationStore.activeMenuItem || eyelidItems.includes(navigationStore.activeMenuItem)
})

const isOcularSurfaceActive = computed(() => {
    return (
        !navigationStore.activeMenuItem ||
        ocularSurfaceItems.includes(navigationStore.activeMenuItem)
    )
})

const handleDiamondClick = (menuId) => {
    navigationStore.setActiveMenuItem(menuId)
}
</script>

<template>
    <div class="w-[400px] h-[400px] min-w-[400px]">
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
                :active="isTearFilmActive"
                @click="handleDiamondClick"
            />

            <!-- Eyelid Anomalies -->
            <DiamondButton
                :image="eyelidDiamond"
                label="EYELID<br />ANOMALIES"
                position="right"
                menu-id="eyelid-anomalies"
                :active="isEyelidActive"
                @click="handleDiamondClick"
            />

            <!-- Ocular Surface Abnormalities -->
            <DiamondButton
                :image="ocularDiamond"
                label="OCULAR SURFACE<br />ABNORMALITIES"
                position="bottom"
                menu-id="ocular-surface-abnormalities"
                :active="isOcularSurfaceActive"
                @click="handleDiamondClick"
            />
        </div>
    </div>
</template>
