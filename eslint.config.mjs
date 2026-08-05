import { defineConfig } from 'eslint/config'
import next from 'eslint-config-next'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  ...next,
  prettier,
  {
    ignores: ['.next/**', '.source/**', 'node_modules/**'],
  },
])
