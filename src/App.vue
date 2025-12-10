<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'
import SubOptionBox from '@/components/SubOptionBox.vue'
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

// Main category menu IDs (grey buttons)
const mainCategories = [
    'tear-film-deficiencies',
    'eyelid-anomalies',
    'ocular-surface-abnormalities',
]

// Computed property to check if we should show How to Use
const showHowToUse = computed(() => navigationStore.selectedDiamond === null)

// Check if showing a main category (with bracket) or sub-option (without bracket)
const isMainCategory = computed(() => mainCategories.includes(navigationStore.activeMenuItem))

// Computed properties for visibility of each diamond's content
const showTear = computed(() => navigationStore.selectedDiamond === 'tear')
const showEyelid = computed(() => navigationStore.selectedDiamond === 'eyelid')
const showOcular = computed(() => navigationStore.selectedDiamond === 'ocular')

// Active menu item for showing specific sub-option content
const activeMenuItem = computed(() => navigationStore.activeMenuItem)

// Watch for changes and recalculate paths
watch([() => navigationStore.selectedDiamond, () => navigationStore.activeMenuItem], async () => {
    await nextTick()
    setTimeout(calculatePaths, 50)
})

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
    // Always use the main layout boxes for positioning
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

// Helper to check if we should show bracket (main category) or end dot (sub-option)
const shouldShowBracket = (diamondId) => {
    if (diamondId === 'tear') return activeMenuItem.value === 'tear-film-deficiencies'
    if (diamondId === 'eyelid') return activeMenuItem.value === 'eyelid-anomalies'
    if (diamondId === 'ocular') return activeMenuItem.value === 'ocular-surface-abnormalities'
    return false
}
</script>

