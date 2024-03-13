import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = body.results.data.map((x) => {
    return{
      songName: x[0],
      levelType: x[1],
      level: x[2],
      clearType: x[3],
      grade: x[4],
      score: x[5],
      EXscore: x[6],
      totalPlays: x[7],
      totalPass: x[8],
      ultimateChain: x[9],
      perfect: x[10]
    }
  })

  return NextResponse.json({response:response})
}