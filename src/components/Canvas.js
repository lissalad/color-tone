import { useRef, useEffect } from "react";
import Tone from "../lib/Tone";

const Canvas = (props) => {
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let tone = new Tone();

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height); // white background

    tone.move(canvas);
    tone.render(ctx);
  }, []);

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
