import axios from 'axios'
import {apiKey} from './Keys.js'
async function getPlayer(player, platform) {
    await axios.get(`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`, {
        method: 'GET',
        headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${apiKey}`,
        },
    }).then(res => {
        if (res.status == 200) {
            console.log("Success!");
            return res.data.data[0]
        } if (res.status == 404) {
            return "Player Not Found"
        }
        
    })
}

export default getPlayer