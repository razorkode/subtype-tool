<script setup>
import GradientButton from '@/components/GradientButton.vue'
</script>

<template>
    <!-- Left Navigation - Menu System -->
    <div class="space-y-6">
        <!-- Tear Film Deficiencies Section -->
        <div class="space-y-3">
            <GradientButton variant="gray"> TEAR FILM DEFICIENCIES </GradientButton>
            <GradientButton variant="cyan"> Lipid </GradientButton>
            <GradientButton variant="cyan"> Aqueous </GradientButton>
            <GradientButton variant="cyan"> Mucin / glycocalyx </GradientButton>
        </div>

        <!-- Eyelid Anomalies Section -->
        <div class="space-y-3">
            <GradientButton variant="gray"> EYELID ANOMALIES </GradientButton>
            <GradientButton variant="teal"> Blink / lid closure </GradientButton>
            <GradientButton variant="teal"> Lid margin </GradientButton>
        </div>

        <!-- Ocular Surface Abnormalities Section -->
        <div class="space-y-3">
            <GradientButton variant="gray"> OCULAR SURFACE ABNORMALITIES </GradientButton>
            <GradientButton variant="purple"> Anatomical misalignment </GradientButton>
            <GradientButton variant="purple"> Neural dysfunction </GradientButton>
            <GradientButton variant="purple">
                <div class="text-center leading-3">
                    <div>Ocular surface cellular</div>
                    <div>damage / disruption</div>
                </div>
            </GradientButton>
            <GradientButton variant="purple">
                <div class="text-center leading-3">
                    <div>Primary inflammation /</div>
                    <div>oxidative stress</div>
                </div>
            </GradientButton>
        </div>
    </div>
</template>
