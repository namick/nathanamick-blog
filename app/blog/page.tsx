import { blogSource } from '@/app/source'
import Link from 'next/link'
import { Image } from '@/components/image'
import { format } from 'date-fns'
import { Page } from 'fumadocs-core/source'
import { CollectionEntry } from 'fumadocs-mdx/config'

// TODO: Get this type from source.config.ts
type Post = Page<
  CollectionEntry<
    'doc',
    {
      title: string
      publishedOn: Date
      summary: string
      heroImage: string
    }
  >
>

export default function BlogIndex() {
  const posts = blogSource.getPages()

  const sortedPosts = posts.sort((a, b) => {
    const { publishedOn: dateA } = a.data
    const { publishedOn: dateB } = b.data
    if (!dateA || !dateB) return 0

    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  const firstPost = sortedPosts[0]
  const secondAndThirdPosts = sortedPosts.slice(1, 3)
  const restOfPosts = sortedPosts.slice(3)

  return (
    <div className="container my-16 flex flex-col gap-16">
      <Link href={firstPost.url}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
          <div className="col-span-2">
            <Image
              src={`/images/hero/${firstPost.data.heroImage}`}
              alt="hero image"
              className="rounded-2xl border"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-fredoka text-4xl font-semibold md:text-5xl xl:text-6xl">
              {firstPost.data.title}
            </h1>
            <div className="line-clamp-3 text-lg leading-normal">
              {firstPost.data.summary}
            </div>
            <PublishedOn date={firstPost.data.publishedOn} />
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {secondAndThirdPosts.map((post, i) => (
          <div key={i} className="">
            <Post key={i} post={post} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {restOfPosts.map((post, i) => (
          <div key={i} className="">
            <Post key={i} post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Post({ post }: { post: Post }) {
  return (
    <Link href={post.url}>
      <div className="grid gap-8">
        <div>
          <Image
            src={`/images/hero/${post.data.heroImage}`}
            alt="hero image"
            className="rounded-2xl border"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-fredoka text-4xl font-semibold">
            {post.data.title}
          </h2>
          <div className="line-clamp-3 text-lg leading-normal">
            {post.data.summary}
          </div>
          <PublishedOn date={post.data.publishedOn} />
        </div>
      </div>
    </Link>
  )
}

function PublishedOn({ date }: { date: Date }) {
  return (
    <div className="text-sm text-fd-muted-foreground">
      {format(new Date(date), 'MMM dd, yyyy')}
    </div>
  )
}
