import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="bg-gradient-to-r from-pink-700 to-pink-500">
        <div className="mx-auto max-w-6xl px-4">

          <div className="flex items-center py-6 justify-between">
            <Link href="/">
              <a className="text-white font-medium text-xl">Drupal Performance Tips</a>
            </Link>
    
            {/* <nav className="nav" role="navigation" aria-label="main navigation">
              <Link href="/about">
                <a className="text-white font-medium">About</a>
              </Link>
            </nav> */}
          </div>

        </div>
      </header>
    </>
  )
}
