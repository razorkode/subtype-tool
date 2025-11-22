<script setup>
import MainNav from '@/components/MainNav.vue'
</script>

<template>
    <div class="flex min-h-screen">
        <!-- Left Navigation -->
        <aside class="w-[350px] p-8">
            <MainNav />
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
            <div class="relative min-h-screen bg-white p-8">
                <div class="max-w-[1050px] mx-auto grid grid-cols-[1fr_400px] gap-8">
                    <!-- Main Column - Diamond Buttons -->
                    <div class="flex items-center justify-center">
                        <!-- Diamond Grid (rotated) -->
                        <div class="transform rotate-45">
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Tear Film Deficiencies Diamond -->
                                <div
                                    class="bg-cyan-100 border-4 border-cyan-400 rounded-lg w-32 h-32 flex items-center justify-center"
                                >
                                    <div class="transform -rotate-45 text-center px-2">
                                        <div class="text-xs font-semibold text-cyan-800">
                                            TEAR FILM<br />DEFICIENCIES
                                        </div>
                                    </div>
                                </div>

                                <!-- Eyelid Anomalies Diamond -->
                                <div
                                    class="bg-teal-100 border-4 border-teal-500 rounded-lg w-32 h-32 flex items-center justify-center"
                                >
                                    <div class="transform -rotate-45 text-center px-2">
                                        <div class="text-xs font-semibold text-teal-800">
                                            EYELID<br />ANOMALIES
                                        </div>
                                    </div>
                                </div>

                                <!-- Title in grid position -->
                                <div
                                    class="w-32 h-32 flex items-center justify-start overflow-visible -ml-[60px] mt-[26px]"
                                >
                                    <div
                                        class="transform -rotate-45 text-left text-gray-600 text-2xl font-semibold uppercase leading-tight whitespace-nowrap"
                                    >
                                        DRY EYE RELIEF<br />& MANAGEMENT
                                    </div>
                                </div>

                                <!-- Ocular Surface Abnormalities Diamond -->
                                <div
                                    class="bg-purple-100 border-4 border-purple-600 rounded-lg w-32 h-32 flex items-center justify-center"
                                >
                                    <div class="transform -rotate-45 text-center px-2">
                                        <div class="text-xs font-semibold text-purple-800">
                                            OCULAR SURFACE<br />ABNORMALITIES
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - How to Use Panel -->
                    <div class="relative">
                        <!-- Tab at top -->
                        <div
                            class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-100 px-8 py-3 rounded-t-2xl"
                        >
                            <div class="text-[#05319B] font-bold text-sm">HOW<br />TO USE</div>
                        </div>

                        <!-- Main content box -->
                        <div
                            class="border-4 border-gray-300 rounded-3xl p-8 bg-white min-h-[600px]"
                        >
                            <h2 class="text-4xl font-bold text-[#05319B] mb-4">Welcome.</h2>

                            <p class="text-gray-700 mb-6">
                                The Dry Eye Relief & Management Tool generates applicable management
                                techniques based on mitigation and measurement.
                            </p>

                            <h3 class="text-lg font-bold text-[#05319B] mb-2">
                                HOW TO USE THE DRY EYE RELIEF & MANAGEMENT TOOL
                            </h3>

                            <p class="text-gray-700 mb-4">
                                First,
                                <span class="font-semibold">select a category on the left</span> –
                                Tear Film Deficiencies, Eyelid Anomalies, or Ocular Surface
                                Abnormalities.
                            </p>

                            <p class="text-gray-700 mb-4">
                                Then,
                                <span class="font-semibold">select a sub-category</span> within the
                                main selected category to further classify the dry eye type. You can
                                select multiple sub-categories and use the Next/Previous buttons to
                                flip between your selected choices.
                            </p>

                            <p class="text-gray-700">
                                Finally,
                                <span class="font-semibold"
                                    >select the preferred dry eye disease management options</span
                                >
                                from the pop-up menu. Send a report to your email by selecting the
                                Email button in the pop-up menu.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="absolute bottom-8 left-8 text-xs text-gray-500">
                    © 2025 Alcon Inc. GLB/IMG-SYC-2500004
                </div>
            </div>
        </main>
    </div>
</template>
