<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'

const containerRef = ref(null)
const svgPaths = ref([])
const boxesTopPadding = ref('0px')

// Colors for each connector
const colors = {
    blue: '#3AADE1',
    teal: '#52A5A4',
    purple: '#7B5295',
}

onMounted(() => {
    // Wait for everything to render
    setTimeout(async () => {
        alignBoxes()
        await nextTick()
        calculatePaths()
    }, 200)
    window.addEventListener('resize', async () => {
        alignBoxes()
        await nextTick()
        calculatePaths()
    })
})

const alignBoxes = () => {
    const eyelidDiamond = document.querySelector('[data-diamond="eyelid"]')
    const eyelidBox = document.querySelector('[data-box="eyelid"]')
    const boxesContainer = document.querySelector('[data-boxes-container]')

    if (!eyelidDiamond || !eyelidBox || !boxesContainer) return

    const eyelidDiamondRect = eyelidDiamond.getBoundingClientRect()
    const eyelidBoxRect = eyelidBox.getBoundingClientRect()
    const containerRect = boxesContainer.getBoundingClientRect()

    // Diamond connector Y position
    const diamondY = eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47

    // Current box center Y position
    const boxCenterY = eyelidBoxRect.top + eyelidBoxRect.height / 2

    // Calculate offset needed
    const offset = diamondY - boxCenterY

    boxesTopPadding.value = `${Math.max(0, offset)}px`
}

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
        console.log('Missing elements')
        return
    }

    const tearDiamondRect = tearDiamond.getBoundingClientRect()
    const eyelidDiamondRect = eyelidDiamond.getBoundingClientRect()
    const ocularDiamondRect = ocularDiamond.getBoundingClientRect()

    const tearBoxRect = tearBox.getBoundingClientRect()
    const eyelidBoxRect = eyelidBox.getBoundingClientRect()
    const ocularBoxRect = ocularBox.getBoundingClientRect()

    // Calculate relative positions within container
    const paths = [
        {
            color: colors.blue,
            // Center of top-right edge
            startX: tearDiamondRect.left + tearDiamondRect.width * 0.75 - container.left,
            startY: tearDiamondRect.top + tearDiamondRect.height * 0.24 - container.top,
            endX: tearBoxRect.left - container.left,
            endY: tearBoxRect.top + tearBoxRect.height / 2 - container.top,
        },
        {
            color: colors.teal,
            // Right corner - straight horizontal line (boxes are aligned so Y matches)
            startX: eyelidDiamondRect.right - 10 - container.left,
            startY: eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47 - container.top,
            endX: eyelidBoxRect.left - container.left,
            endY: eyelidBoxRect.top + eyelidBoxRect.height / 2 - container.top,
            isStraight: true,
        },
        {
            color: colors.purple,
            // Center of bottom-right edge
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
    <main class="flex min-h-screen flex-col min-w-5xl mx-auto p-8">
        <!-- Main Content (Above Footer) -->
        <div class="flex items-start justify-center gap-8">
            <!-- Left Navigation -->
            <MainNav />

            <!-- Diamonds + Connectors + Boxes Container -->
            <div ref="containerRef" class="relative flex items-center gap-8">
                <!-- Diamond Buttons Section -->
                <div class="shrink-0">
                    <DiamondButtons />
                </div>

                <!-- SVG Connector Lines Overlay -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 5">
                    <g v-for="(path, index) in svgPaths" :key="index">
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

                <!-- Content Boxes with Brackets - flex column layout for responsiveness -->
                <div
                    data-boxes-container
                    class="flex flex-col gap-12"
                    :style="{ paddingTop: boxesTopPadding }"
                >
                    <div data-box="tear">
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

                    <div data-box="eyelid">
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

                    <div data-box="ocular">
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

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-6">© 2025 Alcon Inc. GLB/IMG-SYC-2500004</div>
    </main>
</template>
