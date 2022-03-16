import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Toggle from "./icons/Toggle";
import "./App.css";
import { useState } from "react";
// import { switchColor } from "./lib/scripts";
import Page from "./components/Page";

function App() {
  const [playing, setPlaying] = useState(true); // SET TO FALSE WHEN USING SOUND
  // const [color, setColor] = useState(true);


  return (
    <>
      <div className="App flex flex-col items-center bg-slate-900 h-screen">
        <Header />
        <main className="my-12 flex flex-col items-center">
          {playing && <Canvas />}
          <button className="my-10 absolute bottom-32" onClick={() => setPlaying(!playing)}>
            <Toggle playing={playing}/>
          </button>
          {/* <button className="my-10 absolute bottom-10 rounded bg-white p-3 text-black" onClick={() => { switchColor(color); setColor(!color)}}>
            <p>switch color</p>
          </button> */}
          {/* <Canvas /> */}
          {/* <Page /> */}
        </main>
      </div>
    </>
  );
}

export default App;

// import React, { Component } from "react";
// import Sketch from "react-p5";
// import Logo from "./components/testComponent";

// function App() {
//   function setup(p5, canvasParentRef) {
//     p5.createCanvas(window.innerWidth, window.innerHeight).parent(
//       canvasParentRef
//     );
//     p5.frameRate(this.fr);
//     // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
//   }
//   function draw(p5) {
//     const test = new Logo(p5, 50, 90);
//     test.drawLogo(p5);
//   }

//   function render() {
//     return <Sketch setup={this.setup} draw={this.draw} />;
//   }
// }
// export default App;
