import { useRef, useState } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import Canvas from "./Canvas";

function Page(props) {

  function setup(p5, canvasParentRef) {
    p5.createCanvas(360, 90).parent(canvasParentRef);
        p5.background(0, 80);

  }

  function draw(p5) {
    // p5.background(0, 80);

    p5.fill("white");
    p5.noStroke();
    p5.circle(180, 45, 25);
  }


  return (
    <div className="flex flex-col space-y-5 items-center">
      <Canvas />
      <Sketch
        setup={setup}
        draw={draw}
        className="shadow-2xl"
      />
    </div>
  );
}
export default Page;
