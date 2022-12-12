import React, {useState} from "react";
import {useRouter} from 'next/router'
import getPlayer from "../../components/getPlayer";

const Player = () => {
    const router = useRouter()
    const {slug} = router.query
    const [matchId, setMatchId] = useState()   
    
    console.log(matchId);

    return <p>{slug}</p>
}

export default Player