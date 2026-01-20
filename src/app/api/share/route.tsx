import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'full';
  const humanKills = parseInt(searchParams.get('humanKills') || '0');
  const monsterKills = parseInt(searchParams.get('monsterKills') || '0');
  const totalXP = parseInt(searchParams.get('totalXP') || '0');
  const time = parseInt(searchParams.get('time') || '0');
  const madness = parseInt(searchParams.get('madness') || '5');
  
  // Format time
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  // Generate shareable HTML page with Farcaster Frame
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/artifact?type=${type}&humanKills=${humanKills}&monsterKills=${monsterKills}&totalXP=${totalXP}&time=${time}&madness=${madness}" />
  <meta property="og:image" content="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/artifact?type=${type}&humanKills=${humanKills}&monsterKills=${monsterKills}&totalXP=${totalXP}&time=${time}&madness=${madness}" />
  <title>Cursed Artifact Card</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #0a0a0f;
      color: #fff;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .artifact-card {
      background: linear-gradient(135deg, #1a0a1a 0%, #0a0a0f 100%);
      border: 2px solid #7c3aed;
      border-radius: 12px;
      padding: 30px;
      max-width: 500px;
      text-align: center;
    }
    h1 { color: #7c3aed; font-size: 24px; margin-bottom: 20px; }
    .stats { margin: 20px 0; }
    .stat { margin: 10px 0; }
    .share-button {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      margin: 10px;
    }
    .share-button:hover { background: #6d28d9; }
  </style>
</head>
<body>
  <div class="artifact-card">
    <h1>🪬 Cursed Artifact Card</h1>
    <div class="stats">
      ${type === 'human' || type === 'full' ? `<div class="stat">🔪 Human Kills: ${humanKills}</div>` : ''}
      ${type === 'monster' || type === 'full' ? `<div class="stat">🪬 Monster Kills: ${monsterKills}</div>` : ''}
      ${type === 'full' ? `<div class="stat">⭐ Total XP: ${totalXP}</div>` : ''}
      ${type === 'monster' || type === 'full' ? `<div class="stat">⏱️ Time in Form: ${timeFormatted}</div>` : ''}
      ${type === 'full' ? `<div class="stat">👁️ Max Madness: Level ${madness}</div>` : ''}
    </div>
    <button class="share-button" onclick="window.location.href='${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}'">Claim This Artifact</button>
  </div>
  <script>
    // Share functionality
    if (navigator.share) {
      document.querySelector('.share-button').addEventListener('click', async () => {
        try {
          await navigator.share({
            title: 'Cursed Artifact Card',
            text: 'Check out my Eldritch Horror game results!',
            url: window.location.href,
          });
        } catch (err) {
          console.log('Share cancelled');
        }
      });
    }
  </script>
</body>
</html>
  `;
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
