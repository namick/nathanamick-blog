import { blogSource as source } from '@/app/source'
import type { Metadata } from 'next'
import { DocsPage, DocsDescription } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import defaultMdxComponents from 'fumadocs-ui/mdx'

import { Code } from '@/components/code'

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <h1 className="font-fredoka text-3xl font-semibold lg:text-5xl">
        {page.data.title}
      </h1>
      <DocsDescription>{page.data.summary}</DocsDescription>
      <div className="prose lg:prose-xl">
        <MDX components={{ ...defaultMdxComponents, Code }} />
      </div>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata
}
