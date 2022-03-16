import { render } from "@testing-library/react";
import { useRef, useEffect } from "react";
import Play from "../icons/Play";
import Tone from "../lib/Tone";
// import toggle from "../lib/toggle";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let playRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function draw(tone, ctx, canvas, frameCount) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // white background
    tone.bounceIfWall(canvas);
    tone.move();

    tone.create(ctx, frameCount);

    // console.log("DRAW!!");
  }

  function toggle() {
    playRef = !playRef;
    console.log(playRef);
  }

  useEffect(() => {
      // play = false;
      const canvas = canvasRef.current;
      const play = playRef.current;
      const ctx = canvas.getContext("2d");
      let frameCount = 0;
      let animationFrameId;
      let tone = new Tone(ctx);
      
      // if (play) {
      const render = () => {
        frameCount += 1;
        draw(tone, ctx, canvas, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    // }
  }, [draw]);

  return (
    <>
      <canvas
        className="shadow-2xl bg-white my-5"
        ref={canvasRef}
        width="300"
        height="500"
        {...props}
      />
      <button onClick={toggle}>
        <Play />
      </button>
    </>
  );
};
export default Canvas;




  // function toggle(p5) {
  //   console.log(playing);

  //   if (playing) {
  //     p5.noLoop();
  //   } else {
  //     p5.loop();
  //   }
  // }
