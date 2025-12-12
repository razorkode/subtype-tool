import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNavigationStore } from './navigation'

export const useLayoutStore = defineStore('layout', () => {
    const navigationStore = useNavigationStore()

    // Layout state
    const svgPaths = ref([])
    const boxesMarginTop = ref(0)
    const diamondsMarginTop = ref(0)
    const contentTopOffset = ref(0)
    const containerRef = ref(null)

    // Colors for each connector
    const colors = {
        blue: '#3AADE1',
        teal: '#52A5A4',
        purple: '#7B5295',
    }

    // Computed properties for visibility
    const showHowToUse = computed(() => navigationStore.selectedDiamond === null)
    const showTear = computed(() => navigationStore.selectedDiamond === 'tear')
    const showEyelid = computed(() => navigationStore.selectedDiamond === 'eyelid')
    const showOcular = computed(() => navigationStore.selectedDiamond === 'ocular')
    const activeMenuItem = computed(() => navigationStore.activeMenuItem)

    // Helper to check if we should show bracket (main category) or end dot (sub-option)
    function shouldShowBracket(diamondId) {
        if (diamondId === 'tear') return activeMenuItem.value === 'tear-film-deficiencies'
        if (diamondId === 'eyelid') return activeMenuItem.value === 'eyelid-anomalies'
        if (diamondId === 'ocular') return activeMenuItem.value === 'ocular-surface-abnormalities'
        return false
    }

    // Check if a subcategory should be visible
    function isSubcategoryVisible(subcategoryId, diamond) {
        if (diamond === 'tear') return showTear.value && activeMenuItem.value === subcategoryId
        if (diamond === 'eyelid') return showEyelid.value && activeMenuItem.value === subcategoryId
        if (diamond === 'ocular') return showOcular.value && activeMenuItem.value === subcategoryId
        return false
    }

    // Calculate SVG connector paths
    function calculatePaths() {
        if (!containerRef.value) return

        // Get the main content area that contains the SVG
        const mainContent = containerRef.value.parentElement.parentElement
        const svgContainer = mainContent.getBoundingClientRect()

        // Get diamond button positions
        const tearDiamond = document.querySelector('[data-diamond="tear"]')
        const eyelidDiamond = document.querySelector('[data-diamond="eyelid"]')
        const ocularDiamond = document.querySelector('[data-diamond="ocular"]')

        // Get content box positions
        const tearBox = document.querySelector('[data-box="tear"]')
        const eyelidBox = document.querySelector('[data-box="eyelid"]')
        const ocularBox = document.querySelector('[data-box="ocular"]')

        if (
            !tearDiamond ||
            !eyelidDiamond ||
            !ocularDiamond ||
            !tearBox ||
            !eyelidBox ||
            !ocularBox
        ) {
            return
        }

        const tearDiamondRect = tearDiamond.getBoundingClientRect()
        const eyelidDiamondRect = eyelidDiamond.getBoundingClientRect()
        const ocularDiamondRect = ocularDiamond.getBoundingClientRect()

        const tearBoxRect = tearBox.getBoundingClientRect()
        const eyelidBoxRect = eyelidBox.getBoundingClientRect()
        const ocularBoxRect = ocularBox.getBoundingClientRect()

        // Calculate positions relative to the SVG container
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

    // Update layout measurements (alignment only, no scaling)
    async function updateLayout(nextTick) {
        // First reset margins to measure true positions
        boxesMarginTop.value = 0
        diamondsMarginTop.value = 0
        contentTopOffset.value = 0
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
            boxesMarginTop.value = offset
            diamondsMarginTop.value = 0
        } else {
            diamondsMarginTop.value = -offset
            boxesMarginTop.value = 0
        }

        await nextTick()

        // Calculate how much the visible content extends above the container
        calculateContentTopOffset()

        await nextTick()
        calculatePaths()
    }

    // Calculate how much top offset is needed to prevent content from being cut off
    function calculateContentTopOffset() {
        // Find the currently visible SubOptionPanel or content box
        const visiblePanel = document.querySelector(
            '[data-boxes-container] > div:not(.invisible) .absolute:not(.invisible)',
        )

        if (!visiblePanel) {
            contentTopOffset.value = 0
            return
        }

        const panelRect = visiblePanel.getBoundingClientRect()

        // Calculate how much the panel extends above the main padding area (32px from p-8)
        const mainPadding = 32
        const overflow = mainPadding - panelRect.top

        // Only apply if there's actual overflow
        contentTopOffset.value = overflow > 0 ? overflow : 0
    }

    function setContainerRef(ref) {
        containerRef.value = ref
    }

    return {
        // State
        svgPaths,
        boxesMarginTop,
        diamondsMarginTop,
        contentTopOffset,
        colors,

        // Computed
        showHowToUse,
        showTear,
        showEyelid,
        showOcular,
        activeMenuItem,

        // Methods
        shouldShowBracket,
        isSubcategoryVisible,
        calculatePaths,
        updateLayout,
        setContainerRef,
    }
})
