import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center gap-8 text-center font-fredoka">
      <h1 className="mb-4 text-4xl font-bold tracking-wide">
        Hi, I&apos;m Nathan
      </h1>
      <p className="transform text-3xl text-fd-muted-foreground transition-transform hover:scale-105">
        <Link href="/blog" className="text-fd-foreground">
          I have a /blog where I write about code.
        </Link>
      </p>
    </main>
  )
}
