import { format } from 'date-fns'
import { blogSource, type BlogPost } from './source'

/** How many cover images live in `public/images/hero-wrap`. */
const COVER_COUNT = 22

function coverSrc(index: number): string {
  const n = (index % COVER_COUNT) + 1
  return `/images/hero-wrap/wrap-${String(n).padStart(2, '0')}.jpg`
}

function publishedAt(post: BlogPost): number {
  return new Date(post.data.publishedOn).getTime()
}

/**
 * Oldest first, drafts included. Same-day posts are ordered by url so the
 * sequence never depends on the order the loader happened to read files in.
 */
const chronological = [...blogSource.getPages()].sort(
  (a, b) => publishedAt(a) - publishedAt(b) || a.url.localeCompare(b.url)
)

/**
 * Covers are handed out by chronological position, which means a post keeps
 * the same one for good: anything published later lands at the end of the
 * sequence and takes the next cover instead of shifting the ones already
 * assigned. Past COVER_COUNT posts the sequence starts over.
 *
 * Drafts take a position here like anything else. That costs an unused cover
 * in production, and buys two things: dropping the `draft` flag publishes a
 * post without reshuffling the covers around it, and dev and production always
 * agree on which cover a post has.
 */
const covers = new Map(
  chronological.map((post, index) => [post.url, coverSrc(index)])
)

/** Total by construction — every page in `blogSource` is in the map. */
export function coverFor(post: BlogPost): string {
  return covers.get(post.url) ?? coverSrc(0)
}

/**
 * `draft: true` in frontmatter keeps a post out of every public surface — the
 * index, the home page, prev/next, the sitemap, search — and 404s its own URL
 * in production. Under `next dev` the post renders at its real URL and `/drafts`
 * lists them, so a draft can be written, committed and pushed in the open.
 */
export function isDraft(post: BlogPost): boolean {
  return post.data.draft
}

/**
 * Statically false in any production build, so bundlers drop the draft branches
 * rather than shipping unpublished writing to the client.
 */
export const showDrafts = process.env.NODE_ENV === 'development'

const published = chronological.filter((post) => !isDraft(post))

/** Published only. Every listing on the site is built from this. */
export function postsNewestFirst(): BlogPost[] {
  return [...published].reverse()
}

/** Newest first. Empty in production. */
export function draftsNewestFirst(): BlogPost[] {
  return showDrafts ? [...chronological].filter(isDraft).reverse() : []
}

/** Whether this post has a page at all — false for drafts in production. */
export function isViewable(post: BlogPost): boolean {
  return showDrafts || !isDraft(post)
}

/** Every post with a route, drafts included under `next dev`. */
export function viewablePosts(): BlogPost[] {
  return chronological.filter(isViewable)
}

/**
 * `publishedOn` is a calendar date, not an instant: `new Date('2024-01-06')`
 * lands on UTC midnight, which formats as the 5th anywhere west of Greenwich.
 * Reading the UTC parts back out labels the day that was actually written, on
 * any machine that renders the page.
 */
export function formatPublished(post: BlogPost, pattern: string): string {
  const date = new Date(post.data.publishedOn)
  return format(
    new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    pattern
  )
}

export function publishedYear(post: BlogPost): number {
  return new Date(post.data.publishedOn).getUTCFullYear()
}

const WORDS_PER_MINUTE = 220

/** Prose only — frontmatter, imports, code blocks and JSX aren't read at speed. */
function countWords(raw: string): number {
  const prose = raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, ' ')
  return prose.split(/\s+/).filter(Boolean).length
}

/** Minutes to read every published post, rounded to the nearest five. */
export async function minutesToReadEverything(): Promise<number> {
  const sources = await Promise.all(
    published.map((post) => post.data.getText('raw'))
  )
  const words = sources.reduce((total, raw) => total + countWords(raw), 0)
  return Math.max(5, Math.round(words / WORDS_PER_MINUTE / 5) * 5)
}
