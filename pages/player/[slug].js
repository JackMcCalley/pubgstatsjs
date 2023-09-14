import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { apiKey } from "../../components/Keys";
import { useQuery } from "@tanstack/react-query";
import { fetchMatch } from "../../components/fetchMatch";

function Player() {
  const router = useRouter();
  const { slug } = router.query;
  const [player, setPlayer] = useState(null);
  const [platform, setPlatform] = useState("steam");
  const [matches, setMatches] = useState(null);
  const [lastMatchTeamData, setLastMatchTeamData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${slug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        setPlayer(response.data.data[0]);
        setMatches(response.data.data[0].relationships.matches.data[0].id);
        return response;
      })
      .catch(function (error) {
        // console.log(error.response.status);
        console.log(error);
      });
    setLoading(false);
  }, [platform, slug]);

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
          // console.log(myTeam[x]);
          for (let z = 0; z < participants.length; z++) {
            if (myTeam[x].id == participants[z].id) {
              setLastMatchTeamData((lastMatchTeamData) => [
                ...lastMatchTeamData,
                participants[z].attributes.stats,
              ]);
            }
          }
        }
        console.log(lastMatchTeamData);
        return { myTeam, participants };
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={() =>
          setLastMatchTeamData(() => fetchMatch(matches, player, apiKey))
        }
      >
        fetch
      </button>
      <button onClick={() => console.log(lastMatchTeamData)}>log</button>
    </div>
  );
}

export default Player;
