import React from 'react';

// type drawType = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
export type drawType = (ctx: CanvasRenderingContext2D) => void;

const useCanvas = (draw: drawType, width: number, height: number) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);


  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      canvas.setAttribute('width', '' + width);
      canvas.setAttribute('height', '' + height);

      //  console.log(canvas.width, canvas.height);

      //Our first draw
      if (context) {
        // let frameCount = 0;
        // let animationFrameId: any;

        //Our draw came here
        // const render = () => {
        //   frameCount++;
        //   draw(context, frameCount);
        //   animationFrameId = window.requestAnimationFrame(render);
        // };
        // render();
        // draw(context, 5);
        draw(context);
        // return () => {
        //   window.cancelAnimationFrame(animationFrameId);
        // };
      }
    }
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
