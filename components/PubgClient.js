import React, { useState, useRef, useEffect } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { apiKey } from "./Keys";
function PubgClient() {
    const [player, setPlayer] = useState('wetfire')
    const [platform, setPlatform] = useState('steam')
    const [region, setRegion] = useState('na')
    const [state, setState] = useState({
        data: {},
    })

    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['pubgPlayer'],
        queryFn: () => {
            fetch(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
                method: 'GET',
                headers: {
                    Accept: "application/vnd.api+json",
                    //authenticate the request
                    Authorization: `Bearer ${apiKey}`,
                },
            }
            ).then(res =>
                res.json()
            )
        }
    })

    useEffect(() => {
        if (isSuccess) {
            setState({ data })
        }
    }, [data])

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occured: ' + error.message

    return (
        <div>
            <h1>{data[0]}</h1>
        </div>
    )
}

export default PubgClient
