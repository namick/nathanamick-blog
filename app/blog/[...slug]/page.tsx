import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { blogSource as source, type BlogPost } from '@/lib/source'
import { coverFor, formatPublished, postsNewestFirst } from '@/lib/blog'
import { Image } from '@/components/image'
import { HeroWrap } from '@/components/hero-wrap'
import { Code } from '@/components/code'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const posts = postsNewestFirst()
  const position = posts.findIndex((post) => post.url === page.url)
  const newer = position > 0 ? posts[position - 1] : undefined
  const older = position >= 0 ? posts[position + 1] : undefined

  const MDX = page.data.body

  return (
    <article className="my-16 flex min-w-0 flex-1 flex-col sm:my-24">
      <header className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <Link
          href="/blog"
          className="font-mono text-sm text-fd-muted-foreground transition-colors hover:text-fd-primary"
        >
          ← writing
        </Link>
        <p className="mt-12 font-mono text-sm tracking-wider text-fd-primary">
          {formatPublished(page, 'MMMM d, yyyy')}
        </p>
        {/* No standfirst here: several posts open with their own summary
            verbatim, so printing it above the body reads as a stutter. */}
        <h1 className="mt-4 font-serif text-4xl leading-tight text-fd-foreground sm:text-5xl lg:text-6xl">
          {page.data.title}
        </h1>
      </header>

      {page.data.heroImage && (
        <div className="mx-auto mt-14 w-full max-w-4xl px-6 sm:px-8">
          <HeroWrap
            className="aspect-[16/9] rounded-sm border border-fd-border"
            cover={
              <Image
                src={coverFor(page)}
                alt=""
                priority
                sizes="(min-width: 896px) 896px, 100vw"
                className="h-full w-full object-cover"
              />
            }
          >
            <Image
              src={`/images/hero/${page.data.heroImage}`}
              alt={page.data.title}
              sizes="(min-width: 896px) 896px, 100vw"
              className="h-full w-full object-cover"
            />
          </HeroWrap>
        </div>
      )}

      <div className="mx-auto prose mt-16 w-full max-w-3xl px-6 sm:px-8 md:prose-lg">
        <MDX components={{ ...defaultMdxComponents, Code }} />
      </div>

      {(newer || older) && (
        <nav className="mx-auto mt-24 grid w-full max-w-3xl gap-8 border-t border-fd-border px-6 pt-10 sm:grid-cols-2 sm:px-8">
          <Adjacent post={older} direction="older" />
          <Adjacent post={newer} direction="newer" />
        </nav>
      )}
    </article>
  )
}

function Adjacent({
  post,
  direction,
}: {
  post?: BlogPost
  direction: 'older' | 'newer'
}) {
  const newer = direction === 'newer'
  if (!post) return <div className={newer ? 'hidden sm:block' : undefined} />

  return (
    <Link
      href={post.url}
      className={`group flex flex-col gap-2 ${newer ? 'sm:col-start-2 sm:text-right' : ''}`}
    >
      <span className="font-mono text-xs tracking-widest text-fd-muted-foreground uppercase">
        {newer ? 'Newer →' : '← Older'}
      </span>
      <span className="font-serif text-xl leading-snug text-fd-foreground transition-colors group-hover:text-fd-primary">
        {post.data.title}
      </span>
    </Link>
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
