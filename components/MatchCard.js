import React from "react";

export const MatchCard = (matchData) => {
  let data = matchData.matchData;
  console.log(data);
  return (
    <div>
      {data[0].winPlace == 1 ? <h1>WINNER!</h1> : <div></div>}
      <h1>Team Rank: {data[0].winPlace}</h1>
      <div style={styles.grid}>
        {data.map((player) => {
          return (
            <div key={player.name} style={styles.player}>
              <h1>{player.name}</h1>
              <h2>Kills: {player.kills}</h2>
              <h2>Damage: {player.damageDealt}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "90vw",
  },
  player: {
    display: 'inline-block',
    alignItems: 'center',
    width: "25vmax",
    height: "auto",
    borderStyle: "solid",
    borderWidth: "1px",
    margin: '10px'
  },
};
