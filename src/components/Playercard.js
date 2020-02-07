import React from "react";

export default function Playercard({ name, attack, defense }) {
  return (
    <div>
      <h3>{name}</h3>
      <h4>{attack}</h4>
      <h4>{defense}</h4>
    </div>
  );
}
