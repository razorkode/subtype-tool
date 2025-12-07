import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
    const activeMenuItem = ref(null)

    function setActiveMenuItem(menuItem) {
        activeMenuItem.value = menuItem
    }

    return { activeMenuItem, setActiveMenuItem }
})
