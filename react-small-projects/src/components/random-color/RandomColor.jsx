import "./RandomColor.css";
import { useState } from "react";
import Button from "../button/Button";
export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }
  function handleCreateRandomHexColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
      setColor(hexColor);
    }
  }
  function handleCreateRandomRGBColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }
  return (
    <div className="container" style={{ background: color }}>
      <div>
        <h1>{color}</h1>
      </div>
      <div className="buttons">
        {" "}
        <Button onClick={() => setTypeOfColor("hex")}>create Hex Color</Button>
        <button onClick={() => setTypeOfColor("rgb")}>create RGB Color</button>
        <button
          onClick={
            typeOfColor === "hex"
              ? handleCreateRandomHexColor
              : handleCreateRandomRGBColor
          }
        >
          Generate Random Color
        </button>
      </div>
    </div>
  );
}
