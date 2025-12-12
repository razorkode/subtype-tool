<script setup>
import { computed, ref } from 'vue'
import SubOptionBox from './SubOptionBox.vue'
import TestingSection from './TestingSection.vue'
import ManagementSection from './ManagementSection.vue'
import { useNavigationStore } from '@/stores/navigation'
import { useClinicalDataStore } from '@/stores/clinicalData'
import { useLayoutStore } from '@/stores/layout'
import { sendEmail, generateReportHtml, sendTestEmail } from '@/services/emailService'

const props = defineProps({
    subcategoryId: {
        type: String,
        required: true,
    },
})

const navigationStore = useNavigationStore()
const clinicalDataStore = useClinicalDataStore()
const layoutStore = useLayoutStore()

// Email state
const isSendingEmail = ref(false)

// Get configuration for this subcategory
const config = computed(() => clinicalDataStore.getSubcategoryConfig(props.subcategoryId))

// Get testing data
const testingData = computed(() => clinicalDataStore.getTestingData(props.subcategoryId))

// Get management items
const managementItems = computed(() => clinicalDataStore.getManagementItems(props.subcategoryId))

// Check visibility
const isVisible = computed(() => {
    if (!config.value) return false
    return layoutStore.isSubcategoryVisible(props.subcategoryId, config.value.diamond)
})

// Handle management items update
function handleManagementUpdate(newItems) {
    clinicalDataStore.updateManagementItems(props.subcategoryId, newItems)
}

// Handle email button click
async function handleEmail() {
    // Prompt user for email address
    const email = window.prompt('Enter your email address to receive the report:')

    if (!email) {
        return // User cancelled
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        window.alert('Please enter a valid email address.')
        return
    }

    isSendingEmail.value = true

    try {
        // For testing: send a test email
        // To send the full report instead, use sendEmail with generateReportHtml
        const result = await sendTestEmail(email)

        // Uncomment below to send actual report instead of test email:
        // const html = generateReportHtml({
        //     config: config.value,
        //     testing: testingData.value,
        //     management: managementItems.value,
        // })
        // const result = await sendEmail({
        //     to: email,
        //     subject: `${config.value.category} - ${config.value.title} Report`,
        //     html,
        // })

        if (result.success) {
            window.alert('Email sent successfully! Please check your inbox.')
        } else {
            window.alert(`Failed to send email: ${result.error}`)
        }
    } catch (error) {
        console.error('Email error:', error)
        window.alert('An error occurred while sending the email. Please try again.')
    } finally {
        isSendingEmail.value = false
    }
}
</script>

<template>
    <div
        class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
        :class="{ invisible: !isVisible }"
    >
        <SubOptionBox
            v-if="config"
            :color="config.color"
            :category="config.category"
            :title="config.title"
            :disable-previous="navigationStore.isFirstSubcategory"
            :disable-next="navigationStore.isLastSubcategory"
            @previous="navigationStore.navigatePrevious"
            @next="navigationStore.navigateNext"
            @email="handleEmail"
        >
            <TestingSection
                v-if="testingData.standard && testingData.standard.length > 0"
                title="STANDARD TESTING"
                :color="config.color"
                :items="testingData.standard"
            />
            <TestingSection
                v-if="testingData.advanced && testingData.advanced.length > 0"
                title="ADVANCED TESTING"
                :color="config.color"
                :items="testingData.advanced"
            />
            <ManagementSection
                :color="config.color"
                :items="managementItems"
                @update:items="handleManagementUpdate"
            />
        </SubOptionBox>
    </div>
</template>
