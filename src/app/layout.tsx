import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eldritch Hunter",
  description: "Survival shooter on Farcaster",
  openGraph: {
    title: "Eldritch Hunter",
    description: "Survival shooter on Farcaster",
    images: ["https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldritch Hunter",
    description: "Survival shooter on Farcaster",
    images: ["https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Frame Meta Tags - ДУБЛИРУЕМ как простой текст */}
        <meta property="fc:frame" content='{"version":"1","imageUrl":"https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_frame","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
        
        <meta property="fc:miniapp" content='{"version":"1","imageUrl":"https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_miniapp","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
        
        {/* OG Tags */}
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter on Farcaster" />
        <meta property="og:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter on Farcaster" />
        <meta name="twitter:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.farcaster.xyz/actions.js" async></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
