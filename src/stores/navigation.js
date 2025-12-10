import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
    const activeMenuItem = ref(null)
    // Track which diamond is selected: 'tear', 'eyelid', 'ocular', or null (shows How to Use)
    const selectedDiamond = ref(null)

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

    return { activeMenuItem, setActiveMenuItem, selectedDiamond, setSelectedDiamond, clearSelection }
})
