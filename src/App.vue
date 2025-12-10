<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'

const containerRef = ref(null)
const svgPaths = ref([])
const tearBoxTop = ref('0px')
const eyelidBoxTop = ref('180px')
const ocularBoxTop = ref('360px')

// Colors for each connector
const colors = {
    blue: '#3AADE1',
    teal: '#52A5A4',
    purple: '#7B5295',
}

onMounted(() => {
    // Wait for everything to render
    setTimeout(async () => {
        positionBoxes()
        await nextTick()
        // Recalculate after positions applied
        setTimeout(() => {
            calculatePaths()
        }, 50)
    }, 200)
    window.addEventListener('resize', async () => {
        positionBoxes()
        await nextTick()
        setTimeout(() => {
            calculatePaths()
        }, 50)
    })
})

const positionBoxes = () => {
    if (!containerRef.value) return

    const container = containerRef.value.getBoundingClientRect()
    const eyelidDiamond = document.querySelector('[data-diamond="eyelid"]')
    const tearBox = document.querySelector('[data-box="tear"]')
    const eyelidBox = document.querySelector('[data-box="eyelid"]')
    const ocularBox = document.querySelector('[data-box="ocular"]')

    if (!eyelidDiamond || !tearBox || !eyelidBox || !ocularBox) return

    const eyelidDiamondRect = eyelidDiamond.getBoundingClientRect()
    const tearBoxRect = tearBox.getBoundingClientRect()
    const eyelidBoxRect = eyelidBox.getBoundingClientRect()

    // The diamond's connector point Y position
    const diamondConnectorY = eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47

    // Position the eyelid box so its center aligns with diamond connector
    const eyelidBoxCenter = eyelidBoxRect.height / 2
    const eyelidTop = diamondConnectorY - container.top - eyelidBoxCenter

    // Even spacing between boxes (enough room for brackets)
    const boxSpacing = 50

    // Position tear box above eyelid box with even spacing
    const tearTop = eyelidTop - tearBoxRect.height - boxSpacing

    // Position ocular box below eyelid box with even spacing
    const ocularTop = eyelidTop + eyelidBoxRect.height + boxSpacing

    tearBoxTop.value = `${Math.max(0, tearTop)}px`
    eyelidBoxTop.value = `${eyelidTop}px`
    ocularBoxTop.value = `${ocularTop}px`
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
    // Blue: center of top-right diagonal edge
    // Teal: right corner (rightmost point) - straight horizontal line
    // Purple: center of bottom-right diagonal edge
    const tealStartY = eyelidDiamondRect.top + eyelidDiamondRect.height * 0.47 - container.top

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
            // Right corner - straight horizontal line
            startX: eyelidDiamondRect.right - 10 - container.left,
            startY: tealStartY,
            endX: eyelidBoxRect.left - container.left,
            // Use same Y to make line straight (box is now aligned)
            endY: tealStartY,
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
                        <!-- Curved connector line -->
                        <path
                            :d="`M ${path.startX} ${path.startY}
                                 C ${path.startX + 50} ${path.startY},
                                   ${path.endX - 50} ${path.endY},
                                   ${path.endX} ${path.endY}`"
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

                <!-- Content Boxes with Brackets - evenly spaced, middle aligned with diamond -->
                <div
                    class="relative w-full max-w-[420px] min-w-[310px] shrink"
                    style="height: 580px"
                >
                    <div data-box="tear" class="absolute left-0" :style="{ top: tearBoxTop }">
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

                    <div data-box="eyelid" class="absolute left-0" :style="{ top: eyelidBoxTop }">
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

                    <div data-box="ocular" class="absolute left-0" :style="{ top: ocularBoxTop }">
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
