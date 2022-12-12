import React, { useState, useRef, useEffect } from "react";
import useDebounce from "./useDebounce.js";
import getPlayer from "./getPlayer.js";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { apiKey } from "./Keys";
import { MatchCard } from "./MatchCard.js";
import Link from "next/link.js";

function PubgClient() {
  const [player, setPlayer] = useState(null);
  const [platform, setPlatform] = useState("steam");
  const [matches, setMatches] = useState([]);
  const [searchName, setSearchName] = useState("wetfire");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const nameRef = useRef(searchName);

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
          setPlayer(response.data.data[0]);
          setMatches(response.data.data[0].relationships.matches.data[0].id);
          return response;
        })
        .catch(console.log);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
        fetchPlayer(searchName, platform);
    } catch {
        setLoading(false)
    }
    setLoading(false)
    setFetched(true)
  };

  const onChange = (e) => {
    setSearchName(e.target.value);
    nameRef.current = e.target.value;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search Players</label>
        <input type="text" value={searchName} onChange={onChange} />
        <button
          style={{
            width: "5rem",
            backgroundColor: "white",
            color: "black",
          }}
          disabled={loading}
          type="submit"
        >
          SEARCH
        </button>
      </form>
      <div>{loading ? "LOADING..." : fetched ? matches : "No Data"}</div>
    </div>
  );
}

export default PubgClient;
