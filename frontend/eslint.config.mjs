import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'


const eslintConfig = defineConfig([
  ...nextVitals,
  ...prettierConfig
])

export default eslintConfig
