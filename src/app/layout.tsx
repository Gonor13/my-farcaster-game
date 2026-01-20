import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// Farcaster Mini App конфигурация
const miniAppConfig = {
  version: "1",
  imageUrl: "https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800",
  button: {
    title: "🎮 Hunt Monsters",
    action: {
      type: "launch_miniapp",
      url: "https://my-farcaster-game-gilt.vercel.app",
      name: "Eldritch Hunter",
      splashImageUrl: "https://my-farcaster-game-gilt.vercel.app/icon.png",
      splashBackgroundColor: "#000000"
    }
  }
};

// Frame конфигурация (для обратной совместимости)
const frameConfig = {
  version: "1",
  imageUrl: "https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800",
  button: {
    title: "🎮 Hunt Monsters",
    action: {
      type: "launch_frame",
      url: "https://my-farcaster-game-gilt.vercel.app",
      name: "Eldritch Hunter",
      splashImageUrl: "https://my-farcaster-game-gilt.vercel.app/icon.png",
      splashBackgroundColor: "#000000"
    }
  }
};

export const metadata: Metadata = {
  title: "Eldritch Hunter",
  description: "Survival shooter on Farcaster",
  openGraph: {
    title: "Eldritch Hunter",
    description: "Survival shooter on Farcaster",
    images: ["https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800"],
    url: "https://my-farcaster-game-gilt.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldritch Hunter",
    description: "Survival shooter on Farcaster",
    images: ["https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800"],
  },
  other: {
    "fc:frame": JSON.stringify(frameConfig),
    "fc:miniapp": JSON.stringify(miniAppConfig),
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
        {/* Основные OG теги */}
        <meta property="og:title" content="Eldritch Hunter" />
        <meta property="og:description" content="Survival shooter on Farcaster" />
        <meta property="og:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Twitter теги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eldritch Hunter" />
        <meta name="twitter:description" content="Survival shooter on Farcaster" />
        <meta name="twitter:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
        
        {/* Farcaster теги - ОБЯЗАТЕЛЬНО как обычные мета-теги */}
        <meta name="fc:frame" content={JSON.stringify(frameConfig)} />
        <meta name="fc:miniapp" content={JSON.stringify(miniAppConfig)} />
        
        {/* Другие теги */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        {/* Farcaster Actions SDK */}
        <script src="https://cdn.farcaster.xyz/actions.js" async></script>
        
        {/* Иконка */}
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
