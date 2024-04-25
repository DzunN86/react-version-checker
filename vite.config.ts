import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from "child_process";

// Get current tag/commit and last commit date from git
const version = execSync("./scripts/get-version.sh").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
