import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx'
import { createMDX } from 'fumadocs-mdx/next'
import { remarkImage } from 'fumadocs-core/mdx-plugins'

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: {
    code: 'Code',
  },
}

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkImage, [remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
}

export default withMDX(config)
