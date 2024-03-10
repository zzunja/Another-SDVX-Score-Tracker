"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Scores = {
  songName: string //楽曲名
  levelType: string //難易度
  level: number //楽曲レベル
  clearType: "PERFECT" | "ULTIMATE CHAIN" | "EXCESSIVE COMPLETE" | "COMPLETE" | "PLAYED" //クリアランク
  grade: "S" | "AAA+" | "AAA" | "AA+" | "AA" | "A+" | "A" | "B" | "C" | "D"  //スコアグレード
  score: number //ハイスコア
  EXscore: number //EXスコア
  totalPlays: number //プレー回数
  totalPass: number //クリア回数
  ultimateChain: number
  perfect: number
}
 
export const columns: ColumnDef<Scores>[] = [
  {
    accessorKey: "songName",
    header: "Song Name",
  },
  {
    accessorKey: "levelType",
    header: "Level Type",
  },
  {
    accessorKey: "level",
    header: "Level Number",
  },
  {
    accessorKey: "clearType",
    header: "Clear",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "EXscore",
    header: "EX Score",
  },
]


/*
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
 
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
*/
