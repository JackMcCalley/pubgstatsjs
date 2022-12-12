import React, { useState, useRef, useEffect } from "react";
import useDebounce from "./useDebounce.js";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { apiKey } from "./Keys";
import { MatchCard } from "./MatchCard.js";

function PubgClient() {
  const [player, setPlayer] = useState(null);
  const [platform, setPlatform] = useState("steam");
  const [matches, setMatches] = useState([]);
  const [searchName, setSearchName] = useState("wetfire");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const nameRef = useRef(searchName);

  const fetchPlayer = (player, platform) => {
    setLoading(true);
    setFetched(false);
    axios
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
        setPlayer(response.data.data[0]);
        setMatches(response.data.data[0].relationships.matches.data[0].id);
        setLoading(false);
        setFetched(true);
        return response;
      })
      .catch(console.log);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let thisPlayer = fetchPlayer(searchName, platform);
    setPlayer(thisPlayer);
  };

  const onChange = (e) => {
    setSearchName(e.target.value);
    nameRef.current = e.target.value;
    console.log(nameRef.current);
  };
  let playerName = "";

  function Match({ matches, fetched }) {
    if (!fetched) {
      return <div>FETCHING DATA</div>;
    } else if (fetched) {
      return <MatchCard id={matches} />;
    }
  }

  if (loading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search Players</label>
        <input type="text" value={searchName} onChange={onChange} />
        <button type="submit">submit</button>
        <div>{playerName}</div>
        <button onClick={() => setFetched(true)}>log</button>
      </form>
      <div>
        <Match />
      </div>
    </div>
  );
}

export default PubgClient;
