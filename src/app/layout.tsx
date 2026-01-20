import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eldritch Hunter",
  description: "Survival shooter on Farcaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ========== BASE/FARCASTER EMBED TAGS ========== */}
        <meta name="fc:frame" content='{"version":"1","imageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_frame","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
        
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_miniapp","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
        
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter on Farcaster" />
        <meta property="og:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="314" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter on Farcaster" />
        <meta name="twitter:image" content="https://my-farcaster-game-gilt.vercel.app/icon.png" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.farcaster.xyz/actions.js"></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
