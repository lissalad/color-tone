import Canvas from "./components/Canvas";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <>
      <div className="App flex flex-col items-center bg-slate-900 h-screen">
        <Header />
        <main>
          <Canvas />
        </main>
      </div>
    </>
  );
}

export default App;
