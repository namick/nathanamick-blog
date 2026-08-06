import { createMDX } from 'fumadocs-mdx/next'

// MDX plugins (including Code Hike) are configured in `source.config.ts`.
const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    // Next 16 treats this as an allowlist; a `quality` outside it is silently
    // coerced to 75. 90 is the top of the useful range for these covers —
    // past it the encoder spends bytes on detail nobody can see.
    qualities: [75, 90],
  },
}

export default withMDX(config)
