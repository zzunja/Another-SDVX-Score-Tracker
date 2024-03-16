"use client"
 
import { ColumnDef, SortingFn } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
 

const gradeSorting = (rowA: any, rowB: any, columnId: any): number => {
  const firstValue = rowA.original.grade
  const secondValue = rowB.original.grade
  const dict = {
    "S": 10,
    "AAA+": 9,
    "AAA": 8,
    "AA+": 7,
    "AA": 6,
    "A+": 5,
    "A": 4,
    "B": 3,
    "C": 2,
    "D": 1
  }

  return dict[firstValue] > dict[secondValue] ? 1 : dict[firstValue] < dict[secondValue] ? -1 : 0
}

export type Scores = {
  songName: string //楽曲名
  levelType: string //難易度
  level: number //楽曲レベル
  clearType: "PERFECT" | "ULTIMATE CHAIN" | "EXCESSIVE CLEAR" | "EFFECTIVE CLEAR" | "PLAYED" //クリアランク
  grade: "S" | "AAA+" | "AAA" | "AA+" | "AA" | "A+" | "A" | "B" | "C" | "D"  //スコアグレード
  score: number //ハイスコア
  EXscore: number //EXスコア
  totalPlays: number //プレー回数
  totalPass: number //クリア回数
  ultimateChain: number
  perfect: number
}
type amount ={

}

export const columns: ColumnDef<Scores>[] = [
  {
    accessorKey: "songName",
    header: 'Song Name'
  },
  {
    accessorKey: "levelType",
    header: "Level Type",
  },
  {
    accessorKey: "level",
    header: "Level Number",
    cell: ({row}) => {
      const amount = parseInt(row.getValue("level"))
      return <div className="text-center">{amount}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "clearType",
    header: () => <div className="text-center">Clear Type</div>,
    cell: ({row}) => {
      const amount = String(row.getValue("clearType"))
      return <div className="text-center">{amount}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "grade",
    sortingFn: (
      gradeSorting
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="text-center"
        >
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center"
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "EXscore",
    header: "EX Score",
  },
]
