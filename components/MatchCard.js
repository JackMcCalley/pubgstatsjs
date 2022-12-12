import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { apiKey } from './Keys'

export function MatchCard(id) {
    const [matchId, setMatchId] = useState(id)
    const [matchData, setMatchData] = useState(null)
    const [rank, setRank] = useState('')
    const [kills, setKills] = useState('')
    const [damage, setDamage] = useState('')

    useEffect(() => {
        axios.get(`https://api.pubg.com/matches/${matchId}`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${apiKey}`,
          }
        })
    
      return (res) => {
        console.log(res);
        setMatchData(res)
      }
    }, [matchId])
    
    
    return(
        <div>
            <h1>{rank}</h1>
            <h2>{kills}</h2>
            <h2>{damage}</h2>
        </div>
    )
}