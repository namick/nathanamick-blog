import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import { createPreset } from 'fumadocs-ui/tailwind-plugin'

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography],
  presets: [
    createPreset({
      // purple, default: defaultPreset, ocean: oceanPreset, catppuccin, neutral, dusk
      preset: 'catppuccin',
    }),
  ],
}

export default config
