import Layout from '@components/Layout'
import PostList from '@components/PostList'

import getPosts from '@utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>

        <div className="text-3xl md:text-6xl font-extrabold tracking-tight text-gray-900">Latest</div>
        <p className="text-gray-600 text-lg">All the latest Drupal performance tips and tricks.</p>

        <main className="mt-10 md:mt-16">
          <PostList posts={posts} />
        </main>

      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
