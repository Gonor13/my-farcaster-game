import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface LeaderboardEntry {
  timeInSeconds: number;
  timestamp: number;
}

// In-memory storage (in production, use database)
let leaderboard: LeaderboardEntry[] = [];

export async function GET(request: NextRequest) {
  const sorted = [...leaderboard].sort((a, b) => b.timeInSeconds - a.timeInSeconds).slice(0, 10);
  return NextResponse.json({ leaderboard: sorted });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { timeInSeconds } = body;
    
    if (typeof timeInSeconds !== 'number' || timeInSeconds < 0) {
      return NextResponse.json({ error: 'Invalid time value' }, { status: 400 });
    }
    
    leaderboard.push({
      timeInSeconds,
      timestamp: Date.now(),
    });
    
    leaderboard.sort((a, b) => b.timeInSeconds - a.timeInSeconds);
    leaderboard = leaderboard.slice(0, 100);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
