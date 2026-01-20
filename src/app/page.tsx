export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: '#000',
      color: '#0f0',
      fontFamily: 'monospace'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', color: '#0f0' }}>🎮 ELDRITCH HUNTER</h1>
        <p style={{ fontSize: '20px', color: '#8f8' }}>Loading the game...</p>
        <div style={{ marginTop: '30px' }}>
          <a href="/game.html" style={{
            display: 'inline-block',
            background: '#0f0',
            color: '#000',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '8px',
            margin: '10px'
          }}>
            PLAY NOW
          </a>
          <a href="/index.html" style={{
            display: 'inline-block',
            background: '#333',
            color: '#0f0',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '8px',
            margin: '10px',
            border: '2px solid #0f0'
          }}>
            VIEW FRAME
          </a>
        </div>
        <p style={{ marginTop: '30px', color: '#666', fontSize: '14px' }}>
          Farcaster Frame & Mini App ready
        </p>
      </div>
    </div>
  );
}
