import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "./", // <- essencial para o build funcionar no Electron
  build: {
    outDir: "dist",
  },
})
