import {
  defineDocs,
  defineConfig,
  defineCollections,
} from 'fumadocs-mdx/config'
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from 'codehike/mdx'
import { z } from 'zod'

const chConfig: CodeHikeConfig = {
  components: {
    code: 'Code',
  },
}

export const { docs, meta } = defineDocs()

export const blog = defineCollections({
  type: 'doc', // 'doc' or 'meta': https://fumadocs.vercel.app/docs/mdx/configuration#type
  dir: './content/blog',
  schema: z.object({
    title: z.string(),
    publishedOn: z.date(),
    summary: z.string(),
    heroImage: z.string(),
  }),
})

// Shared options of Fumadocs MDX
// https://fumadocs.vercel.app/docs/mdx/configuration#global-options
export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})
