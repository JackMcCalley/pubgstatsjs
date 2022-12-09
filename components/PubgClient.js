import React, { useState, useRef, useEffect } from "react";
import useDebounce from './useDebounce.js'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from "axios";
import { apiKey } from "./Keys";

function PubgClient() {
    const [player, setPlayer] = useState(null)
    const [platform, setPlatform] = useState('steam')
    const [matches, setMatches] = useState([])
    const [searchQuery, setSearchQuery] = useState({ searchName: 'wetfire', searchPlatform: 'steam' })

    const fetchPlayer = (player, platform) => {
        axios.get(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${apiKey}`,
            },
        }
        ).then((response) => {
            console.log(response.data.data[0]);
            setPlayer(response.data.data[0])
        }).catch(console.log)
    }

    const { isSuccess, status, data, isLoading, error } = useQuery(
        ["fetchPlayer", searchQuery.searchName],
        () => fetchPlayer(searchQuery.searchName, searchQuery.searchPlatform),
        {
            enabled: searchQuery.searchName.length > 0
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        let thisPlayer = fetchPlayer(searchQuery.searchPlatform, searchQuery.searchName)
        setPlayer(thisPlayer)
    }
    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <label>Search Players</label>
                <input type="text" value={searchQuery.searchName} onChange={(e) => setSearchQuery(searchName = e.target.value)} />
                <button type="submit">submit</button>
                <div>{player ? player : "n/a"}</div>
                <button onClick={console.log(player)}>log</button>
            </form> */}
            <button onClick={() => console.log(data)}>get data</button>
            <div>{player.attributes.name}</div>
        </div>
    )
}

export default PubgClient
