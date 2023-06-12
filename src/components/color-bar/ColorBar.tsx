import React from "react";
import { defaultGradient } from "libs/utils/default-gradient";
import { IColorBarProps } from "./ColorBar.props";
import { drawPlotMarksY } from "libs/utils/canvas-draw";
import styles from "./ColorBar.module.scss";

export const ColorBar = ({
  gradientWidth,
  gradientHeight,
  max = 0.4,
  min = -0.4,
  units,
}: IColorBarProps): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const init = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const numberSpaceWidth = gradientWidth * 6;
      const width = gradientWidth + numberSpaceWidth;
      const height = gradientHeight;

      const scaleCoeff = (max - min) / gradientHeight;

      canvas.width = width;
      canvas.height = height;

      const ctx: CanvasRenderingContext2D | null =
        canvas.getContext("2d") || null;

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);

        // Add main points.
        const grad = defaultGradient;
        for (const i in grad) {
          gradient.addColorStop(Number(i), grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(numberSpaceWidth, 0, gradientWidth, gradientHeight);

        const PARTS = 20;

        // Draw Oy tick marks numbers.
        const INTERVAL_Y = height / PARTS;
        const FONT_SIZE = 12;
        ctx.textAlign = "right";
        ctx.font = `${FONT_SIZE}px Inter bold`;
        ctx.fillStyle = "#4a4a4a";

        // ctx.textBaseline = 'middle';
        const tY = (y: number) => height - y;
        for (
          let y = FONT_SIZE / 3;
          y <= height;
          y += INTERVAL_Y + FONT_SIZE * 0.58
        ) {
          // const label = (y * scaleCoeff + min).toFixed(2) + "";
          const label = (y * scaleCoeff + min).toExponential(2).toString();
          ctx.save();
          ctx.translate(width * 0.65, tY(y));
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }

        drawPlotMarksY({
          ctx,
          yStart: INTERVAL_Y / 15,
          yEnd: height,
          interval: height / PARTS,
          chartX0: 0,
          chartWidth: gradientWidth,
          markLength: gradientWidth,
          tY,
        });
      }
    }
  };

  React.useEffect(() => {
    init();
  }, [gradientWidth, gradientHeight, max, min]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} />
      <div className={styles.label}>{units}</div>
    </div>
  );
};
