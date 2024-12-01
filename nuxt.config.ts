export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/vee-validate.js", "~/plugins/vue-toastification.ts"],
  css: ["@/styles/tailwind.css", "@/styles/fonts.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-11-30",
});
