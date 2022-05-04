import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectCurrentMaterialMatrixConfigInSet,
  selectMaterialMatrix,
  selectMaterialMatrixCountCol,
  selectMaterialMatrixCountRow,
  selectMaterials,
  updateMaterialMatrix,
} from 'store/reducers/material-matrix.reducer';
import { drawType } from 'components/molecules/Canvas/useCanvas';
import React from 'react';

type EditorCanvasProps = {
  width: number;
  height: number;
  currentMaterial: number;
};

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  width,
  height,
  currentMaterial,
}) => {
  // Matrix sizes.
  //   const width = 400;
  //   const height = 400;

  const dispatch = useAppDispatch();

  const countRow = useAppSelector(selectMaterialMatrixCountRow);
  const countCol = useAppSelector(selectMaterialMatrixCountCol);
  const materialMatrix = useAppSelector(selectMaterialMatrix);
  const currentMaterialMatrixConfigInSet = useAppSelector(selectCurrentMaterialMatrixConfigInSet);
  const materials = useAppSelector(selectMaterials);
  

  //   const countRow = 20;
  //   const countCol = 20;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [mousePressed, setMousePressed] = React.useState(false);

  const initialFocusedCoords = { i: 0, j: 0 };

  const [focusedCoord, setFocusedCoord] = React.useState(initialFocusedCoords);

  const rectwidth = width / countCol;
  const rectheight = height / countRow;

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

    const x = pageX - gridX - rectwidth / 2;
    const y = pageY - gridY - rectheight / 2;

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

  const draw: drawType = (ctx) => {
    drawRect(ctx, 0, 0, '#eddede', width, height);
    drawMatrix(ctx, materialMatrix);

    if (!mousePressed) {
      drawRect(
        ctx,
        focusedCoord.j * rectwidth,
        focusedCoord.i * rectheight,
        'green',
        rectwidth,
        rectheight
      );
    }
  };

  React.useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (canvas) {
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      canvas.setAttribute('width', '' + width);
      canvas.setAttribute('height', '' + height);

      if (context) {
        draw(context);
      }
    }
  }, [focusedCoord.i, focusedCoord.j, currentMaterialMatrixConfigInSet]);

  const drawRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string = 'black',
    width: number,
    height: number
    // scaleX: number = 1,
    // scaleY: number = 1
  ) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    // ctx.rect(x, tY(y + height), width, height)
    ctx.rect(x, y, width, height);
    ctx.fill();

    // ctx.globalAlpha= 0.3;
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
            j * rectwidth,
            i * rectheight,
            materials[colorIndex].color,
            rectwidth,
            rectheight
          );
        }
      }
    }
  };

  return (
    <>
      <canvas
        onClick={handleMouseClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
      />
    </>
  );
};

export default EditorCanvas;
