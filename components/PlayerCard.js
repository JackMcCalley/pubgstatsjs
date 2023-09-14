export function PlayerCard(player) {
    console.log(player.player)
  return (
    <div style={{border: '1px solid white', padding: '.5rem 1rem'}}>
      <h4>{player.player.name}</h4>
      <p>Kills: {player.player.kills}</p>
      <p>Kill Rank: {player.player.killPlace}</p>
      <p>Damage: {player.player.damageDealt}</p>
      <p>Longest Kill: {player.player.longestKill}m</p>
    </div>
  );
}
