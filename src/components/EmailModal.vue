<script setup>
import { ref, computed, watch } from 'vue'
import { useClinicalDataStore } from '@/stores/clinicalData'
import emailjs from '@emailjs/browser'

const STORAGE_KEY = 'subtypeTool_emailAddress'

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['close'])

const clinicalDataStore = useClinicalDataStore()

// Form state
const emailAddress = ref('')
const pxReference = ref('')
const sendingState = ref('idle') // 'idle', 'sending', 'success', 'error'
const errorMessage = ref('')

// Load email from localStorage when modal opens
watch(
    () => props.show,
    (isVisible) => {
        if (isVisible) {
            const savedEmail = localStorage.getItem(STORAGE_KEY)
            if (savedEmail) {
                emailAddress.value = savedEmail
            }
        }
    },
    { immediate: true },
)

// EmailJS configuration
const SERVICE_ID = 'service_nzxejvg'
const TEMPLATE_ID = 'template_vwmr6bt'
const PUBLIC_KEY = '5GNj2ZunGUZFSgEgV'

// Get all checked items for preview
const checkedItems = computed(() => clinicalDataStore.getAllCheckedItems())

// Check if there are any items to send
const hasItems = computed(() => {
    const items = checkedItems.value
    return (
        items.tearFilmDeficiencies.length > 0 ||
        items.eyelidAnomalies.length > 0 ||
        items.ocularSurfaceAbnormalities.length > 0
    )
})

// Validate email
const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailAddress.value)
})

// Validate Px Reference Number (alphanumeric, optional)
const isValidPxReference = computed(() => {
    if (!pxReference.value) return true // Optional field
    const alphanumericRegex = /^[a-zA-Z0-9\s\-_]+$/
    return alphanumericRegex.test(pxReference.value)
})

// Format items for email
const formatItemsForEmail = () => {
    const items = checkedItems.value
    let text = ''

    // Include Px Reference if provided
    if (pxReference.value.trim()) {
        text += `Px Reference: ${pxReference.value.trim()}\n\n`
    }

    if (items.tearFilmDeficiencies.length > 0) {
        text += 'TEAR FILM DEFICIENCIES:\n'
        items.tearFilmDeficiencies.forEach((item) => {
            const parent = item.parentLabel ? ` (${item.parentLabel})` : ''
            const desc = item.description ? `: ${item.description}` : ''
            text += `  • [${item.subcategory}${parent}] ${item.label}${desc}\n`
        })
        text += '\n'
    }

    if (items.eyelidAnomalies.length > 0) {
        text += 'EYELID ANOMALIES:\n'
        items.eyelidAnomalies.forEach((item) => {
            const parent = item.parentLabel ? ` (${item.parentLabel})` : ''
            const desc = item.description ? `: ${item.description}` : ''
            text += `  • [${item.subcategory}${parent}] ${item.label}${desc}\n`
        })
        text += '\n'
    }

    if (items.ocularSurfaceAbnormalities.length > 0) {
        text += 'OCULAR SURFACE ABNORMALITIES:\n'
        items.ocularSurfaceAbnormalities.forEach((item) => {
            const parent = item.parentLabel ? ` (${item.parentLabel})` : ''
            const desc = item.description ? `: ${item.description}` : ''
            text += `  • [${item.subcategory}${parent}] ${item.label}${desc}\n`
        })
    }

    return text
}

// Send email
const sendEmail = async () => {
    if (!isValidEmail.value || !hasItems.value || !isValidPxReference.value) return

    sendingState.value = 'sending'
    errorMessage.value = ''

    try {
        emailjs.init({ publicKey: PUBLIC_KEY })

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: emailAddress.value,
            to_name: 'User',
            from_name: 'Dry Eye Disease Subtype Tool',
            subject: 'Dry Eye Disease Management Report',
            message: formatItemsForEmail(),
            date: new Date().toLocaleString(),
        })

        console.log('EmailJS response:', response)
        sendingState.value = 'success'

        // Save email to localStorage for future use
        localStorage.setItem(STORAGE_KEY, emailAddress.value)
    } catch (error) {
        console.error('EmailJS error:', error)
        sendingState.value = 'error'
        errorMessage.value = error.text || error.message || 'Failed to send email'
    }
}

