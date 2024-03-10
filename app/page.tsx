'use client'


import { Scores, columns } from "./scores/columns"
//import { DataTable } from "./scores/data-table"
import React, { useState } from "react"
import Papa from 'papaparse'

interface Play{
  songName: string 
  levelType: string 
  level: number 
  clearType: string
  grade: string
  score: number 
  EXscore: number 
  totalPlays: number 
  totalPass: number 
  ultimateChain: number
  perfect: number
}



const Home: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [data, setData] = useState<any>()
  
  const handleFileSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    Papa.parse(file, {
      header: false,
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
          console.log(responseData)
          setData(responseData)
        } catch (e: any) {
          console.error(e)
        }
      }
    });
    
  }
  
  return (
    <main>
      <form onSubmit={(e) => handleFileSubmit(e)}>
        <input 
          type="file" 
          name="file" 
          accept='.csv' 
          onChange={(e) => setFile(e.target.files?.[0])}
          />
        <input type="submit" value="Upload"/>
        <p>{data}</p>
      </form>
    </main>
  )
}

export default Home