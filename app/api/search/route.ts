import { source } from '@/lib/source'
import { postsNewestFirst } from '@/lib/blog'
import { createSearchAPI } from 'fumadocs-core/search/server'

export const { GET } = createSearchAPI('advanced', {
  indexes: [
    // Published only — a draft that turned up in search would defeat the flag.
    ...postsNewestFirst().map((page) => ({
      title: page.data.title,
      description: page.data.summary,
      structuredData: page.data.structuredData,
      id: page.url,
      url: page.url,
    })),
    ...source.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      structuredData: page.data.structuredData,
      id: page.url,
      url: page.url,
    })),
  ],
})
