import React, {useState} from "react";
import {useRouter} from 'next/router'
import getPlayer from "../../components/getPlayer";
import PubgClient from "../../components/PubgClient";

const Player = () => {
    const router = useRouter()
    const {slug} = router.query
    const [matchId, setMatchId] = useState()   
    
    console.log(matchId);

    return (
        <div>
            <PubgClient searchPlayer={slug}/>
        </div>
    )
}

export default Player