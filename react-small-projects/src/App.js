import "./App.css";
import Accordion from "./components/accordion/accordion";
import RandomColor from "./components/random-color/RandomColor";

function App() {
  return (
    <div className="App">
      {/* accordian component goes here*/}
      <Accordion />
      <RandomColor />
    </div>
  );
}

export default App;
