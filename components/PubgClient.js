import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { apiKey } from "./Keys";
import { PlayerCard } from "./PlayerCard.js";

function PubgClient(searchPlayer) {
  const [player, setPlayer] = useState(null);
  const [platform, setPlatform] = useState("steam");
  const [matches, setMatches] = useState(null);
  const [lastMatchTeamData, setLastMatchTeamData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const nameRef = useRef(searchName);
  const fetchedRef = useRef(fetched)

  const fetchPlayer = async (player, platform) => {
    setLoading(true);
    await axios
      .get(
        `https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${player}`,
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data[0]);
        setPlayer(response.data.data[0]);
        setMatches(response.data.data[0].relationships.matches.data[0].id);
        return response;
      })
      .catch(function (error) {
        setMatches(
          error.response.status +
            " Please Try Again. Note: Searches are case sensitive."
        );
      });
    setFetched(true);
    setLoading(false);
  };

  const fetchMatch = async (matchId) => {
    setLastMatchTeamData([]);
    await axios
      .get(`https://api.pubg.com/shards/${platform}/matches/${matchId}`, {
        method: "GET",
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        // console.log("Player ID: " + player.id);
        // console.log(res.data.included);
        let participants = res.data.included;
        let thisPlayer = {};
        let roster = {};
        let myTeam = {};
        //map through response to search for the queried player's team
        for (let i = 0; i < participants.length; i++) {
          if (
            participants[i].type == "participant" &&
            participants[i].attributes.stats.playerId == player.id
          ) {
            //queried player id
            thisPlayer = participants[i].id;
            //map through participants again looking for the roster with thisPlayer
            for (let l = 0; l < participants.length; l++) {
              if (participants[l].type == "roster") {
                //set roster to current team in for loop
                roster = participants[l].relationships.participants.data;
                //map through rosters looking for queried player's ID
                for (let p = 0; p < roster.length; p++) {
                  if (roster[p].id == thisPlayer) {
                    //sets myRoster to the roster with queried player's ID
                    myTeam = roster;
                  }
                }
              }
            }
          }
        }
        for (let x = 0; x < myTeam.length; x++) {
          for (let z = 0; z < participants.length; z++) {
            if (myTeam[x].id == participants[z].id) {
              setLastMatchTeamData((lastMatchTeamData) => [
                ...lastMatchTeamData,
                participants[z].attributes.stats,
              ]);
            }
          }
        }
        return { myTeam, participants };
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchPlayer(searchName, platform);
  };

  const onChange = (e) => {
    setSearchName(e.target.value);
    nameRef.current = e.target.value;
  };

  useEffect(() => {
    if (fetched == true && loading == false && typeof player !== 'undefined'){
      fetchMatch(matches);
    }
    
  }, [player])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <form onSubmit={handleSubmit}>
        <label>Search Players</label>
        <input type="text" value={searchName} onChange={onChange} />
        <button style={styles.buttons} disabled={loading} type="submit">
          SEARCH
        </button>
      </form>
      <div>
        {loading ? "LOADING..." : fetched ? `Match ID: ${matches}` : "No Data"}
      </div>
      {lastMatchTeamData.length == 0 ? (
        <div></div>
      ) : (
        <>
          <h2 style={{paddingLeft: '2rem'}}>Rank: {lastMatchTeamData[0].winPlace}</h2>
          {lastMatchTeamData[0].winPlace == 1 ? (
            <h1>WINNER WINNER CHICKEN DINNER!</h1>
          ): (
           <></> 
          )}
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            {lastMatchTeamData.map(function (player) {
              return (
                <div style={{ padding: "2rem" }} key={player.playerId}>
                  <PlayerCard player={player} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  buttons: {
    width: "5rem",
    backgroundColor: "white",
    color: "black",
  },
};

export default PubgClient;
