import {
  defineDocs,
  defineConfig,
  defineCollections,
} from 'fumadocs-mdx/config'
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema'
import {
  remarkCodeHike,
  recmaCodeHike,
  type CodeHikeConfig,
} from 'codehike/mdx'
import { z } from 'zod'

const chConfig: CodeHikeConfig = {
  components: {
    code: 'Code',
  },
}

export const docs = defineDocs({
  dir: 'content/docs',
  docs: { schema: pageSchema },
  meta: { schema: metaSchema },
})

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    // Frontmatter dates arrive as strings now, so coerce rather than require a Date
    publishedOn: z.coerce.date(),
    summary: z.string(),
    heroImage: z.string(),
    // Absent means published, so no existing post needs touching. See lib/blog.ts
    // for what "draft" actually hides.
    draft: z.boolean().default(false),
  }),
})

// Shared options of Fumadocs MDX
// https://fumadocs.dev/docs/mdx/global-options
export default defineConfig({
  mdxOptions: {
    // Code Hike's remark plugin must run before remark-rehype, so prepend it to
    // Fumadocs' preset instead of replacing the list.
    remarkPlugins: (v) => [[remarkCodeHike, chConfig], ...v],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})
