import React, { useState } from "react";
import "./App.css";
import Accordion from "./components/accordion/accordion";
import ChartComponent from "./components/chart/Chart";
import RandomColor from "./components/random-color/RandomColor";

function App() {
  const [chartType, setChartType] = useState("line");

  const toggleChartType = () => {
    setChartType(chartType === "line" ? "candle" : "line");
  };
  return (
    <div className="App">
      <Accordion />
      <RandomColor />

      <button onClick={toggleChartType}>
        Switch to {chartType === "line" ? "Candlestick" : "Line"} Chart
      </button>
      <ChartComponent chartType={chartType} />
    </div>
  );
}

export default App;
