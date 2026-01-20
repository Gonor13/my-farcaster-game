import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'full';
    const humanKills = searchParams.get('humanKills') || '0';
    const monsterKills = searchParams.get('monsterKills') || '0';
    const totalXP = searchParams.get('totalXP') || '0';
    const time = parseInt(searchParams.get('time') || '0');
    const madness = searchParams.get('madness') || '5';
    
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const title = type === 'human' ? 'My Human Legacy' : 
                  type === 'monster' ? 'My Monster Reign' : 
                  'My Descent into Madness';
    
    const symbol = type === 'human' ? '🔪' : 
                   type === 'monster' ? '🪬' : 
                   '⚡';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a0a1a 0%, #0a0a0f 100%)',
            fontSize: 40,
            fontWeight: 900,
            color: 'white',
            fontFamily: 'monospace',
            padding: '40px',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>{symbol}</div>
          <div style={{ fontSize: 50, marginBottom: 30 }}>{title}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, fontSize: 30 }}>
            {(type === 'human' || type === 'full') && (
              <div>🔪 Human Kills: {humanKills}</div>
            )}
            {(type === 'monster' || type === 'full') && (
              <div>🪬 Monster Kills: {monsterKills}</div>
            )}
            {type === 'full' && (
              <div>⭐ Total XP: {totalXP}</div>
            )}
            {(type === 'monster' || type === 'full') && (
              <div>⏱️ Time: {timeFormatted}</div>
            )}
            {type === 'full' && (
              <div>👁️ Madness: Level {madness}</div>
            )}
          </div>
          
          <div style={{ marginTop: 30, fontSize: 20, opacity: 0.7 }}>
            Farcaster Eldritch Horror
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
