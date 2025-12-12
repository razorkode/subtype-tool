<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import MainNav from '@/components/MainNav.vue'
import DiamondButtons from '@/components/DiamondButtons.vue'
import ContentBoxWithBracket from '@/components/ContentBoxWithBracket.vue'
import HowToUse from '@/components/HowToUse.vue'
import SubOptionPanel from '@/components/SubOptionPanel.vue'
import { useNavigationStore } from '@/stores/navigation'
import { useLayoutStore } from '@/stores/layout'
import { useClinicalDataStore } from '@/stores/clinicalData'

const navigationStore = useNavigationStore()
const layoutStore = useLayoutStore()
const clinicalDataStore = useClinicalDataStore()

const containerRef = ref(null)

// Watch for changes and recalculate layout (including top offset for visible content)
watch([() => navigationStore.selectedDiamond, () => navigationStore.activeMenuItem], async () => {
    await nextTick()
    setTimeout(updateLayout, 50)
})

const updateLayout = async () => {
    layoutStore.setContainerRef(containerRef.value)
    await layoutStore.updateLayout(nextTick)
}

onMounted(() => {
    setTimeout(updateLayout, 200)
    window.addEventListener('resize', updateLayout)
})

// Get all subcategory IDs for rendering
const allSubcategoryIds = clinicalDataStore.getAllSubcategoryIds()
</script>

<template>
    <main class="h-screen flex flex-col mx-auto p-8 overflow-auto">
        <!-- Main Content (Above Footer) -->
        <div class="flex-1 flex items-start justify-center gap-8 min-w-0 relative min-h-0">
            <!-- SVG Connector Lines Overlay -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 20">
                <g
                    v-for="path in layoutStore.svgPaths"
                    :key="path.id"
                    :class="{
                        invisible:
                            layoutStore.showHowToUse ||
                            (path.id === 'tear' && !layoutStore.showTear) ||
                            (path.id === 'eyelid' && !layoutStore.showEyelid) ||
                            (path.id === 'ocular' && !layoutStore.showOcular),
                    }"
                >
                    <!-- Connector line -->
                    <path
                        :d="
                            path.isStraight
                                ? `M ${path.startX} ${path.startY} L ${path.endX + 2} ${path.endY}`
                                : `M ${path.startX} ${path.startY}
                                   C ${path.startX + 50} ${path.startY},
                                     ${path.endX - 50} ${path.endY},
                                     ${path.endX + 6} ${path.endY}`
                        "
                        stroke="#D1D5DB"
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
                        stroke="#D1D5DB"
                        stroke-width="1"
                    />
                    <!-- End dot (on box) - only for sub-options -->
                    <template v-if="!layoutStore.shouldShowBracket(path.id)">
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
                            stroke="#D1D5DB"
                            stroke-width="1"
                        />
                    </template>
                </g>
            </svg>

            <!-- Content wrapper - with dynamic top offset to prevent clipping -->
            <div
                class="flex items-center justify-center gap-8 min-w-0"
                :style="{ marginTop: layoutStore.contentTopOffset + 'px' }"
            >
                <!-- Left Navigation -->
                <MainNav />

                <!-- Diamonds + Connectors + Boxes Container -->
                <div ref="containerRef" class="relative flex items-center gap-8 min-w-0">
                    <!-- Diamond Buttons Section -->
                    <div
                        class="shrink-0"
                        :style="{ marginTop: layoutStore.diamondsMarginTop + 'px' }"
                    >
                        <DiamondButtons />
                    </div>

                    <!-- Right side content area -->
                    <div class="relative shrink min-w-0 flex items-center">
                        <!-- How to Use Box (shown by default) -->
                        <div :class="{ invisible: !layoutStore.showHowToUse }">
                            <HowToUse />
                        </div>

                        <!-- Content Boxes Container -->
                        <div
                            data-boxes-container
                            class="flex flex-col gap-12 absolute top-0 left-0 w-full"
                            :style="{ marginTop: layoutStore.boxesMarginTop + 'px' }"
                            :class="{ invisible: layoutStore.showHowToUse }"
                        >
                            <!-- All Sub-Option Panels - Dynamically rendered -->
                            <SubOptionPanel
                                v-for="subcategoryId in allSubcategoryIds"
                                :key="subcategoryId"
                                :subcategory-id="subcategoryId"
                            />

                            <!-- MAIN CATEGORY BOXES - For layout positioning -->
                            <!-- TEAR BOX -->
                            <div data-box="tear" class="relative">
                                <div
                                    :class="{
                                        invisible:
                                            !layoutStore.showTear ||
                                            layoutStore.activeMenuItem !== 'tear-film-deficiencies',
                                    }"
                                >
                                    <ContentBoxWithBracket
                                        color="blue"
                                        title="TEAR FILM DEFICIENCIES"
                                        bracketConnect="top"
                                    >
                                        <ul class="list-disc list-inside space-y-1 text-sm">
                                            <li
                                                class="cursor-pointer hover:text-[#3AADE1] transition-colors"
                                                @click="navigationStore.setActiveMenuItem('lipid')"
                                            >
                                                Lipid
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#3AADE1] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem('aqueous')
                                                "
                                            >
                                                Aqueous
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#3AADE1] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'mucin-glycocalyx',
                                                    )
                                                "
                                            >
                                                Mucin/glycocalyx
                                            </li>
                                        </ul>
                                    </ContentBoxWithBracket>
                                </div>
                            </div>

                            <!-- EYELID BOX -->
                            <div data-box="eyelid" class="relative">
                                <div
                                    :class="{
                                        invisible:
                                            !layoutStore.showEyelid ||
                                            layoutStore.activeMenuItem !== 'eyelid-anomalies',
                                    }"
                                >
                                    <ContentBoxWithBracket
                                        color="teal"
                                        title="EYELID ANOMALIES"
                                        bracketConnect="top"
                                    >
                                        <ul class="list-disc list-inside space-y-1 text-sm">
                                            <li
                                                class="cursor-pointer hover:text-[#52A5A4] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'blink-lid-closure',
                                                    )
                                                "
                                            >
                                                Blink / lid closure
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#52A5A4] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem('lid-margin')
                                                "
                                            >
                                                Lid margin
                                            </li>
                                        </ul>
                                    </ContentBoxWithBracket>
                                </div>
                            </div>

                            <!-- OCULAR BOX -->
                            <div data-box="ocular" class="relative">
                                <div
                                    :class="{
                                        invisible:
                                            !layoutStore.showOcular ||
                                            layoutStore.activeMenuItem !==
                                                'ocular-surface-abnormalities',
                                    }"
                                >
                                    <ContentBoxWithBracket
                                        color="purple"
                                        title="OCULAR SURFACE ABNORMALITIES"
                                        bracketConnect="bottom"
                                    >
                                        <ul class="list-disc list-inside space-y-1 text-sm">
                                            <li
                                                class="cursor-pointer hover:text-[#7B5295] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'anatomical-misalignment',
                                                    )
                                                "
                                            >
                                                Anatomical misalignment
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#7B5295] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'neural-dysfunction',
                                                    )
                                                "
                                            >
                                                Neural dysfunction
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#7B5295] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'ocular-surface-cellular',
                                                    )
                                                "
                                            >
                                                Ocular surface cellular damage/disruption
                                            </li>
                                            <li
                                                class="cursor-pointer hover:text-[#7B5295] transition-colors"
                                                @click="
                                                    navigationStore.setActiveMenuItem(
                                                        'primary-inflammation',
                                                    )
                                                "
                                            >
                                                Primary inflammation/oxidative stress
                                            </li>
                                        </ul>
                                    </ContentBoxWithBracket>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
