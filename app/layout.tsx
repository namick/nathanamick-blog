import './global.css'
import { RootProvider } from 'fumadocs-ui/provider'
import { Inter, Fredoka, Roboto_Mono, Roboto_Serif } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const roboto_serif = Roboto_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-serif',
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${inter.variable} ${roboto_mono.variable} ${roboto_serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
