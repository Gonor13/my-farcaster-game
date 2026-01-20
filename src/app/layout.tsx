import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const meta Metadata = {
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
        <!-- Base App ID -->
        <meta name="base:app_id" content="69616ac2b8395f034ac22034" />
        
        <!-- Farcaster Mini App -->
        <meta property="fc:miniapp" content="1.0" />
        <link rel="fc:miniapp" href="https://my-farcaster-game-gilt.vercel.app" />
        
        <!-- OG Tags -->
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter game for Farcaster" />
        <meta property="og:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter game for Farcaster" />
        <meta name="twitter:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />
        
        <!-- Farcaster Frame -->
        <meta property="fc:frame" content="vNext" />
        
        <!-- Scripts -->
        <script src="https://cdn.farcaster.xyz/actions.js" async></script>
        <script src="https://cdn.base.org/sdk.js" async></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
