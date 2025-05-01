import antfu from '@antfu/eslint-config'
import pluginQuasar from 'eslint-plugin-quasar'

export default antfu(
  {
    stylistic: true,
    vue: true,
    typescript: true,
    ignores: [
      '.quasar/',
      'dist/',
      'src-capacitor/',
      'src-cordova/',
      'node_modules/',
      '*.md',
    ],
  },

  // --- Настройки для Quasar ---
  {
    files: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
    plugins: {
      quasar: pluginQuasar,
    },
    rules: {
      // --- ВРЕМЕННО ОТКЛЮЧАЕМ ПРАВИЛА, ВЫЗЫВАЮЩИЕ ОШИБКУ ---
      'quasar/no-legacy-components': 'off',
      'quasar/no-legacy-directives': 'off',
      'quasar/no-legacy-properties': 'off',
      'quasar/no-invalid-qfield-usage': 'off',

      // --- Оставляем только те правила Quasar, которые НЕ вызывают ошибок (если такие есть) ---

      // --- переопределения правил Antfu/Stylistic ---
    },
  },

  {
    files: ['src/router/index.js', 'src/router/index.ts'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
