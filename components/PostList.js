import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul className="space-y-10 max-w-2xl">
        {posts &&
          posts.map((post) => {
            return (
              <li className="" key={post.slug}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div class="max-w-lg">
                    <Link href={{ pathname: `/post/${post.slug}` }}>
                      <a>
                        <h2 className="font-medium text-xl text-gray-900 hover:text-pink-600 mb-2">{post?.frontmatter?.title}</h2>
                      </a>
                    </Link>
                  </div>
                  <div className="text-gray-500">{post.frontmatter.date} {` `}</div>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
