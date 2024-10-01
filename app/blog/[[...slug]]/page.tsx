import { blogSource as source } from '@/app/source'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Image } from '@/components/image'

import { Code } from '@/components/code'

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = source.getPage(params.slug)
  if (!page) notFound()

  let HeroImage = null
  if (page.data.heroImage) {
    HeroImage = (
      <Image
        src={`/images/hero/${page.data.heroImage}`}
        alt="hero image"
        className="rounded-2xl"
      />
    )
  }

  const MDX = page.data.body

  return (
    <div className="my-20 flex min-w-0 flex-1 flex-col sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="prose px-4 md:prose-lg lg:prose-xl sm:px-8 md:px-16 lg:px-32">
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

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata
}
