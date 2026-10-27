# 02-React-Setup - Vite

Welcome to this comprehensive guide on **Vite**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
Vite is a modern frontend build tool that is extremely fast. It uses native ES modules in the browser during development and builds optimized assets with Rollup for production.

---

## 2. Why It Exists
Web bundlers like Webpack became slow when projects grew large. Vite provides instant server starts and updates.

---

## 3. Problem It Solves
Webpack had to bundle the entire project before launching the dev server, causing slow startup times.

---

## 4. Internal Working
Vite serves source code over native ESM, letting the browser compile dependencies on-demand.

---

## 5. Architecture Diagram
```
[Browser Request] ---> [Vite Dev Server (Native ESM)] ---> [Compile On-Demand] ---> [Browser Render]
```

---

## 6. Complete Syntax
```javascript
npm create vite@latest my-react-app -- --template react
```

---

## 7. Beginner Example
```javascript
// vite.config.js basic setup
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```
**Explanation:**
Imports defineConfig from Vite. Configures official React plugin support.

---

## 8. Intermediate Example
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```
**Explanation:**
Sets custom local server ports and launches browser automatically.

---

## 9. Advanced Example
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
```
**Explanation:**
Splits third-party vendor code from main source chunks for optimized caching.

---

## 10. Real World Example
```javascript
// vite.config.js with alias routing
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```
**Explanation:**
Enables clean importing absolute syntax structures using '@' prefix.

---

## 11. Production Example
```javascript
// Production configured environment loading
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
```
**Explanation:**
Injects custom production node environments dynamically based on current modes.

---

## 12. Folder Structure
```
my-app/
├── vite.config.js
├── package.json
└── src/
```

---

## 13. Interview Questions
- **Q1:** Why is Vite faster than Webpack?
  *Answer:* Webpack bundles all source files before running. Vite serves files directly as native ES modules, compile-on-demand.

---

## 14. Common Mistakes
- **Mistake:** Accessing variables via process.env.
  *Solution:* Use import.meta.env inside Vite.

---

## 15. Best Practices
Keep your bundle light by splitting vendors into separate chunks.

---

## 16. Performance Considerations
Vite dev server compiles only the files currently active in browser viewport.

---

## 17. Security Considerations
Enforce safe environment variable loads using VITE_ prefix naming.

---

## 18. Exercises
Configure Vite to run on port 8080 with CORS proxy configurations.

---

## 19. Solutions
Set proxy object mappings inside server config parameters.

---

## 20. Summary
Vite represents the standard development stack for modern React developers.
