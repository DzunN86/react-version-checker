import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from "child_process";
import fs from 'fs';
import path from 'path';

// get version from package.json and git
const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
const version = packageJson.version;
const gitCommitCount = execSync('git rev-list --count HEAD').toString().trim();
const gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
const appVersion = `${version}-${gitCommitCount}-${gitCommitHash}`;

// sync version to public folder
const signature = {version: appVersion};
fs.writeFileSync(path.join(__dirname, './public/signature.json'), JSON.stringify(signature, null, 2));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __VERSION_CHECK_INTERVAL__: 1000 * 30, // check new version every 30 seconds
  },
})
