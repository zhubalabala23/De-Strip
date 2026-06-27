import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Restore charachter.png if missing from dist/assets
const srcCharPath = path.resolve('src/assets/images/charachter.png')
if (!fs.existsSync(srcCharPath)) {
  const distAssetsDir = path.resolve('dist/assets')
  if (fs.existsSync(distAssetsDir)) {
    const files = fs.readdirSync(distAssetsDir)
    const charFile = files.find(f => f.startsWith('charachter') && f.endsWith('.png'))
    if (charFile) {
      fs.mkdirSync(path.dirname(srcCharPath), { recursive: true })
      fs.copyFileSync(path.join(distAssetsDir, charFile), srcCharPath)
      console.log('Restored charachter.png from dist/assets')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
