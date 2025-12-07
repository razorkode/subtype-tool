<script setup>
import GradientButton from '@/components/GradientButton.vue'
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()
</script>

<template>
    <!-- Left Navigation - Menu System -->
    <div class="space-y-6">
        <!-- Tear Film Deficiencies Section -->
        <div class="space-y-3">
            <GradientButton
                variant="gray"
                :active="navigationStore.activeMenuItem === 'tear-film-deficiencies'"
                @click="navigationStore.setActiveMenuItem('tear-film-deficiencies')"
            >
                TEAR FILM DEFICIENCIES
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'lipid'"
                @click="navigationStore.setActiveMenuItem('lipid')"
            >
                Lipid
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'aqueous'"
                @click="navigationStore.setActiveMenuItem('aqueous')"
            >
                Aqueous
            </GradientButton>
            <GradientButton
                variant="cyan"
                :active="navigationStore.activeMenuItem === 'mucin-glycocalyx'"
                @click="navigationStore.setActiveMenuItem('mucin-glycocalyx')"
            >
                Mucin / glycocalyx
            </GradientButton>
        </div>

        <!-- Eyelid Anomalies Section -->
        <div class="space-y-3">
            <GradientButton
                variant="gray"
                :active="navigationStore.activeMenuItem === 'eyelid-anomalies'"
                @click="navigationStore.setActiveMenuItem('eyelid-anomalies')"
            >
                EYELID ANOMALIES
            </GradientButton>
            <GradientButton
                variant="teal"
                :active="navigationStore.activeMenuItem === 'blink-lid-closure'"
                @click="navigationStore.setActiveMenuItem('blink-lid-closure')"
            >
                Blink / lid closure
            </GradientButton>
            <GradientButton
                variant="teal"
                :active="navigationStore.activeMenuItem === 'lid-margin'"
                @click="navigationStore.setActiveMenuItem('lid-margin')"
            >
                Lid margin
            </GradientButton>
        </div>

        <!-- Ocular Surface Abnormalities Section -->
        <div class="space-y-3">
            <GradientButton
                variant="gray"
                :active="navigationStore.activeMenuItem === 'ocular-surface-abnormalities'"
                @click="navigationStore.setActiveMenuItem('ocular-surface-abnormalities')"
            >
                OCULAR SURFACE ABNORMALITIES
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'anatomical-misalignment'"
                @click="navigationStore.setActiveMenuItem('anatomical-misalignment')"
            >
                Anatomical misalignment
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'neural-dysfunction'"
                @click="navigationStore.setActiveMenuItem('neural-dysfunction')"
            >
                Neural dysfunction
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'ocular-surface-cellular'"
                @click="navigationStore.setActiveMenuItem('ocular-surface-cellular')"
            >
                <div class="text-center leading-3">
                    <div>Ocular surface cellular</div>
                    <div>damage / disruption</div>
                </div>
            </GradientButton>
            <GradientButton
                variant="purple"
                :active="navigationStore.activeMenuItem === 'primary-inflammation'"
                @click="navigationStore.setActiveMenuItem('primary-inflammation')"
            >
                <div class="text-center leading-3">
                    <div>Primary inflammation /</div>
                    <div>oxidative stress</div>
                </div>
            </GradientButton>
        </div>
    </div>
</template>
