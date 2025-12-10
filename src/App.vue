<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'
import HowToUse from '@/components/HowToUse.vue'
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()

const containerRef = ref(null)
const svgPaths = ref([])
const boxesMarginTop = ref(0)
const diamondsMarginTop = ref(0)

// Colors for each connector
const colors = {
    blue: '#3AADE1',
    teal: '#52A5A4',
    purple: '#7B5295',
}

// Computed property to check if we should show How to Use
const showHowToUse = computed(() => navigationStore.selectedDiamond === null)

// Computed properties for visibility of each box/connector
const showTear = computed(() => navigationStore.selectedDiamond === 'tear')
const showEyelid = computed(() => navigationStore.selectedDiamond === 'eyelid')
const showOcular = computed(() => navigationStore.selectedDiamond === 'ocular')

// Watch for diamond selection changes and recalculate paths
watch(
    () => navigationStore.selectedDiamond,
    async () => {
        await nextTick()
        setTimeout(calculatePaths, 50)
    },
)

const updateLayout = async () => {
    // First reset margins to measure true positions
    boxesMarginTop.value = 0
    diamondsMarginTop.value = 0
    await nextTick()

    const eyelidDiamond = document.querySelector('[data-diamond="eyelid"]')
    const eyelidBox = document.querySelector('[data-box="eyelid"]')

    if (!eyelidDiamond || !eyelidBox) return

    const diamondRect = eyelidDiamond.getBoundingClientRect()
    const boxRect = eyelidBox.getBoundingClientRect()

    // Get center Y positions
    const diamondCenterY = diamondRect.top + diamondRect.height * 0.47
    const boxCenterY = boxRect.top + boxRect.height / 2

    // Calculate offset to align centers
    const offset = diamondCenterY - boxCenterY

    // Apply positive margin to whichever needs to move DOWN
    if (offset > 0) {
        // Box center is above diamond - push boxes down
        boxesMarginTop.value = offset
        diamondsMarginTop.value = 0
    } else {
        // Diamond center is above box - push diamonds down
        diamondsMarginTop.value = -offset
        boxesMarginTop.value = 0
    }

    await nextTick()
    calculatePaths()
}

onMounted(() => {
    setTimeout(updateLayout, 200)
    window.addEventListener('resize', updateLayout)
})

const calculatePaths = () => {
    if (!containerRef.value) return

    const container = containerRef.value.getBoundingClientRect()

    // Get diamond button positions (right edge of each diamond)
    const tearDiamond = document.querySelector('[data-diamond="tear"]')
    const eyelidDiamond = document.querySelector('[data-diamond="eyelid"]')
    const ocularDiamond = document.querySelector('[data-diamond="ocular"]')

    // Get content box positions (left edge bracket connection points)
    const tearBox = document.querySelector('[data-box="tear"]')
    const eyelidBox = document.querySelector('[data-box="eyelid"]')
    const ocularBox = document.querySelector('[data-box="ocular"]')

    if (!tearDiamond || !eyelidDiamond || !ocularDiamond || !tearBox || !eyelidBox || !ocularBox) {
        return
    }

    const tearDiamondRect = tearDiamond.getBoundingClientRect()
    const eyelidDiamondRect = eyelidDiamond.getBoundingClientRect()
    const ocularDiamondRect = ocularDiamond.getBoundingClientRect()

    const tearBoxRect = tearBox.getBoundingClientRect()
    const eyelidBoxRect = eyelidBox.getBoundingClientRect()
    const ocularBoxRect = ocularBox.getBoundingClientRect()

    // Calculate relative positions within container - always calculate all paths
    const paths = [
        {
            id: 'tear',
            color: colors.blue,
            startX: tearDiamondRect.left + tearDiamondRect.width * 0.75 - container.left,
            startY: tearDiamondRect.top + tearDiamondRect.height * 0.24 - container.top,
            endX: tearBoxRect.left - container.left,
            endY: tearBoxRect.top + tearBoxRect.height / 2 - container.top,
        },
        {
            id: 'eyelid',
            color: colors.teal,
            startX: eyelidDiamondRect.right - 10 - container.left,
            startY: eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47 - container.top,
            endX: eyelidBoxRect.left - container.left,
            endY: eyelidBoxRect.top + eyelidBoxRect.height / 2 - container.top,
            isStraight: true,
        },
        {
            id: 'ocular',
            color: colors.purple,
            startX: ocularDiamondRect.left + ocularDiamondRect.width * 0.74 - container.left,
            startY: ocularDiamondRect.top + ocularDiamondRect.height * 0.72 - container.top,
            endX: ocularBoxRect.left - container.left,
            endY: ocularBoxRect.top + ocularBoxRect.height / 2 - container.top,
        },
    ]

    svgPaths.value = paths
}
</script>

