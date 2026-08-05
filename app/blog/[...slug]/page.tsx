import { blogSource as source } from '@/lib/source'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Image } from '@/components/image'

import { Code } from '@/components/code'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  let HeroImage = null
  if (page.data.heroImage) {
    HeroImage = (
      <Image
        src={`/images/hero/${page.data.heroImage}`}
        alt={page.data.title}
        className="rounded-2xl border"
      />
    )
  }

  const MDX = page.data.body

  return (
    <div className="my-20 flex min-w-0 flex-1 flex-col sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="prose px-4 sm:px-8 md:px-16 md:prose-lg lg:px-32 lg:prose-xl">
        {HeroImage}
        <h1 className="font-fredoka font-semibold">{page.data.title}</h1>
        <MDX components={{ ...defaultMdxComponents, Code }} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.summary,
  }
}
