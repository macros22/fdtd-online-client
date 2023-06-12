import { DrawType } from "components/plot-line/PlotLine.interface";
import { drawCircle, drawRect, drawStar } from "libs/utils/canvas-draw";
import React from "react";
import { useAppSelector } from "store/hooks";
import {
  selectLineDetector,
  selectMaterialMatrixCountCol,
  selectMaterialMatrixCountRow,
  selectMaterials,
} from "store/slices/material-matrix.slice";
import { colors } from "../../constants";
import { IPreviewMatrixProps } from "./PreviewMatrixEditor.props";

export const PreviewMatrix = ({
  simulationDimension,
  materialMatrix,
  srcPositionRelativeX,
  srcPositionRelativeY,
}: IPreviewMatrixProps): JSX.Element => {
  // Matrix sizes.
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const countRow = useAppSelector(selectMaterialMatrixCountRow);
  const countCol = useAppSelector(selectMaterialMatrixCountCol);
  const materials = useAppSelector(selectMaterials);

  const lineDetector = useAppSelector(selectLineDetector);
  const detectorLineCoord = Math.floor(
    lineDetector.relativeCoord *
      (lineDetector.direction === "vertical" ? countCol : countRow)
  );

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  let rectWidth = width / countCol;
  let rectHeight = height / countRow;

  const draw: DrawType = (ctx: CanvasRenderingContext2D) => {
    drawRect(ctx, 0, 0, width, height, colors[0]);
    drawMatrix(ctx, materialMatrix);
    drawCircle(
      ctx,
      srcPositionRelativeX * width,
      (1 - srcPositionRelativeY) * height,
      colors[1]
    );
    drawStar({
      ctx,
      cx: srcPositionRelativeX * width,
      cy: (1 - srcPositionRelativeY) * height,
    });
  };

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Make square shape.
      canvas.style.width = "100%";
      canvas.style.height = canvas.offsetWidth.toString();

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
    detectorLineCoord,
    width,
    srcPositionRelativeX,
    srcPositionRelativeY,
    lineDetector.direction
  ]);

  const drawMatrix = (ctx: CanvasRenderingContext2D, matrix: number[][]) => {
    for (let i = 0; i < countRow; i++) {
      for (let j = 0; j < countCol; j++) {
        const colorIndex = materials.findIndex(
          (material) => material.id == matrix[i][j]
        );

        if (colorIndex > 0) {
          drawRect(
            ctx,
            j * rectWidth,
            i * rectHeight,
            rectWidth,
            rectHeight,
            materials[colorIndex].color
          );
        }

        if (lineDetector.direction === "vertical") {
          if (j == detectorLineCoord) {
            drawRect(
              ctx,
              j * rectWidth,
              i * rectHeight,
              5,
              rectHeight,
              "rgba(0,0,0,0.1)"
            );
          }
        } else {
          if (i == detectorLineCoord) {
            drawRect(
              ctx,
              j * rectWidth,
              i * rectHeight,
              rectWidth,
              5,
              "rgba(0,0,0,0.1)"
            );
          }
        }
      }
    }
  };

  return <canvas ref={canvasRef} />;
};
