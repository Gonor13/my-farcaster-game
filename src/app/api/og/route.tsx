import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
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
          background: 'linear-gradient(135deg, #6b21a8 0%, #1a1a2e 100%)',
          fontSize: 60,
          fontWeight: 900,
          color: 'white',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>🪬</div>
        Farcaster Eldritch Horror
        <div style={{ fontSize: 30, marginTop: 15, opacity: 0.9 }}>Cursed Artifact Collector</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