// Close modal and reset state
const closeModal = () => {
    emailAddress.value = ''
    pxReference.value = ''
    sendingState.value = 'idle'
    errorMessage.value = ''
    emit('close')
}
</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            @click.self="closeModal"
        >
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                <!-- Header -->
                <div class="bg-gray-300 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-gray-600 font-semibold text-lg">Email Report</h2>
                        <button
                            @click="closeModal"
                            class="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <!-- Success State -->
                    <div v-if="sendingState === 'success'" class="text-center py-8">
                        <div
                            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Email Sent!</h3>
                        <p class="text-gray-600 mb-6">
                            Your report has been sent to {{ emailAddress }}
                        </p>
                        <button
                            @click="closeModal"
                            class="px-6 py-2 bg-[#05319B] text-white rounded-full hover:bg-[#042578] transition-colors"
                        >
                            Close
                        </button>
                    </div>

                    <!-- Form State -->
                    <div v-else>
                        <!-- Email Input -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                v-model="emailAddress"
                                type="email"
                                placeholder="Enter email address"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AADE1] focus:border-transparent outline-none transition-all"
                                :disabled="sendingState === 'sending'"
                            />
                        </div>

                        <!-- Px Reference Input (Optional) -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Px Reference
                                <span class="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <input
                                v-model="pxReference"
                                type="text"
                                placeholder="Enter patient reference"
                                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3AADE1] focus:border-transparent outline-none transition-all"
                                :class="
                                    !isValidPxReference
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300'
                                "
                                :disabled="sendingState === 'sending'"
                            />
                            <p v-if="!isValidPxReference" class="mt-1 text-xs text-red-500">
                                Only letters, numbers, spaces, hyphens, and underscores are allowed
                            </p>
                        </div>

                        <!-- Error Message -->
                        <div
                            v-if="sendingState === 'error'"
                            class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                        >
                            {{ errorMessage }}
                        </div>

                        <!-- Preview Section -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Report Preview
                            </label>
                            <div
                                class="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto text-sm"
                            >
                                <!-- Tear Film Deficiencies -->
                                <div
                                    v-if="checkedItems.tearFilmDeficiencies.length > 0"
                                    class="mb-3"
                                >
                                    <div class="font-semibold text-[#05319B] mb-1">
                                        TEAR FILM DEFICIENCIES
                                    </div>
                                    <ul class="space-y-1 pl-4">
                                        <li
                                            v-for="(
                                                item, index
                                            ) in checkedItems.tearFilmDeficiencies"
                                            :key="index"
                                            class="text-gray-700"
                                        >
                                            <span class="font-medium">{{ item.subcategory }}</span>
                                            <span v-if="item.parentLabel" class="text-gray-500">
                                                ({{ item.parentLabel }})
                                            </span>
                                            → {{ item.label }}
                                            <span v-if="item.description" class="text-gray-500">
                                                : {{ item.description }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Eyelid Anomalies -->
                                <div v-if="checkedItems.eyelidAnomalies.length > 0" class="mb-3">
                                    <div class="font-semibold text-[#027583] mb-1">
                                        EYELID ANOMALIES
                                    </div>
                                    <ul class="space-y-1 pl-4">
                                        <li
                                            v-for="(item, index) in checkedItems.eyelidAnomalies"
                                            :key="index"
                                            class="text-gray-700"
                                        >
                                            <span class="font-medium">{{ item.subcategory }}</span>
                                            <span v-if="item.parentLabel" class="text-gray-500">
                                                ({{ item.parentLabel }})
                                            </span>
                                            → {{ item.label }}
                                            <span v-if="item.description" class="text-gray-500">
                                                : {{ item.description }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Ocular Surface Abnormalities -->
                                <div
                                    v-if="checkedItems.ocularSurfaceAbnormalities.length > 0"
                                    class="mb-3"
                                >
                                    <div class="font-semibold text-[#4F0F79] mb-1">
                                        OCULAR SURFACE ABNORMALITIES
                                    </div>
                                    <ul class="space-y-1 pl-4">
                                        <li
                                            v-for="(
                                                item, index
                                            ) in checkedItems.ocularSurfaceAbnormalities"
                                            :key="index"
                                            class="text-gray-700"
                                        >
                                            <span class="font-medium">{{ item.subcategory }}</span>
                                            <span v-if="item.parentLabel" class="text-gray-500">
                                                ({{ item.parentLabel }})
                                            </span>
                                            → {{ item.label }}
                                            <span v-if="item.description" class="text-gray-500">
                                                : {{ item.description }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Empty state -->
                                <div v-if="!hasItems" class="text-gray-500 text-center py-4 italic">
                                    No items selected
                                </div>
                            </div>
                        </div>

                        <!-- Send Button -->
                        <button
                            @click="sendEmail"
                            :disabled="
                                !isValidEmail ||
                                !hasItems ||
                                !isValidPxReference ||
                                sendingState === 'sending'
                            "
                            class="w-full py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                            :class="
                                isValidEmail &&
                                hasItems &&
                                isValidPxReference &&
                                sendingState !== 'sending'
                                    ? 'bg-[#05319B] text-white hover:bg-[#042578] cursor-pointer'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            "
                        >
                            <!-- Sending spinner -->
                            <svg
                                v-if="sendingState === 'sending'"
                                class="animate-spin h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>{{
                                sendingState === 'sending' ? 'Sending...' : 'Send Email'
                            }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
