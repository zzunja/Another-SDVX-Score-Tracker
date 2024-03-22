import { NextRequest, NextResponse } from 'next/server';

const gradeBonus = {"S":1.05, "AAA+":1.02, "AAA":1, "AA+":.97, "AA":.94, "A+":.91, "A":.88, "B":.85, "C":.82, "D":.8, "F":0}
const clearMedal = {"PERFECT":1.1, "ULTIMATE CHAIN":1.05, "EXCESSIVE COMPLETE":1.02, "COMPLETE":1, "PLAYED":.5}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const data = body.results.data

  for (let i = 1; i < data.length; i++){
    var VF = (Math.trunc((data[i][2] * (data[i][5]/10000000) * gradeBonus[data[i][4]] * clearMedal[data[i][3]] * 20)*.001 * 1000) / 1000)
    data[i].push(VF)
    data[i].push(false) //why not since we are loop though them. this is used for detecting if in top 50
    data[i].push(i) // id. for sorting. there is prob a way to do this without this but idc
  }

  const response = data.map((x) => {
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
      perfect: x[10],
      volforce: x[11],
      top50: x[12],
      id: x[13]
    }
  })

  //sort by top volforce
  response.sort((a, b) => b.volforce - a.volforce)
  // get totalVF for top 50 and make everything that is in the top 50 have top50 true
  let totalVF = 0.0
  for(let i = 1; i < 51; i++){
    response[i].top50 = true
    totalVF = parseFloat(response[i].volforce) + totalVF
  }
  response[0].volforce = totalVF.toFixed(3)
  response[0].id = 0
  

  response.sort((a, b) => a.id - b.id)
  return NextResponse.json({response:response})
}