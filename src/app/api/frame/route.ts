import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Eldritch Hunter</title>
    
    <!-- Farcaster Frame Tags -->
    <meta property="fc:frame" content='{"version":"1","imageUrl":"https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_frame","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
    
    <meta property="fc:miniapp" content='{"version":"1","imageUrl":"https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800","button":{"title":"🎮 Hunt Monsters","action":{"type":"launch_miniapp","url":"https://my-farcaster-game-gilt.vercel.app","name":"Eldritch Hunter","splashImageUrl":"https://my-farcaster-game-gilt.vercel.app/icon.png","splashBackgroundColor":"#000000"}}}' />
    
    <!-- Open Graph -->
    <meta property="og:title" content="Eldritch Hunter" />
    <meta property="og:description" content="Survival shooter on Farcaster" />
    <meta property="og:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="800" />
    <meta property="og:url" content="https://my-farcaster-game-gilt.vercel.app" />
    <meta property="og:type" content="website" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Eldritch Hunter" />
    <meta name="twitter:description" content="Survival shooter on Farcaster" />
    <meta name="twitter:image" content="https://og-playground.vercel.app/api/gradient?title=ELDRITCH%20HUNTER&description=Survival%20shooter%20on%20Farcaster&color1=0a0a0a&color2=1a1a2e&textColor=00ff88&width=1200&height=800" />
    
    <!-- Farcaster JS -->
    <script src="https://cdn.farcaster.xyz/actions.js"></script>
    
    <!-- Auto-redirect to game -->
    <meta http-equiv="refresh" content="2;url=https://my-farcaster-game-gilt.vercel.app/game.html">
</head>
<body style="margin:0;padding:20px;background:#0a0a0a;color:#00ff88;font-family:monospace;">
    <div style="max-width:600px;margin:0 auto;text-align:center;">
        <h1 style="color:#00ff88;text-shadow:0 0 10px #00ff88;">🎮 ELDRITCH HUNTER</h1>
        <p>Farcaster Frame/Mini App endpoint</p>
        <p>Redirecting to the game...</p>
        <div style="margin:30px 0;">
            <a href="https://my-farcaster-game-gilt.vercel.app/game.html" 
               style="background:#00ff88;color:black;padding:15px 30px;text-decoration:none;font-weight:bold;border-radius:8px;">
                PLAY NOW
            </a>
        </div>
        <div style="font-size:12px;color:#666;margin-top:50px;">
            This page is specifically for Farcaster crawler to detect frame metadata.
        </div>
    </div>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
