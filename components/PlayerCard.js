export function PlayerCard(player) {
  let thisPlayer = player.player;
  let minutes = Math.floor(thisPlayer.timeSurvived / 60);
  let seconds = thisPlayer.timeSurvived - minutes * 60;
  return (
    <div style={{ border: "1px solid white", padding: ".5rem 1rem" }}>
      <h2>{thisPlayer.name}</h2>
      <p>Kills: {thisPlayer.kills}</p>
      <p>Assists: {thisPlayer.assists}</p>
      <p>Kill Rank: {thisPlayer.killPlace}</p>
      <p>Damage: {thisPlayer.damageDealt}</p>
      <p>Revives: {thisPlayer.revives}</p>
      <p>Longest Kill: {thisPlayer.longestKill}m</p>
      <p>Walking Distance: {thisPlayer.walkDistance}m</p>
      <p>Driving Distance: {thisPlayer.rideDistance}m</p>
      <p>Time Survived: {minutes} minutes {seconds} seconds</p>
    </div>
  );
}
