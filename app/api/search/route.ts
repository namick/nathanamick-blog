import { blogSource, source } from '@/lib/source'
import { createSearchAPI } from 'fumadocs-core/search/server'

export const { GET } = createSearchAPI('advanced', {
  indexes: [
    ...blogSource.getPages().map((page) => ({
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
