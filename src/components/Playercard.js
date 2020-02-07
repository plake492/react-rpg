import React from "react";

export default function Playercard({
  name,
  attack,
  defense,
  img,
  health,
  selectCharacter,
  i
}) {
  return (
    <div className="player-card">
      <h3>{name}</h3>
      <img width={"200px"} src={img} alt={`player ${name} pic`}></img>
      <h4>Attack: {attack}</h4>
      <h4>Defense: {defense}</h4>
      <h4>Health: {health}</h4>
      {selectCharacter ? (
        <button onClick={() => selectCharacter(i)}>Choose Fighter</button>
      ) : null}
    </div>
  );
}
