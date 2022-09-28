import { DrawType } from "components/plot-line/PlotLine.interface";
import { drawCircle, drawRect } from "libs/utils/canvas-draw";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  selectCurrentMaterialMatrixConfigInSet,
  selectMaterialMatrix,
  selectMaterialMatrixCountCol,
  selectMaterialMatrixCountRow,
  selectMaterials,
  updateMaterialMatrix,
} from "store/reducers/material-matrix.reducer";
import { colors } from "../colors";
import { IEditorCanvasProps } from "./EditorCanvas.props";

const initialFocusedCoords = { i: 0, j: 0 };

export const EditorCanvas = ({
  width,
  height,
  currentMaterial,
  srcPositionRelativeX,
  srcPositionRelativeY,
}: IEditorCanvasProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const countRow = useAppSelector(selectMaterialMatrixCountRow);
  const countCol = useAppSelector(selectMaterialMatrixCountCol);
  const materialMatrix = useAppSelector(selectMaterialMatrix);
  const currentMaterialMatrixConfigInSet = useAppSelector(
    selectCurrentMaterialMatrixConfigInSet
  );
  const materials = useAppSelector(selectMaterials);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [mousePressed, setMousePressed] = React.useState(false);

  const [focusedCoord, setFocusedCoord] = React.useState(initialFocusedCoords);

  const rectWidth = width / countCol;
  const rectHeight = height / countRow;

  // Handlers.
  const handleMouseClick = () => {
    const newJ = focusedCoord.j;
    const newI = focusedCoord.i;

    dispatch(
      updateMaterialMatrix({
        i: newI,
        j: newJ,
        newMaterialId: materials[currentMaterial].id,
      })
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!mousePressed) {
      setMousePressed(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mousePressed) {
      setMousePressed(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.clientX;
    const pageY = e.clientY;

    const { x: gridX, y: gridY } = (
      e.target as Element
    ).getBoundingClientRect();

    const x = pageX - gridX - rectWidth / 2;
    const y = pageY - gridY - rectHeight / 2;

    const newFocusedCol = Math.round((countCol * x) / width);
    const newFocusedRow = Math.round((countRow * y) / height);

    setFocusedCoord({
      j: newFocusedCol,
      i: newFocusedRow,
    });

    if (mousePressed) {
      dispatch(
        updateMaterialMatrix({
          i: newFocusedRow,
          j: newFocusedCol,
          newMaterialId: materials[currentMaterial].id,
        })
      );
    }
  };

  React.useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (canvas) {
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      canvas.setAttribute("width", "" + width);
      canvas.setAttribute("height", "" + height);

      if (context) {
        draw(context);
      }
    }
  }, [focusedCoord.i, focusedCoord.j, currentMaterialMatrixConfigInSet]);

  const draw: DrawType = (ctx: CanvasRenderingContext2D) => {
    drawRect(ctx, 0, 0, width, height, colors[0]);
    drawMatrix(ctx, materialMatrix);
    drawCircle(
      ctx,
      srcPositionRelativeX * width,
      height - srcPositionRelativeY * height,
      "blue"
    );

    if (!mousePressed) {
      drawRect(
        ctx,
        focusedCoord.j * rectWidth,
        focusedCoord.i * rectHeight,
        rectWidth,
        rectHeight,
        "green",
      );
    }
  };

  const drawMatrix = (ctx: CanvasRenderingContext2D, matrix: number[][]) => {
    for (let i = 0; i < countRow; ++i) {
      for (let j = 0; j < countCol; ++j) {
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
            materials[colorIndex].color,
          );
        }
      }
    }
  };

  return (
    <canvas
      onClick={handleMouseClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
    />
  );
};