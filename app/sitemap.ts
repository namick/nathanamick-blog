import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { MetadataRoute } from 'next'
import { postsNewestFirst } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

const absolute = (path: string) => new URL(path, SITE_URL).href

/**
 * Standalone HTML documents served straight out of `public/` — the artifacts
 * that sit behind a post. They own no route, so nothing else in the build knows
 * they exist; walking the directory is what keeps the sitemap right when one is
 * added, renamed or removed.
 */
function publicDocuments(): MetadataRoute.Sitemap {
  function walk(dir: string, prefix: string): MetadataRoute.Sitemap {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.name.startsWith('.')) return []
      const child = join(dir, entry.name)
      const path = `${prefix}/${entry.name}`

      if (entry.isDirectory()) return walk(child, path)
      if (!entry.name.endsWith('.html')) return []
      return [{ url: absolute(path), lastModified: statSync(child).mtime }]
    })
  }

  return walk(join(process.cwd(), 'public'), '')
}

/**
 * Everything here is derived, so adding a post or dropping in a new document is
 * the whole job — the sitemap regenerates on the next build with no edit here.
 *
 * `/docs` and `/wat` are left out on purpose: they're demo and scratch pages,
 * not writing meant to be found. Add them if that changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postsNewestFirst()
  const latest = posts[0] && new Date(posts[0].data.publishedOn)

  return [
    { url: absolute('/'), lastModified: latest },
    { url: absolute('/blog'), lastModified: latest },
    ...posts.map((post) => ({
      url: absolute(post.url),
      lastModified: new Date(post.data.publishedOn),
    })),
    ...publicDocuments(),
  ]
}
