<script setup>
import { ref, onMounted, nextTick, watch, computed, reactive } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'
import SubOptionBox from '@/components/SubOptionBox.vue'
import HowToUse from '@/components/HowToUse.vue'
import TestingSection from '@/components/TestingSection.vue'
import ManagementSection from '@/components/ManagementSection.vue'
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()

const containerRef = ref(null)
const svgPaths = ref([])
const boxesMarginTop = ref(0)
const diamondsMarginTop = ref(0)
const contentScale = ref(1)

// Colors for each connector
const colors = {
    blue: '#3AADE1',
    teal: '#52A5A4',
    purple: '#7B5295',
}

// Computed property to check if we should show How to Use
const showHowToUse = computed(() => navigationStore.selectedDiamond === null)

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
    contentScale.value = 1 // Reset scale to calculate proper dimensions
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

    // Calculate scale to fit content within viewport
    if (containerRef.value) {
        const container = containerRef.value.parentElement // Get the scaled wrapper
        const containerHeight = container.scrollHeight
        const containerWidth = container.scrollWidth
        const viewportHeight = window.innerHeight - 160 // Account for padding and footer
        const viewportWidth = window.innerWidth - 64 // Account for horizontal padding

        // Calculate scale based on both height and width constraints
        const scaleY = containerHeight > viewportHeight ? viewportHeight / containerHeight : 1
        const scaleX = containerWidth > viewportWidth ? viewportWidth / containerWidth : 1

        // Use the smaller scale to ensure everything fits
        contentScale.value = Math.min(scaleY, scaleX, 1)
    }

    // Calculate paths AFTER scale is applied so SVG knows where scaled elements are
    await nextTick()
    calculatePaths()
}

onMounted(() => {
    setTimeout(updateLayout, 200)
    window.addEventListener('resize', updateLayout)
})

