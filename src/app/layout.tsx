import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eldritch Hunter - Farcaster Game',
  description: 'Survival shooter game for Farcaster. Kill monsters, survive as long as you can!',
  metadataBase: new URL('https://my-farcaster-game-gilt.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Mini App — ОДНА СТРОКА, без переносов */}
        <meta
          name="fc:miniapp"
          content='{"version":"1","imageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","button":{"title":"Play Eldritch Hunter","action":{"type":"launch_miniapp","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}'
        />

        {/* Open Graph */}
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter game for Farcaster" />
        <meta property="og:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter game for Farcaster" />
        <meta name="twitter:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />

        {/* Frame (для совместимости) */}
        <meta property="fc:frame" content="vNext" />

        {/* Farcaster SDK */}
        <script src="https://cdn.farcaster.xyz/actions.js" async></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}