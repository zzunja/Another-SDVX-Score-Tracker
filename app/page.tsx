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
      volforce: responseData[i].volforce,
      top50: responseData[i].top50,
      id: responseData[i].id
    }
    dataArray.push(data)
  }

  return dataArray
}


const Home: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [data, setData] = useState([])
  const [showDataTable, setShowDataTable] = useState(false)
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
      setShowDataTable(true)
    }
  return (
    <main>
      <title>RALSIS</title>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <h1 className="graphicDesignIsMyPassion">SCORE SORTING SDVX :)))</h1>
      <div className="form">
        <div className = "uploadForm">
          <form onSubmit={(e) => handleFileSubmit(e)}>
            <input 
              type="file" 
              name="file" 
              accept='.csv' 
              onChange={(e) => setFile(e.target.files?.[0])}
              />
            <input type="submit" value="Upload"/>
          </form>
        </div>
        <div className="topcorner">
          <ModeToggle/>
        </div>
      </div>
      <div className={`container mx-auto py-10 ${showDataTable ? '' : 'hidden'}`} >
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}

export default Home