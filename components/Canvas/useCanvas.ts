import React from 'react';

type drawType = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

const useCanvas = (draw: drawType) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const WIDTH = 700;
  const HEIGHT = 500;

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      canvas.setAttribute('width', '' + WIDTH);
      canvas.setAttribute('height', '' + HEIGHT);

      console.log(canvas.width, canvas.height);

      //Our first draw
      if (context) {
        let frameCount = 0;
        let animationFrameId: any;

        //Our draw came here
        // const render = () => {
        //   frameCount++;
        //   draw(context, frameCount);
        //   animationFrameId = window.requestAnimationFrame(render);
        // };
        // render();
        draw(context, 5);
        return () => {
          window.cancelAnimationFrame(animationFrameId);
        };
      }
    }
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