const calculatePaths = () => {
    if (!containerRef.value) return

    // Get the main content area that contains the SVG
    const mainContent = containerRef.value.parentElement.parentElement
    const svgContainer = mainContent.getBoundingClientRect()

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

    // Calculate positions relative to the SVG container (main content area)
    const paths = [
        {
            id: 'tear',
            color: colors.blue,
            startX: tearDiamondRect.left + tearDiamondRect.width * 0.75 - svgContainer.left,
            startY: tearDiamondRect.top + tearDiamondRect.height * 0.24 - svgContainer.top,
            endX: tearBoxRect.left - svgContainer.left,
            endY: tearBoxRect.top + tearBoxRect.height / 2 - svgContainer.top,
            isStraight: true,
        },
        {
            id: 'eyelid',
            color: colors.teal,
            startX: eyelidDiamondRect.right - 10 - svgContainer.left,
            startY: eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47 - svgContainer.top,
            endX: eyelidBoxRect.left - svgContainer.left,
            endY: eyelidBoxRect.top + eyelidBoxRect.height / 2 - svgContainer.top,
            isStraight: true,
        },
        {
            id: 'ocular',
            color: colors.purple,
            startX: ocularDiamondRect.left + ocularDiamondRect.width * 0.74 - svgContainer.left,
            startY: ocularDiamondRect.top + ocularDiamondRect.height * 0.72 - svgContainer.top,
            endX: ocularBoxRect.left - svgContainer.left,
            endY: ocularBoxRect.top + ocularBoxRect.height / 2 - svgContainer.top,
            isStraight: true,
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

// Management items for each sub-option
const managementItems = reactive({
    lipid: [
        { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
        {
            label: 'TEAR SUPPLEMENTATION/STABILIZATION',
            description: 'Lipomimetics',
            checked: false,
        },
        {
            label: 'TEAR CONSERVATION DEVICES',
            description: 'Moisture chamber spectacles',
            checked: false,
        },
        {
            label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
            description: 'Topical secretagogues',
            checked: false,
        },
        {
            label: 'DEVICE TEAR STIMULATION/RESTORATION',
            description: 'Internal and external device lid heating; IPL; LLLT\nIPL\nWarm compress',
            checked: false,
        },
        { label: 'TOPICAL ANTI-INFLAMMATORIES', description: 'Cyclosporine A', checked: false },
    ],
    aqueous: [
        { label: 'LIFESTYLE ADVICE', description: 'Environmental modifications', checked: false },
        { label: 'TEAR SUPPLEMENTATION', description: 'Aqueous-based lubricants', checked: false },
        { label: 'PUNCTAL OCCLUSION', description: 'Temporary or permanent plugs', checked: false },
        { label: 'SECRETAGOGUES', description: 'Topical diquafosol', checked: false },
    ],
    mucinGlycocalyx: [
        { label: 'LIFESTYLE ADVICE', description: 'Screen time management', checked: false },
        { label: 'TEAR SUPPLEMENTATION', description: 'Mucin-enhancing drops', checked: false },
        { label: 'VITAMIN A', description: 'Topical retinoid therapy', checked: false },
        { label: 'AUTOLOGOUS SERUM', description: 'Growth factor supplementation', checked: false },
    ],
    blinkLidClosure: [
        { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
        {
            label: 'TEAR CONSERVATION DEVICES',
            description: 'Moisture chamber spectacles',
            checked: false,
        },
        { label: 'BLINK THERAPIES', description: 'To be considered', checked: false },
        { label: 'SURGICAL OPTIONS', description: 'To be considered', checked: false },
    ],
    lidMargin: [
        { label: 'LIFESTYLE ADVICE', description: 'Dietary modifications', checked: false },
        { label: 'LID HYGIENE', description: 'Daily cleansing routine', checked: false },
        { label: 'THERMAL THERAPY', description: 'IPL and warm compress', checked: false },
        { label: 'TOPICAL ANTIBIOTICS', description: 'Azithromycin ointment', checked: false },
    ],
    anatomicalMisalignment: [
        { label: 'LIFESTYLE ADVICE', description: 'UV protection', checked: false },
        { label: 'TEAR SUPPLEMENTATION', description: 'Viscous lubricants', checked: false },
        { label: 'SURGICAL REFERRAL', description: 'Conjunctival procedures', checked: false },
        { label: 'ANTI-INFLAMMATORY', description: 'Topical steroids PRN', checked: false },
    ],
    neuralDysfunction: [
        { label: 'LIFESTYLE ADVICE', description: 'Stress management', checked: false },
        { label: 'NEUROSTIMULATION', description: 'Intranasal devices', checked: false },
        { label: 'NEUROPATHIC AGENTS', description: 'Low-dose naltrexone', checked: false },
        { label: 'AUTOLOGOUS SERUM', description: 'Nerve growth factors', checked: false },
    ],
    ocularSurfaceCellular: [
        { label: 'LIFESTYLE ADVICE', description: 'Allergen avoidance', checked: false },
        { label: 'TEAR SUPPLEMENTATION', description: 'Preservative-free drops', checked: false },
        { label: 'ANTI-INFLAMMATORY', description: 'Cyclosporine or lifitegrast', checked: false },
        { label: 'AMNIOTIC MEMBRANE', description: 'Cryopreserved grafts', checked: false },
    ],
    primaryInflammation: [
        { label: 'LIFESTYLE ADVICE', description: 'Anti-inflammatory diet', checked: false },
        { label: 'TOPICAL STEROIDS', description: 'Short-term pulse therapy', checked: false },
        { label: 'IMMUNOMODULATORS', description: 'Cyclosporine A', checked: false },
        { label: 'OMEGA-3 SUPPLEMENTS', description: 'High-dose EPA/DHA', checked: false },
    ],
})
</script>

<template>
    <main class="flex h-screen flex-col mx-auto p-8">
        <!-- Main Content (Above Footer) -->
        <div class="flex flex-1 items-center justify-center gap-8 min-w-0 relative">
            <!-- SVG Connector Lines Overlay - Outside scaled content -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 20">
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
                        stroke="#6B7280"
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
                    <circle
                        :cx="path.startX"
                        :cy="path.startY"
                        r="6.5"
                        fill="none"
                        stroke="#6B7280"
                        stroke-width="1"
                    />
                    <!-- End dot (on box) - only for sub-options (no bracket) -->
                    <template v-if="!shouldShowBracket(path.id)">
                        <circle
                            :cx="path.endX"
                            :cy="path.endY"
                            r="5"
                            :fill="path.color"
                            stroke="white"
                            stroke-width="2"
                        />
                        <circle
                            :cx="path.endX"
                            :cy="path.endY"
                            r="6.5"
                            fill="none"
                            stroke="#6B7280"
                            stroke-width="1"
                        />
                    </template>
                </g>
            </svg>

            <!-- Scaled wrapper for entire content -->
            <div
                class="flex items-center justify-center gap-8 min-w-0"
                :style="{ transform: `scale(${contentScale})`, transformOrigin: 'center' }"
            >
                <!-- Left Navigation -->
                <MainNav />

                <!-- Diamonds + Connectors + Boxes Container -->
                <div ref="containerRef" class="relative flex items-center gap-8 min-w-0">
                    <!-- Diamond Buttons Section -->
                    <div class="shrink-0" :style="{ marginTop: diamondsMarginTop + 'px' }">
                        <DiamondButtons />
                    </div>

                    <!-- Right side content area -->
                    <div class="relative shrink min-w-0 flex items-center">
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
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{ invisible: !showTear || activeMenuItem !== 'lipid' }"
                            >
                                <SubOptionBox
                                    color="blue"
                                    category="TEAR FILM DEFICIENCIES"
                                    title="LIPID"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="blue"
                                        :items="[
                                            {
                                                name: 'INTERFEROMETRY',
                                                description:
                                                    'grade ≤ 3 (non-amorphous or colored pattern) or <72nm on LipiView 197, 320, 343',
                                            },
                                            {
                                                name: 'MEIBUM EXPRESSIBILITY/QUALITY',
                                                description:
                                                    'meibum not clear or limited expressibility 332, 371, 715',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="blue"
                                        :items="managementItems.lipid"
                                        @update:items="managementItems.lipid = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{ invisible: !showTear || activeMenuItem !== 'aqueous' }"
                            >
                                <SubOptionBox
                                    color="blue"
                                    category="TEAR FILM DEFICIENCIES"
                                    title="AQUEOUS"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="blue"
                                        :items="[
                                            {
                                                name: 'SCHIRMER TEST',
                                                description:
                                                    '≤10mm in 5 minutes without anesthesia',
                                            },
                                            {
                                                name: 'TEAR MENISCUS HEIGHT',
                                                description: '<0.2mm measured by OCT',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="blue"
                                        :items="[
                                            {
                                                name: 'PHENOL RED THREAD',
                                                description: 'Alternative tear volume test',
                                            },
                                            {
                                                name: 'TEAR OSMOLARITY',
                                                description: '>308 mOsm/L indicates deficiency',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="blue"
                                        :items="managementItems.aqueous"
                                        @update:items="managementItems.aqueous = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{
                                    invisible: !showTear || activeMenuItem !== 'mucin-glycocalyx',
                                }"
                            >
                                <SubOptionBox
                                    color="blue"
                                    category="TEAR FILM DEFICIENCIES"
                                    title="MUCIN GLYCOCALYX"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="blue"
                                        :items="[
                                            {
                                                name: 'TEAR BREAK-UP TIME',
                                                description: '<10 seconds indicates instability',
                                            },
                                            {
                                                name: 'IMPRESSION CYTOLOGY',
                                                description: 'Goblet cell density assessment',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="blue"
                                        :items="[
                                            {
                                                name: 'NIBUT MEASUREMENT',
                                                description: 'Non-invasive break-up time',
                                            },
                                            {
                                                name: 'CONFOCAL MICROSCOPY',
                                                description: 'Cellular level analysis',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="blue"
                                        :items="managementItems.mucinGlycocalyx"
                                        @update:items="managementItems.mucinGlycocalyx = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <!-- EYELID Sub-options -->
                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{
                                    invisible:
                                        !showEyelid || activeMenuItem !== 'blink-lid-closure',
                                }"
                            >
                                <SubOptionBox
                                    color="teal"
                                    category="EYELID ANOMALIES"
                                    title="BLINK / LID CLOSURE"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="teal"
                                        :items="[
                                            {
                                                name: 'PARTIAL BLINKING OBSERVATION',
                                                description: '>40% occurrence 463',
                                            },
                                            {
                                                name: 'LAGOPHTHALMOS/INADEQUATE LID SEAL',
                                                description: 'Observed',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="teal"
                                        :items="[
                                            {
                                                name: 'BLINK DYNAMICS ANALYSIS',
                                                description: 'High-speed video recording',
                                            },
                                            {
                                                name: 'LID POSITION ASSESSMENT',
                                                description: 'Margin-reflex distance',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="teal"
                                        :items="managementItems.blinkLidClosure"
                                        @update:items="managementItems.blinkLidClosure = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{
                                    invisible: !showEyelid || activeMenuItem !== 'lid-margin',
                                }"
                            >
                                <SubOptionBox
                                    color="teal"
                                    category="EYELID ANOMALIES"
                                    title="LID MARGIN"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="teal"
                                        :items="[
                                            {
                                                name: 'MEIBOMIAN GLAND EVALUATION',
                                                description: 'Gland dropout and morphology',
                                            },
                                            {
                                                name: 'LID WIPER EPITHELIOPATHY',
                                                description: 'Staining of lid wiper region',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="teal"
                                        :items="[
                                            {
                                                name: 'MEIBOGRAPHY',
                                                description: 'Infrared gland imaging',
                                            },
                                            {
                                                name: 'LID MARGIN SCORING',
                                                description: 'Telangiectasia assessment',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="teal"
                                        :items="managementItems.lidMargin"
                                        @update:items="managementItems.lidMargin = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <!-- OCULAR SURFACE Sub-options -->
                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
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
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'CONJUNCTIVOCHALASIS',
                                                description: 'Redundant conjunctival folds',
                                            },
                                            {
                                                name: 'PINGUECULA/PTERYGIUM',
                                                description: 'Growth evaluation and grading',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'AS-OCT IMAGING',
                                                description: 'Anterior segment visualization',
                                            },
                                            {
                                                name: 'TEAR FILM DYNAMICS',
                                                description: 'Flow pattern analysis',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="purple"
                                        :items="managementItems.anatomicalMisalignment"
                                        @update:items="
                                            managementItems.anatomicalMisalignment = $event
                                        "
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
                                :class="{
                                    invisible:
                                        !showOcular || activeMenuItem !== 'neural-dysfunction',
                                }"
                            >
                                <SubOptionBox
                                    color="purple"
                                    category="OCULAR SURFACE ABNORMALITIES"
                                    title="NEURAL DYSFUNCTION"
                                >
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'CORNEAL SENSITIVITY',
                                                description: 'Cochet-Bonnet esthesiometry',
                                            },
                                            {
                                                name: 'NEUROPATHIC PAIN ASSESSMENT',
                                                description: 'Symptom-sign discordance',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'CONFOCAL MICROSCOPY',
                                                description: 'Corneal nerve evaluation',
                                            },
                                            {
                                                name: 'PROPARACAINE CHALLENGE',
                                                description: 'Pain response testing',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="purple"
                                        :items="managementItems.neuralDysfunction"
                                        @update:items="managementItems.neuralDysfunction = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
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
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'CORNEAL STAINING',
                                                description: 'Fluorescein and lissamine green',
                                            },
                                            {
                                                name: 'CONJUNCTIVAL STAINING',
                                                description: 'Oxford or NEI grading scale',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'IMPRESSION CYTOLOGY',
                                                description: 'Cellular morphology analysis',
                                            },
                                            {
                                                name: 'CONFOCAL MICROSCOPY',
                                                description: 'In vivo cell imaging',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="purple"
                                        :items="managementItems.ocularSurfaceCellular"
                                        @update:items="
                                            managementItems.ocularSurfaceCellular = $event
                                        "
                                    />
                                </SubOptionBox>
                            </div>

                            <div
                                class="absolute top-1/2 -translate-y-1/2 left-0 w-full z-10"
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
                                    <TestingSection
                                        title="STANDARD TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'MMP-9 TESTING',
                                                description: 'InflammaDry point-of-care test',
                                            },
                                            {
                                                name: 'TEAR OSMOLARITY',
                                                description: '>308 mOsm/L or >8 difference',
                                            },
                                        ]"
                                    />
                                    <TestingSection
                                        title="ADVANCED TESTING"
                                        color="purple"
                                        :items="[
                                            {
                                                name: 'CYTOKINE ANALYSIS',
                                                description: 'Inflammatory marker panel',
                                            },
                                            {
                                                name: 'CONJUNCTIVAL REDNESS',
                                                description: 'Objective grading systems',
                                            },
                                        ]"
                                    />
                                    <ManagementSection
                                        color="purple"
                                        :items="managementItems.primaryInflammation"
                                        @update:items="managementItems.primaryInflammation = $event"
                                    />
                                </SubOptionBox>
                            </div>

                            <!-- MAIN CATEGORY BOXES - For layout positioning only -->
                            <!-- TEAR BOX POSITION -->
                            <div data-box="tear" class="relative">
                                <div
                                    :class="{
                                        invisible:
                                            !showTear ||
                                            activeMenuItem !== 'tear-film-deficiencies',
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
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-6">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </main>
</template>