<template>
    <main class="flex min-h-screen flex-col mx-auto p-8">
        <!-- Main Content (Above Footer) -->
        <div class="flex items-start justify-center gap-8 min-w-0">
            <!-- Left Navigation -->
            <MainNav />

            <!-- Diamonds + Connectors + Boxes Container -->
            <div ref="containerRef" class="relative flex items-start gap-8 min-w-0">
                <!-- Diamond Buttons Section -->
                <div class="shrink-0" :style="{ marginTop: diamondsMarginTop + 'px' }">
                    <DiamondButtons />
                </div>

                <!-- SVG Connector Lines Overlay - use visibility to hide/show -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 5">
                    <g
                        v-for="path in svgPaths"
                        :key="path.id"
                        :class="{
                            invisible:
                                showHowToUse ||
                                (path.id === 'tear' && !showTear) ||
                                (path.id === 'eyelid' && !showEyelid) ||
                                (path.id === 'ocular' && !showOcular),
                        }"
                    >
                        <!-- Connector line - straight or curved -->
                        <path
                            :d="
                                path.isStraight
                                    ? `M ${path.startX} ${path.startY} L ${path.endX} ${path.endY}`
                                    : `M ${path.startX} ${path.startY}
                                   C ${path.startX + 50} ${path.startY},
                                     ${path.endX - 50} ${path.endY},
                                     ${path.endX} ${path.endY}`
                            "
                            :stroke="path.color"
                            stroke-width="2"
                            fill="none"
                        />
                        <!-- Start dot (on diamond) -->
                        <circle
                            :cx="path.startX"
                            :cy="path.startY"
                            r="5"
                            :fill="path.color"
                            stroke="white"
                            stroke-width="2"
                        />
                    </g>
                </svg>

                <!-- Right side content area - contains both HowToUse and boxes -->
                <div class="relative shrink min-w-0">
                    <!-- How to Use Box (shown by default when no diamond is selected) -->
                    <div :class="{ invisible: !showHowToUse }">
                        <HowToUse />
                    </div>

                    <!-- Content Boxes with Brackets - always rendered, visibility controlled -->
                    <div
                        data-boxes-container
                        class="flex flex-col gap-12 absolute top-0 left-0"
                        :style="{ marginTop: boxesMarginTop + 'px' }"
                        :class="{ invisible: showHowToUse }"
                    >
                        <div data-box="tear" :class="{ invisible: !showTear }">
                            <ContentBoxWithBracket
                                color="blue"
                                title="TEAR FILM DEFICIENCIES"
                                bracketConnect="top"
                            >
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li>Lipid</li>
                                    <li>Aqueous</li>
                                    <li>Mucin/glycocalyx</li>
                                </ul>
                            </ContentBoxWithBracket>
                        </div>

                        <div data-box="eyelid" :class="{ invisible: !showEyelid }">
                            <ContentBoxWithBracket
                                color="teal"
                                title="EYELID ANOMALIES"
                                bracketConnect="top"
                            >
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li>Blink / lid closure</li>
                                    <li>Lid margin</li>
                                </ul>
                            </ContentBoxWithBracket>
                        </div>

                        <div data-box="ocular" :class="{ invisible: !showOcular }">
                            <ContentBoxWithBracket
                                color="purple"
                                title="OCULAR SURFACE ABNORMALITIES"
                                bracketConnect="bottom"
                            >
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li>Anatomical misalignment</li>
                                    <li>Neural dysfunction</li>
                                    <li>Ocular surface cellular damage/disruption</li>
                                    <li>Primary inflammation/oxidative stress</li>
                                </ul>
                            </ContentBoxWithBracket>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-6">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </main>
</template>
