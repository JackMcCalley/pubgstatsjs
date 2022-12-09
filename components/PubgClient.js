import React, { useState, useRef, useEffect } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';
import { apiKey } from "./Keys";

function usePlayers(){
    return useQuery({
        queryKey: ['pubgPlayer'],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
                method: 'GET',
                headers: {
                    Accept: "application/vnd.api+json",
                    //authenticate the request
                    Authorization: `Bearer ${apiKey}`,
                },
            }
            )
            return data;
        }
    })
}

function PubgClient() {
    const [player, setPlayer] = useState('wetfire')
    const [platform, setPlatform] = useState('steam')
    const [region, setRegion] = useState('na')
    const [state, setState] = useState({
        playerData: {},
    })
    const queryClient = useQueryClient()
    const { status, data, error, isFetching } = usePlayers();

    useEffect((data) => {
        if (isSuccess) {
            setState({ playerData: data })
        }
    }, [data])

    if (isFetching) return 'Loading...'

    if (error) return 'An error has occured: ' + error.message

    if (status == "success") {
        console.log(state.playerData);
    }

    return (
        <div>
            <button>Get Players</button>
        </div>
    )
}

export default PubgClient
