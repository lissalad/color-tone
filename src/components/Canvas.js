import { render } from "@testing-library/react";
import { useRef, useEffect } from "react";
import Tone from "../lib/Tone";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function draw(tone, ctx, frameCount) {

    tone.move();

    tone.create(ctx, frameCount);

    // console.log("DRAW!!");
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    let tone = new Tone(ctx);


    const render = () => {
      frameCount += 1;
      draw(tone, ctx, frameCount);
      // animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      className="shadow-2xl bg-white my-5"
      ref={canvasRef}
      width="300"
      height="560"
      {...props}
    />
  );
};
export default Canvas;
