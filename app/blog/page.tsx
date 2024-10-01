import { blogSource } from '@/app/source'
import Link from 'next/link'

export default function BlogIndex() {
  const posts = blogSource.getPages()

  const sortedPosts = posts.sort((a, b) => {
    const { publishedOn: dateA } = a.data
    const { publishedOn: dateB } = b.data
    if (!dateA || !dateB) return 0

    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return (
    <div>
      Blog Index
      {sortedPosts.map((post, i) => (
        <div key={i}>
          <Link href={post.url}>{post.data.title}</Link>
        </div>
      ))}
    </div>
  )
}
