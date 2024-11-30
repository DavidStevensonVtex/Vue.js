/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),

  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          "singleline": 4, // Max attributes per line when opening tag is on a single line
          "multiline": {
            "max": 4,    // Max attributes per line when opening tag is on multiple lines
            "allowFirstLine": true // Allow multiple attributes on the first line of a multiline element
          }
        }
    ],
      'vue/multi-word-component-names': 'off',
    }
  }
]
