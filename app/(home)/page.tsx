import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-fd-muted-foreground">
        I have a{' '}
        <Link
          href="/blog"
          className="font-semibold text-fd-foreground underline"
        >
          /blog
        </Link>{' '}
        where I write about code and stuff.
      </p>
    </main>
  )
}