<template>
    <main class="flex min-h-screen flex-col mx-auto p-8">
        <!-- Main Content (Above Footer) -->
        <div class="flex flex-1 items-center justify-center gap-8 min-w-0">
            <!-- Left Navigation -->
            <MainNav />

            <!-- Diamonds + Connectors + Boxes Container -->
            <div ref="containerRef" class="relative flex items-start gap-8 min-w-0">
                <!-- Diamond Buttons Section -->
                <div class="shrink-0" :style="{ marginTop: diamondsMarginTop + 'px' }">
                    <DiamondButtons />
                </div>

                <!-- SVG Connector Lines Overlay -->
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
                        <!-- End dot (on box) - only for sub-options (no bracket) -->
                        <circle
                            v-if="!shouldShowBracket(path.id)"
                            :cx="path.endX"
                            :cy="path.endY"
                            r="5"
                            :fill="path.color"
                            stroke="white"
                            stroke-width="2"
                        />
                    </g>
                </svg>

                <!-- Right side content area -->
                <div class="relative shrink min-w-0">
                    <!-- How to Use Box (shown by default) -->
                    <div :class="{ invisible: !showHowToUse }">
                        <HowToUse />
                    </div>

                    <!-- Content Boxes - ALL ALWAYS RENDERED for layout, visibility controlled -->
                    <div
                        data-boxes-container
                        class="flex flex-col gap-12 absolute top-0 left-0 w-full"
                        :style="{ marginTop: boxesMarginTop + 'px' }"
                        :class="{ invisible: showHowToUse }"
                    >
                        <!-- ALL SUB-OPTIONS - Positioned at top of container -->
                        <!-- TEAR FILM Sub-options -->
                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{ invisible: !showTear || activeMenuItem !== 'lipid' }"
                        >
                            <SubOptionBox
                                color="blue"
                                category="TEAR FILM DEFICIENCIES"
                                title="LIPID"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-blue-600 font-semibold text-xs mb-2 border-b border-blue-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">INTERFEROMETRY</div>
                                                <div class="text-xs text-gray-600">
                                                    grade ≤ 3 (non-amorphous or colored pattern) or
                                                    &lt;72nm on LipiView 197, 320, 343
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    MEIBUM EXPRESSIBILITY/QUALITY
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    meibum not clear or limited expressibility 332,
                                                    371, 715
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{ invisible: !showTear || activeMenuItem !== 'aqueous' }"
                        >
                            <SubOptionBox
                                color="blue"
                                category="TEAR FILM DEFICIENCIES"
                                title="AQUEOUS"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-blue-600 font-semibold text-xs mb-2 border-b border-blue-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">SCHIRMER TEST</div>
                                                <div class="text-xs text-gray-600">
                                                    ≤10mm in 5 minutes without anesthesia
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    TEAR MENISCUS HEIGHT
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    &lt;0.2mm measured by OCT or slit lamp
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible: !showTear || activeMenuItem !== 'mucin-glycocalyx',
                            }"
                        >
                            <SubOptionBox
                                color="blue"
                                category="TEAR FILM DEFICIENCIES"
                                title="MUCIN/GLYCOCALYX"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-blue-600 font-semibold text-xs mb-2 border-b border-blue-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">
                                                    TEAR BREAK-UP TIME
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    &lt;10 seconds
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    IMPRESSION CYTOLOGY
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Goblet cell density assessment
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <!-- EYELID Sub-options -->
                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible: !showEyelid || activeMenuItem !== 'blink-lid-closure',
                            }"
                        >
                            <SubOptionBox
                                color="teal"
                                category="EYELID ANOMALIES"
                                title="BLINK / LID CLOSURE"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-teal-600 font-semibold text-xs mb-2 border-b border-teal-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">
                                                    BLINK RATE ASSESSMENT
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Incomplete blink frequency evaluation
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    LID CLOSURE EVALUATION
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Lagophthalmos assessment during sleep
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible: !showEyelid || activeMenuItem !== 'lid-margin',
                            }"
                        >
                            <SubOptionBox
                                color="teal"
                                category="EYELID ANOMALIES"
                                title="LID MARGIN"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-teal-600 font-semibold text-xs mb-2 border-b border-teal-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">
                                                    MEIBOMIAN GLAND EVALUATION
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Gland dropout and morphology assessment
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    LID WIPER EPITHELIOPATHY
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Staining of the lid wiper region
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <!-- OCULAR SURFACE Sub-options -->
                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible:
                                    !showOcular || activeMenuItem !== 'anatomical-misalignment',
                            }"
                        >
                            <SubOptionBox
                                color="purple"
                                category="OCULAR SURFACE ABNORMALITIES"
                                title="ANATOMICAL MISALIGNMENT"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-purple-600 font-semibold text-xs mb-2 border-b border-purple-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">
                                                    CONJUNCTIVOCHALASIS
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Redundant conjunctival folds assessment
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    PINGUECULA/PTERYGIUM
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Growth evaluation and grading
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible: !showOcular || activeMenuItem !== 'neural-dysfunction',
                            }"
                        >
                            <SubOptionBox
                                color="purple"
                                category="OCULAR SURFACE ABNORMALITIES"
                                title="NEURAL DYSFUNCTION"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-purple-600 font-semibold text-xs mb-2 border-b border-purple-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">
                                                    CORNEAL SENSITIVITY
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Cochet-Bonnet esthesiometry
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    NEUROPATHIC PAIN ASSESSMENT
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Symptom-sign discordance evaluation
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible:
                                    !showOcular || activeMenuItem !== 'ocular-surface-cellular',
                            }"
                        >
                            <SubOptionBox
                                color="purple"
                                category="OCULAR SURFACE ABNORMALITIES"
                                title="CELLULAR DAMAGE"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-purple-600 font-semibold text-xs mb-2 border-b border-purple-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">CORNEAL STAINING</div>
                                                <div class="text-xs text-gray-600">
                                                    Fluorescein and lissamine green assessment
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">
                                                    CONJUNCTIVAL STAINING
                                                </div>
                                                <div class="text-xs text-gray-600">
                                                    Oxford or NEI grading scale
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <div
                            class="absolute top-0 left-0 w-full"
                            :class="{
                                invisible:
                                    !showOcular || activeMenuItem !== 'primary-inflammation',
                            }"
                        >
                            <SubOptionBox
                                color="purple"
                                category="OCULAR SURFACE ABNORMALITIES"
                                title="INFLAMMATION"
                            >
                                <div class="space-y-4">
                                    <div>
                                        <div
                                            class="text-purple-600 font-semibold text-xs mb-2 border-b border-purple-200 pb-1"
                                        >
                                            STANDARD TESTING
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <div class="font-bold text-sm">MMP-9 TESTING</div>
                                                <div class="text-xs text-gray-600">
                                                    InflammaDry point-of-care test
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold text-sm">TEAR OSMOLARITY</div>
                                                <div class="text-xs text-gray-600">
                                                    &gt;308 mOsm/L or &gt;8 mOsm/L difference between
                                                    eyes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SubOptionBox>
                        </div>

                        <!-- MAIN CATEGORY BOXES - For layout positioning only -->
                        <!-- TEAR BOX POSITION -->
                        <div data-box="tear" class="relative">
                            <div
                                :class="{
                                    invisible:
                                        !showTear || activeMenuItem !== 'tear-film-deficiencies',
                                }"
                            >
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
                        </div>

                        <!-- EYELID BOX POSITION -->
                        <div data-box="eyelid" class="relative">
                            <div
                                :class="{
                                    invisible:
                                        !showEyelid || activeMenuItem !== 'eyelid-anomalies',
                                }"
                            >
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
                        </div>

                        <!-- OCULAR BOX POSITION -->
                        <div data-box="ocular" class="relative">
                            <div
                                :class="{
                                    invisible:
                                        !showOcular ||
                                        activeMenuItem !== 'ocular-surface-abnormalities',
                                }"
                            >
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
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-6">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </main>
</template>
