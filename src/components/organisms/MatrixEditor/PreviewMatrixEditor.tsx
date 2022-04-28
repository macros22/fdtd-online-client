import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { selectsimulationDimension} from 'app/reducers/labTypeSlice';
import styles from './MatrixEditor.module.scss';
import {
  selectMediumMatrix,
  selectMediumMatrixCountCol,
  selectMediumMatrixCountRow,
  selectMediums,
} from 'app/reducers/medium-matrix.reducer';
import { drawType } from 'components/molecules/Canvas/useCanvas';
import React from 'react';
import { SimulationDimension } from 'types/types';
// import { SimulationDimensionState } from 'app/reducers/app-config.reducer';


import { DetailedHTMLProps, HTMLAttributes, MutableRefObject, ReactNode, RefObject } from 'react';

export interface PreviewMatrixProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

  simulationDimension: SimulationDimension;  mediumMatrix: string[][];
}



const PreviewMatrix: React.FC<PreviewMatrixProps> = ({
  simulationDimension,
  mediumMatrix
}) => {
  // Matrix sizes.
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);
  
  

  const countRow = useAppSelector(selectMediumMatrixCountRow);
  const countCol = useAppSelector(selectMediumMatrixCountCol);
  const mediums = useAppSelector(selectMediums);


  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  let rectWidth = width / countCol;
  let rectHeight = height / countRow;
  
  const draw: drawType = (ctx) => {
    drawRect(ctx, 0, 0, '#eddede', width, height);
    drawMatrix(ctx, mediumMatrix);
  };

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Make square shape.
      canvas.style.width ='100%';
      canvas.style.height= canvas.offsetWidth + '';
      
      const newWidth = canvas.offsetWidth || 100; 

      canvas.width  = newWidth;
      canvas.height = newWidth;

      rectWidth = canvas.width / countCol
      rectHeight = canvas.height / countRow;

      setWidth(canvas.width);
      setHeight(canvas.height);
    }
  }

  React.useEffect(() => {
    resizeCanvas();
  }, []);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (context) {
        draw(context);
      }
    }

  }, [simulationDimension, mediumMatrix, width]);

  const drawRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string = 'black',
    width: number,
    height: number,
  ) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
  };

  const drawMatrix = (ctx: CanvasRenderingContext2D, matrix: string[][]) => {
    for (let i = 0; i < countRow; i++) {
      for (let j = 0; j < countCol; j++) {
        // console.log(i)
        const colorIndex = mediums.findIndex(
          (medium) => medium.name == matrix[i][j]
        );

        if (colorIndex > 0) {
          drawRect(
            ctx,
            j * rectWidth,
            i * rectHeight,
            mediums[colorIndex].color,
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
        ref={ canvasRef }
      />
    </>
  );
};

export default PreviewMatrix;

