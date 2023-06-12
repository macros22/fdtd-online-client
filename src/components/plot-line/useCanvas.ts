import React from "react";
import { DrawType } from "./PlotLine.interface";

export const useCanvas = (draw: DrawType, width: number, height: number) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

      console.log('AA', width)
      canvas.setAttribute("width", width.toString());
      canvas.setAttribute("height", (height).toString());
      canvas.setAttribute("height", (height+60).toString());

      if (context) {
        draw(context);
      }
    }
  }, [draw]);

  return canvasRef;
};
