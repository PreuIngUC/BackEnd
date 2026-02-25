// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Plugins que sí usaremos
import json from '@eslint/json'
import markdown from '@eslint/markdown'

import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  // Ignora lo que no quieres lintar globalmente
  globalIgnores([
    'dist/**',
    'node_modules/**',
    'package-lock.json',
    'eslint.config.ts',
    'tsconfig*.json',
  ]),

  // 1) Configuración Principal (Node.js + TypeScript)
  // (Combina tu "Bloque 1" y "Bloque 2", eliminando React)
  {
    files: [
      'src/**/*.{ts,js}', // <- Tu código fuente del backend
      '*.config.ts', // <- Tus archivos de config (como este)
    ],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended, // Reglas recomendadas de TS
      prettier, // Desactiva reglas de formato (SIEMPRE AL FINAL)
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // <-- CLAVE: Usa globals de Node.js (no 'browser')
    },
    rules: {
      // Mantenemos tu regla de 'no-explicit-any'
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // El resto de reglas de formato (max-len, semi, indent)
      // se las dejamos a Prettier.
    },
  },

  // 2) JSON (Esto es útil para el backend)
  {
    files: ['**/*.json'],
    language: 'json/json',
    extends: [json.configs.recommended],
  },

  // 3) Markdown (Esto es útil para tu README)
  {
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    extends: [markdown.configs.recommended],
  },

  // (Eliminamos el bloque de CSS, como pediste)
])
