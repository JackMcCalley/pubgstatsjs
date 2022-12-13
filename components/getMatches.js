import React, { useState, useEffect } from "react";
import axios from "axios";
import { MatchCard } from "./MatchCard";

export function getMatches(matchId, player, apiKey) {
  axios.get(`https://api.pubg.com/matches/${matchId}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return (
    <div>
      <MatchCard />
    </div>
  );
}
