<script setup></script>

<template>
    <nav class="bg-slate-800 text-white py-4 shadow-md">
        <div class="max-w-6xl mx-auto px-8 flex justify-between items-center">
            <div>
                <router-link
                    to="/"
                    class="text-2xl font-bold text-white no-underline hover:text-emerald-400 transition-colors"
                >
                    Subtype Tool
                </router-link>
            </div>
            <ul class="flex list-none m-0 p-0 gap-8">
                <li>
                    <router-link
                        to="/"
                        class="text-white no-underline font-medium transition-colors py-2 hover:text-emerald-400 [&.router-link-active]:text-emerald-400 [&.router-link-active]:border-b-2 [&.router-link-active]:border-emerald-400"
                    >
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/about"
                        class="text-white no-underline font-medium transition-colors py-2 hover:text-emerald-400 [&.router-link-active]:text-emerald-400 [&.router-link-active]:border-b-2 [&.router-link-active]:border-emerald-400"
                    >
                        About
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/contact"
                        class="text-white no-underline font-medium transition-colors py-2 hover:text-emerald-400 [&.router-link-active]:text-emerald-400 [&.router-link-active]:border-b-2 [&.router-link-active]:border-emerald-400"
                    >
                        Contact
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
