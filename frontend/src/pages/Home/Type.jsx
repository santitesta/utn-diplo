import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Esta es una loteria blockchain",
          "Diseñada por FiveBlocks!",
          "Para jugar de manera Transparente y Segura",
          "Con tecnología avanzada para proteger tus datos",
          "Y garantizar la imparcialidad en cada sorteo"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 60,
      }}
    />
  );
}

export default Type;
