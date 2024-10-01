import {
  defineDocs,
  defineConfig,
  defineCollections,
} from 'fumadocs-mdx/config'
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from 'codehike/mdx'
// import { z } from 'zod'

const chConfig: CodeHikeConfig = {
  components: {
    code: 'Code',
  },
}

export const { docs, meta } = defineDocs()

export const blog = defineCollections({
  type: 'doc',
  dir: './content/blog',
  // schema: z.object({
  //   name: z.string(),
  // }),
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})
