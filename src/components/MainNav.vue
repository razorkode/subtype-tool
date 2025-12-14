<script setup>
import { computed } from 'vue'
import GradientButton from '@/components/GradientButton.vue'
import { useNavigationStore } from '@/stores/navigation'
import { useClinicalDataStore } from '@/stores/clinicalData'

const navigationStore = useNavigationStore()
const clinicalDataStore = useClinicalDataStore()

// Compute variants for main category buttons based on checked state
const tearFilmVariant = computed(() => (clinicalDataStore.hasTearFilmChecked ? 'blue' : 'gray'))
const eyelidVariant = computed(() => (clinicalDataStore.hasEyelidChecked ? 'blue' : 'gray'))
const ocularSurfaceVariant = computed(() =>
    clinicalDataStore.hasOcularSurfaceChecked ? 'blue' : 'gray',
)

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

const handleNavClick = (menuId) => {
    // Determine which diamond category this belongs to
    let diamondType = null
    if (tearFilmItems.includes(menuId)) {
        diamondType = 'tear'
    } else if (eyelidItems.includes(menuId)) {
        diamondType = 'eyelid'
    } else if (ocularSurfaceItems.includes(menuId)) {
        diamondType = 'ocular'
    }

    navigationStore.setSelectedDiamond(diamondType)
    navigationStore.setActiveMenuItem(menuId)
}
</script>

<template>
    <!-- Left Navigation - Menu System -->
    <div class="space-y-6">
        <!-- Tear Film Deficiencies Section -->
        <div class="space-y-3">
            <GradientButton
                :variant="tearFilmVariant"
                :active="navigationStore.activeMenuItem === 'tear-film-deficiencies'"
                @click="handleNavClick('tear-film-deficiencies')"
            >
                TEAR FILM DEFICIENCIES
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'lipid'"
                @click="handleNavClick('lipid')"
            >
                Lipid
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'aqueous'"
                @click="handleNavClick('aqueous')"
            >
                Aqueous
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'mucin-glycocalyx'"
                @click="handleNavClick('mucin-glycocalyx')"
            >
                Mucin / glycocalyx
            </GradientButton>
        </div>

        <!-- Eyelid Anomalies Section -->
        <div class="space-y-3">
            <GradientButton
                :variant="eyelidVariant"
                :active="navigationStore.activeMenuItem === 'eyelid-anomalies'"
                @click="handleNavClick('eyelid-anomalies')"
            >
                EYELID ANOMALIES
            </GradientButton>
            <GradientButton
                variant="teal"
                :active="navigationStore.activeMenuItem === 'blink-lid-closure'"
                @click="handleNavClick('blink-lid-closure')"
            >
                Blink / lid closure
            </GradientButton>
            <GradientButton
                variant="teal"
                :active="navigationStore.activeMenuItem === 'lid-margin'"
                @click="handleNavClick('lid-margin')"
            >
                Lid margin
            </GradientButton>
        </div>

        <!-- Ocular Surface Abnormalities Section -->
        <div class="space-y-3">
            <GradientButton
                :variant="ocularSurfaceVariant"
                :active="navigationStore.activeMenuItem === 'ocular-surface-abnormalities'"
                @click="handleNavClick('ocular-surface-abnormalities')"
            >
                OCULAR SURFACE ABNORMALITIES
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'anatomical-misalignment'"
                @click="handleNavClick('anatomical-misalignment')"
            >
                Anatomical misalignment
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'neural-dysfunction'"
                @click="handleNavClick('neural-dysfunction')"
            >
                Neural dysfunction
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'ocular-surface-cellular'"
                @click="handleNavClick('ocular-surface-cellular')"
            >
                <div class="text-center leading-3">
                    <div>Ocular surface cellular</div>
                    <div>damage / disruption</div>
                </div>
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'primary-inflammation'"
                @click="handleNavClick('primary-inflammation')"
            >
                <div class="text-center leading-3">
                    <div>Primary inflammation /</div>
                    <div>oxidative stress</div>
                </div>
            </GradientButton>
        </div>

        <!-- Copyright -->
        <div class="text-xs text-gray-500 mt-16">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </div>
</template>
