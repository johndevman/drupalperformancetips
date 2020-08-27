import Head from 'next/head'

import Header from './Header'

export default function Layout({ children, pageTitle, description, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description} />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <title>{pageTitle}</title>
      </Head>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&display=swap');

        html,
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
        }
      `}</style>
      <div className="antialiased">
        <Header />
        <div className="mx-auto max-w-6xl mt-12 px-4">
          {children}
        </div>
      </div>
    </>
  )
}
