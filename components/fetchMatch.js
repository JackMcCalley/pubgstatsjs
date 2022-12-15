import axios from "axios";
import { useState } from "react";

export const fetchMatch = async (matchId, platform, player, apiKey) => {
  let lastMatch = []
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
            lastMatch = [...lastMatch, participants[z].attributes.stats]
            console.log(lastMatch);
          }
        }
      }
      return { myTeam, participants };
    });
};
