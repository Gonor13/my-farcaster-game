import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eldritch Hunter - Farcaster Game',
  description: 'Survival shooter game for Farcaster. Kill monsters, survive as long as you can!',
  metadataBase: new URL('https://my-farcaster-game-gilt.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:miniapp" content="1.0" />
        <link rel="fc:miniapp" href="https://my-farcaster-game-gilt.vercel.app" />
        
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter game - kill monsters, survive as long as you can!" />
        <meta property="og:image" content="https://my-farcaster-game-gilt.vercel.app/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter game for Farcaster" />
        <meta name="twitter:image" content="https://my-farcaster-game-gilt.vercel.app/api/og" />
        
        <script src="https://cdn.farcaster.xyz/actions.js" async></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}