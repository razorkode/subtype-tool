<script setup>
import ContentBox from '@/components/ContentBox.vue'
</script>

<template>
    <!-- How to Use Panel -->
    <ContentBox color="grey" show-top-tab>
        <h3 class="text-lg font-bold text-[#05319B] mb-2">
            HOW TO USE THE DRY EYE RELIEF & MANAGEMENT TOOL
        </h3>

        <p class="text-gray-700 mb-4">
            First,
            <span class="font-semibold">select a category on the left</span> – Tear Film
            Deficiencies, Eyelid Anomalies, or Ocular Surface Abnormalities.
        </p>

        <p class="text-gray-700 mb-4">
            Then,
            <span class="font-semibold">select a sub-category</span> within the main selected
            category to further classify the dry eye type. You can select multiple sub-categories
            and use the Next/Previous buttons to flip between your selected choices.
        </p>

        <p class="text-gray-700">
            Finally,
            <span class="font-semibold"
                >select the preferred dry eye disease management options</span
            >
            from the pop-up menu. Send a report to your email by selecting the Email button in the
            pop-up menu.
        </p>
    </ContentBox>
</template>
