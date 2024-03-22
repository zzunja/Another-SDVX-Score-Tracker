'use client'

import React, { useEffect, useState } from "react"
import { Scores, columns } from "./scores/columns"
import Papa from 'papaparse'
import { DataTable } from "./scores/data-tables"
import { ModeToggle } from "@/components/ui/darkModeToggle"
import { InfoDialog } from "@/components/ui/infoDialog"


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
  const [totalVF, setTotalVF] = useState()
  let tableData = []

  useEffect(() => {
    if (localStorage.getItem('DATA')){
      setData(JSON.parse(localStorage.getItem('DATA')))
      setTotalVF(JSON.parse(localStorage.getItem('TOTALVF')))
      setShowDataTable(JSON.parse(localStorage.getItem('SHOW_DATA_TABLE')))
    }
  }, [])
  
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
          setTotalVF(responseData.response[0].volforce),
          setData(tableData)

          setShowDataTable(true)
        } catch (e: any) {
          console.error(e)
        }
       }
      });
  }

  useEffect(() => {
    if (totalVF && data) {
      localStorage.setItem('SHOW_DATA_TABLE', JSON.stringify(true));
      localStorage.setItem('TOTALVF', JSON.stringify(totalVF));
      localStorage.setItem('DATA', JSON.stringify(data));
    }
  }, [totalVF, data]);

  return (
    <main>
      <title>Another SDVX Score Tracker</title>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <h1 className="graphicDesignIsMyPassion">ANOTHER SDVX SCORE TRACKER</h1>
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
          <div className="items"><InfoDialog/></div>
          <div className="items"><ModeToggle/></div>
        </div>
      </div>
      <div className={`container mx-auto py-10 ${showDataTable ? '' : 'hidden'}`} >
        <DataTable columns={columns} data={data} volforce={totalVF} />
      </div>
    </main>
  )
}

export default Home