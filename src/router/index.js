import { createRouter, createMemoryHistory } from 'vue-router'
import ComponentPage from '@/pages/ComponentPage.vue'
import ToolPage from '@/pages/ToolPage.vue'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ComponentPage,
        },
        {
            path: '/tool',
            name: 'tool',
            component: ToolPage,
        },
    ],
})

export default router
