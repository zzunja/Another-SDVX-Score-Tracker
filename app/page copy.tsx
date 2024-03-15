'use client'

import React, { useState } from "react"
import { Scores, columns } from "./scores/columns"
import Papa from 'papaparse'
import { DataTable } from "./scores/data-tables"
import { ModeToggle } from "@/components/ui/darkModeToggle"
import { Input } from "@/components/ui/input"

async function getData(responseData): Promise<Scores[]> {
  let data
  var dataArray = []
  for (let i = 1; i < responseData.length; i++) {
    data = {
      songName: responseData[i].songName,
      levelType: responseData[i].levelType,
      level: responseData[i].level,
      clearType: responseData[i].clearType,
      grade: responseData[i].grade,
      score: responseData[i].score,
      EXscore: responseData[i].EXscore,
      totalPlays: responseData[i].totalPlays,
      totalPass: responseData[i].totalPass,
      ultimateChain: responseData[i].ultimateChain,
      perfect: responseData[i].perfect,
    }
    dataArray.push(data)
  }

  return dataArray
}


const Home: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [data, setData] = useState([])
  let tableData = []
  
  const handleFileSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    Papa.parse(file, {
      header: false,
      skipEmptyLines: 'greedy',
      complete: async function(results) {
        try {
          const response = await fetch("/api/sortdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({results}),
        })
          const responseData = await response.json()
          tableData = await getData(responseData.response)
          setData(tableData)
        } catch (e: any) {
          console.error(e)
        }
       }
      });
    }
  return (
    <main>
      <title>RALSIS</title>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <form onSubmit={(e) => handleFileSubmit(e)}>
        <input 
          type="file" 
          name="file" 
          accept='.csv' 
          onChange={(e) => setFile(e.target.files?.[0])}
          hidden/>
        <input type="submit" value="Upload"/>
      </form>
      <ModeToggle/>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}

export default Home