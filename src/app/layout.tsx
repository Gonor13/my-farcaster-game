<head>
  {/* Farcaster Mini App (полный JSON) */}
  <meta name="fc:miniapp" content='{
    "version": "1",
    "imageUrl": "https://my-farcaster-game-gilt.vercel.app/icon.png",
    "button": {
      "title": "Play Eldritch Hunter",
      "action": {
        "type": "launch_miniapp",
        "url": "https://my-farcaster-game-gilt.vercel.app",
        "name": "Eldritch Hunter",
        "splashImageUrl": "https://my-farcaster-game-gilt.vercel.app/icon.png",
        "splashBackgroundColor": "#000000"
      }
    }
  }' />

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

  {/* Farcaster Frame */}
  <meta property="fc:frame" content="vNext" />

  {/* Скрипт Farcaster SDK */}
  <script src="https://cdn.farcaster.xyz/actions.js" async></script>
</head>