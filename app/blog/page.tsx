import Link from 'next/link'
import { Image } from '@/components/image'
import { HeroWrap } from '@/components/hero-wrap'
import {
  coverFor,
  formatPublished,
  minutesToReadEverything,
  postsNewestFirst,
  publishedYear,
} from '@/lib/blog'
import type { BlogPost } from '@/lib/source'

export const metadata = {
  title: 'Writing',
  description:
    'Essays on components, hooks, boundaries, and the habits underneath them.',
}

export default async function BlogIndex() {
  const posts = postsNewestFirst()
  const years = posts.map(publishedYear)
  const minutes = await minutesToReadEverything()

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 sm:py-28">
      <header className="max-w-2xl">
        <p className="font-mono text-sm tracking-widest text-fd-primary uppercase">
          Writing
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-fd-foreground sm:text-5xl">
          Teaching notes.
        </h1>
        <p className="mt-6 leading-relaxed text-fd-muted-foreground sm:text-lg">
          Most of these started as an explanation for one person — components,
          hooks, boundaries, and how to hold an opinion loosely. A few are old
          enough that the framework has moved on. The ideas mostly haven&apos;t.
        </p>
        <p className="mt-8 font-mono text-xs text-fd-muted-foreground">
          {posts.length} notes · {Math.min(...years)}–{Math.max(...years)} ·
          about {minutes} minutes end to end
        </p>
      </header>

      <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2">
        {posts.map((post) => (
          <Entry key={post.url} post={post} />
        ))}
      </div>
    </div>
  )
}

function Entry({ post }: { post: BlogPost }) {
  return (
    <Link href={post.url} className="group flex flex-col gap-5">
      <HeroWrap
        className="aspect-[16/9] rounded-sm border border-fd-border transition-colors group-hover:border-fd-primary/40"
        cover={
          <Image
            src={coverFor(post)}
            alt=""
            sizes="(min-width: 640px) 45vw, 92vw"
            className="h-full w-full object-cover"
          />
        }
      >
        <Image
          src={`/images/hero/${post.data.heroImage}`}
          alt={post.data.title}
          sizes="(min-width: 640px) 45vw, 92vw"
          className="h-full w-full object-cover"
        />
      </HeroWrap>
      <div>
        <p className="font-mono text-xs tracking-wider text-fd-muted-foreground">
          {formatPublished(post, 'MMM d, yyyy')}
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-snug text-fd-foreground transition-colors group-hover:text-fd-primary">
          {post.data.title}
        </h2>
        <p className="mt-3 line-clamp-3 leading-relaxed text-fd-muted-foreground">
          {post.data.summary}
        </p>
      </div>
    </Link>
  )
}
