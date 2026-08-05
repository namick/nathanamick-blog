import { createMDX } from 'fumadocs-mdx/next'

// MDX plugins (including Code Hike) are configured in `source.config.ts`.
const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
}

export default withMDX(config)
