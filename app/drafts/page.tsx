import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftsNewestFirst, formatPublished, showDrafts } from '@/lib/blog'
import { DraftBadge } from '@/components/draft-badge'
import type { BlogPost } from '@/lib/source'

export const metadata = {
  title: 'Drafts',
  robots: { index: false, follow: false },
}

/**
 * A workbench, not a listing: no chalk covers, no hero art, no read time —
 * just what is unfinished and where the file is. Deliberately unlike `/blog`
 * so the two are never mistaken for each other.
 *
 * The route exists in a production build but answers 404 there. `showDrafts` is
 * a compile-time constant, so the body below is dead code in that build.
 */
export default function Drafts() {
  if (!showDrafts) notFound()

  const drafts = draftsNewestFirst()

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <header>
        <p className="font-mono text-sm tracking-widest text-fd-primary uppercase">
          Drafts
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-fd-foreground sm:text-5xl">
          Not out yet.
        </h1>
        <p className="mt-6 leading-relaxed text-fd-muted-foreground">
          Posts carrying <code className="font-mono text-sm">draft: true</code>{' '}
          in their frontmatter. They render at their real URLs here, and nowhere
          in production — not on the index, not on the home page, not in the
          sitemap or search, and this page 404s there too. Safe to commit and
          push. Remove the line to publish.
        </p>
      </header>

      {drafts.length === 0 ? (
        <p className="mt-16 border-t border-fd-border pt-10 font-mono text-sm text-fd-muted-foreground">
          Nothing in progress. Add{' '}
          <code className="text-fd-foreground">draft: true</code> to a
          post&apos;s frontmatter to park it here.
        </p>
      ) : (
        <ul className="mt-16 flex flex-col border-t border-fd-border">
          {drafts.map((post) => (
            <Entry key={post.url} post={post} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Entry({ post }: { post: BlogPost }) {
  return (
    <li className="border-b border-fd-border">
      <Link href={post.url} className="group block py-8">
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs tracking-wider text-fd-muted-foreground">
            {formatPublished(post, 'MMM d, yyyy')}
          </p>
          <DraftBadge />
        </div>
        <h2 className="mt-3 font-serif text-2xl leading-snug text-fd-foreground transition-colors group-hover:text-fd-primary">
          {post.data.title}
        </h2>
        <p className="mt-3 line-clamp-2 leading-relaxed text-fd-muted-foreground">
          {post.data.summary}
        </p>
        <p className="mt-4 font-mono text-xs text-fd-muted-foreground/70">
          content/blog/{post.path}
        </p>
      </Link>
    </li>
  )
}
