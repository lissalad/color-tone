import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Toggle from "./icons/Toggle";
import "./App.css";
import { useState } from "react";

function App() {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <div className="App flex flex-col items-center bg-slate-900 h-screen">
        <Header />
        <main>
          {playing && <Canvas />}
          <button onClick={() => setPlaying(!playing)}>
            <Toggle playing={playing}/>
          </button>
        </main>
      </div>
    </>
  );
}

export default App;
