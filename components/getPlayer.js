import axios from 'axios'
import {apiKey} from './Keys.js'
async function getPlayer(platform, player) {
    const playerRes = await axios.get(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
        method: 'GET',
        headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${apiKey}`,
        },
    }).then(res => {
        console.log(res.json())
        res.json()
    })
}

export default getPlayer