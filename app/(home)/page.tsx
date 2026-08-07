import Link from 'next/link'
import { formatPublished, postsNewestFirst } from '@/lib/blog'
import { Flock } from '@/components/flock'

const now = [
  {
    title: 'Mentoring engineers into AI-native practice',
    body: 'One-to-one, end to end. Currently two very different students: a seasoned site reliability engineer who had never touched AI, now using it daily in production work — and an absolute beginner, now independently building full-stack web applications.',
  },
  {
    title: 'Running agentic systems that do real work',
    body: 'Multi-agent research and data-maintenance systems, including agents that keep officeholder information current for a live civic platform — thousands of state, congressional, and federal leaders. Sustained operation with real accuracy consequences, not demos.',
  },
  {
    title: 'Designing coursework',
    body: 'Instructional material in Python, built and tested for classrooms of working engineers and first-time programmers alike. Plus conference-style, multi-session curriculum for full-program events.',
  },
  {
    title: 'Refactoring Consciousness',
    body: 'A video series: philosophy of mind and consciousness science, structured for software engineers. A genuinely hard domain, taught with the tools engineers already trust.',
    href: 'https://youtube.com/@refactoringconsciousness',
    linkText: 'youtube.com/@refactoringconsciousness',
  },
]

const links = [
  ['GitHub', 'https://github.com/namick'],
  ['LinkedIn', 'https://linkedin.com/in/namick'],
  ['YouTube', 'https://youtube.com/@refactoringconsciousness'],
  ['Email', 'mailto:contact@nathanamick.com'],
] as const

export default function HomePage() {
  const posts = postsNewestFirst().slice(0, 3)

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative flex h-svh flex-col overflow-hidden">
        <Flock />
        <header className="z-10 flex items-baseline justify-between px-6 py-6 font-mono text-sm sm:px-10">
          <span className="text-fd-foreground">nathanamick.com</span>
          <nav className="flex gap-6">
            <Link
              href="/blog"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              blog
            </Link>
            <a
              href="https://github.com/namick"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              github
            </a>
          </nav>
        </header>
        {/* Bottom padding keeps the centered copy clear of the flock controls. */}
        <div className="z-10 flex flex-1 flex-col justify-center px-6 pb-44 sm:px-10 sm:pb-32 lg:px-24">
          <p className="mb-6 font-mono text-sm text-fd-muted-foreground">
            Nathan Amick — Indianapolis, IN
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-fd-foreground sm:text-6xl lg:text-7xl">
            Building software with AI{' '}
            <em className="text-fd-primary">and teaching engineers</em> to do
            the same.
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed text-fd-muted-foreground sm:text-lg">
            Twenty-five years of production engineering, now pointed at
            teaching: mentoring, coursework, and agentic systems that do real
            work.
          </p>
        </div>
      </section>

      {/* Now */}
      <section className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-10">
        <h2 className="mb-12 font-mono text-sm tracking-widest text-fd-primary uppercase">
          What I&apos;m doing now
        </h2>
        <div className="flex flex-col gap-12">
          {now.map((item) => (
            <div key={item.title}>
              <h3 className="mb-3 font-serif text-2xl text-fd-foreground">
                {item.title}
              </h3>
              <p className="leading-relaxed text-fd-muted-foreground">
                {item.body}
              </p>
              {item.href && (
                <a
                  href={item.href}
                  className="mt-3 inline-block font-mono text-sm text-fd-primary hover:underline"
                >
                  {item.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-10">
        <h2 className="mb-12 font-mono text-sm tracking-widest text-fd-primary uppercase">
          Writing
        </h2>
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.url} href={post.url} className="group">
              <h3 className="font-serif text-2xl text-fd-foreground transition-colors group-hover:text-fd-primary">
                {post.data.title}
              </h3>
              <p className="mt-2 line-clamp-2 leading-relaxed text-fd-muted-foreground">
                {post.data.summary}
              </p>
              <p className="mt-2 font-mono text-sm text-fd-muted-foreground">
                {formatPublished(post, 'MMM yyyy')}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-12 inline-block font-mono text-sm text-fd-primary hover:underline"
        >
          all posts →
        </Link>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-3xl px-6 pt-12 pb-16 sm:px-10">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-fd-border pt-8 font-mono text-sm">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
