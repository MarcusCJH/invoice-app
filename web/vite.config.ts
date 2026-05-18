import { defineConfig } from "vite";

// Use repo name for GitHub project Pages: https://<user>.github.io/invoice-app/
export default defineConfig({
  // GitHub project Pages: set VITE_BASE=/your-repo-name/ when building for deploy
  base: process.env.VITE_BASE || "/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
