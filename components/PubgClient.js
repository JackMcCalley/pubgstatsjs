import React, { useState, useRef, useEffect } from "react";
import useDebounce from './useDebounce.js'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from "axios";
import { apiKey } from "./Keys";

function PubgClient() {
    const [player, setPlayer] = useState(null)
    const [platform, setPlatform] = useState('steam')
    const [matches, setMatches] = useState([])
    const [searchName, setSearchName] = useState('wetfire')

    const fetchPlayer = (player, platform) => {
        axios.get(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${apiKey}`,
            },
        }
        ).then((response) => {
            setPlayer(response.data.data[0])
            return response
        }).catch(console.log)
    }

    // const { isSuccess, status, data, isLoading, error } = useQuery(
    //     ["fetchPlayer", searchQuery.searchName],
    //     () => fetchPlayer(searchQuery.searchName, searchQuery.searchPlatform),
    //     {
    //         enabled: searchQuery.searchName.length > 0
    //     }
    // )

    const handleSubmit = (e) => {
        e.preventDefault();
        let thisPlayer = fetchPlayer(searchName, platform)
        setPlayer(thisPlayer)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchName(e.target.value)
    }

    const getMatches = () => {
        
    }

    let playerName = ''

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Search Players</label>
                <input type="text" value={searchName} onChange={handleChange} />
                <button type="submit">submit</button>
                <div>{playerName}</div>
                <button onClick={() => console.log(player.attributes)}>log</button>
            </form>
        </div>
    )
}

export default PubgClient
