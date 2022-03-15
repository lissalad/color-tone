import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Toggle from "./icons/Toggle";
import "./App.css";
import { useState } from "react";

function App() {
  const [playing, setPlaying] = useState(true); // SET TO FALSE WHEN USING SOUND
  return (
    <>
      <div className="App flex flex-col items-center bg-slate-900 h-screen">
        <Header />
        <main className="my-12 flex flex-col items-center">
          {playing && <Canvas />}
          <button className="my-10 absolute bottom-32" onClick={() => setPlaying(!playing)}>
            <Toggle playing={playing}/>
          </button>
        </main>
      </div>
    </>
  );
}

export default App;
