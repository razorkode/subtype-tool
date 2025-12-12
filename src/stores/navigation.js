import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
    const activeMenuItem = ref(null)
    // Track which diamond is selected: 'tear', 'eyelid', 'ocular', or null (shows How to Use)
    const selectedDiamond = ref(null)

    // Define subcategory order for each main category
    const subcategories = {
        tear: ['lipid', 'aqueous', 'mucin-glycocalyx'],
        eyelid: ['blink-lid-closure', 'lid-margin'],
        ocular: [
            'anatomical-misalignment',
            'neural-dysfunction',
            'ocular-surface-cellular',
            'primary-inflammation',
        ],
    }

    // Computed properties to check if previous/next should be disabled
    const isFirstSubcategory = computed(() => {
        if (!selectedDiamond.value || !activeMenuItem.value) return true
        const subs = subcategories[selectedDiamond.value]
        if (!subs) return true
        return subs.indexOf(activeMenuItem.value) === 0
    })

    const isLastSubcategory = computed(() => {
        if (!selectedDiamond.value || !activeMenuItem.value) return true
        const subs = subcategories[selectedDiamond.value]
        if (!subs) return true
        return subs.indexOf(activeMenuItem.value) === subs.length - 1
    })

    function setActiveMenuItem(menuItem) {
        activeMenuItem.value = menuItem
    }

    function setSelectedDiamond(diamond) {
        selectedDiamond.value = diamond
    }

    function clearSelection() {
        selectedDiamond.value = null
        activeMenuItem.value = null
    }

    function navigatePrevious() {
        if (!selectedDiamond.value || !activeMenuItem.value) return
        const subs = subcategories[selectedDiamond.value]
        if (!subs) return
        const currentIndex = subs.indexOf(activeMenuItem.value)
        if (currentIndex > 0) {
            activeMenuItem.value = subs[currentIndex - 1]
        }
    }

    function navigateNext() {
        if (!selectedDiamond.value || !activeMenuItem.value) return
        const subs = subcategories[selectedDiamond.value]
        if (!subs) return
        const currentIndex = subs.indexOf(activeMenuItem.value)
        if (currentIndex < subs.length - 1) {
            activeMenuItem.value = subs[currentIndex + 1]
        }
    }

    return {
        activeMenuItem,
        setActiveMenuItem,
        selectedDiamond,
        setSelectedDiamond,
        clearSelection,
        isFirstSubcategory,
        isLastSubcategory,
        navigatePrevious,
        navigateNext,
    }
})
