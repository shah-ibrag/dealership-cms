import { useState } from "react";
import "./styles.css";  


function ToggleButton() {
  const buttonStyle =   {
    backgroundColor: "rgb(215, 85, 15",
    border: "none",
    fontSize: "40px",
    height: "200px",
    width: "200px",
  }

  return (
    <button style={buttonStyle}>Styled Button</button>
  )
}

function App() {
  return (
    <>
      <ToggleButton />
    </>
  );
}

export default App;
