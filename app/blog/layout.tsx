import { DocsLayout } from 'fumadocs-ui/layout'
import type { ReactNode } from 'react'
import { baseOptions } from '../layout.config'
import { blogSource as source } from '@/app/source'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  )
}
