import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
// import { selectsimulationDimension} from 'app/reducers/labTypeSlice';
import styles from "./MatrixEditor.module.scss";
import {
  selectMaterialMatrix,
  selectMaterialMatrixCountCol,
  selectMaterialMatrixCountRow,
  selectMaterials,
} from "store/reducers/material-matrix.reducer";
import { drawType } from "components/molecules/Canvas/useCanvas";
import React from "react";
import { SimulationDimension } from "types/types";

import { colors } from "./colors";

export interface PreviewMatrixProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  simulationDimension: SimulationDimension;
  materialMatrix: number[][];
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
}

const PreviewMatrix: React.FC<PreviewMatrixProps> = ({
  simulationDimension,
  materialMatrix,
  srcPositionRelativeX,
  srcPositionRelativeY,
}) => {
  // Matrix sizes.
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const countRow = useAppSelector(selectMaterialMatrixCountRow);
  const countCol = useAppSelector(selectMaterialMatrixCountCol);
  const materials = useAppSelector(selectMaterials);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  let rectWidth = width / countCol;
  let rectHeight = height / countRow;

  const draw: drawType = (ctx: CanvasRenderingContext2D) => {
    drawRect(ctx, 0, 0, colors[0], width, height);
    drawMatrix(ctx, materialMatrix);
    drawCircle(
      ctx,
      srcPositionRelativeX * width,
      srcPositionRelativeY * height,
      colors[1]
    );
  };

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Make square shape.
      canvas.style.width = "100%";
      canvas.style.height = canvas.offsetWidth + "";

      const newWidth = canvas.offsetWidth || 100;

      canvas.width = newWidth;
      canvas.height = newWidth;

      rectWidth = canvas.width / countCol;
      rectHeight = canvas.height / countRow;

      setWidth(canvas.width);
      setHeight(canvas.height);
    }
  };

  React.useEffect(() => {
    resizeCanvas();
  }, []);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (context) {
        draw(context);
      }
    }
  }, [
    simulationDimension,
    materialMatrix,
    width,
    srcPositionRelativeX,
    srcPositionRelativeY,
  ]);

  const drawRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color = "black",
    width: number,
    height: number
  ) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color = "black",
    scaleX = 1,
    scaleY = 1,
    radius = 10
  ) => {
    // ctx.lineWidth = width;
    // ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    // ctx.globalAlpha = 0.3;
    ctx.beginPath();

    ctx.arc(x * scaleX, height - y * scaleY, radius, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.closePath();
  };

  const drawMatrix = (ctx: CanvasRenderingContext2D, matrix: number[][]) => {
    for (let i = 0; i < countRow; i++) {
      for (let j = 0; j < countCol; j++) {
        // console.log(i)
        const colorIndex = materials.findIndex(
          (material) => material.id == matrix[i][j]
        );

        if (colorIndex > 0) {
          drawRect(
            ctx,
            j * rectWidth,
            i * rectHeight,
            materials[colorIndex].color,
            rectWidth,
            rectHeight
          );
        }
      }
    }
  };

  return (
    <>
      <canvas
        // onClick={ handleMouseClick }
        ref={canvasRef}
      />
    </>
  );
};

export default PreviewMatrix;
