import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface LeaderboardEntry {
  kills: number;
  timestamp: number;
}

// In-memory storage (in production, use database)
let leaderboard: LeaderboardEntry[] = [];

export async function GET(request: NextRequest) {
  // Sort by kills descending, return top 10
  const sorted = [...leaderboard].sort((a, b) => b.kills - a.kills).slice(0, 10);
  return NextResponse.json({ leaderboard: sorted });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kills } = body;
    
    if (typeof kills !== 'number' || kills < 0) {
      return NextResponse.json({ error: 'Invalid kills value' }, { status: 400 });
    }
    
    leaderboard.push({
      kills,
      timestamp: Date.now(),
    });
    
    // Keep only top 100
    leaderboard.sort((a, b) => b.kills - a.kills);
    leaderboard = leaderboard.slice(0, 100);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
