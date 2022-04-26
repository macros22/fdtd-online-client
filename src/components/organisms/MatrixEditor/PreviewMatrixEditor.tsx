import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectLabName } from 'app/reducers/labTypeSlice';
import styles from './MatrixEditor.module.scss';
import {
  selectMediumMatrix,
  selectMediumMatrixCountCol,
  selectMediumMatrixCountRow,
  selectMediums,
} from 'app/reducers/medium-matrix.reducer';
import { drawType } from 'components/molecules/Canvas/useCanvas';
import React from 'react';
import { LabNames } from 'types/types';

type PreviewMatrixProps = {
  width: number;
  height: number;
  labName: LabNames;
  mediumMatrix: string[][];
};

const PreviewMatrix: React.FC<PreviewMatrixProps> = ({
  width,
  height,
  labName,
  mediumMatrix
}) => {
  // Matrix sizes.
  //   const width = 400;
  //   const height = 400;

  const dispatch = useAppDispatch();

  const countRow = useAppSelector(selectMediumMatrixCountRow);
  const countCol = useAppSelector(selectMediumMatrixCountCol);
  const mediums = useAppSelector(selectMediums);

  // let index = 0;
  // // React.useEffect(() => {
  //   switch (labName) {
  //     case LabNames.LAB_3D:
  //     case LabNames.LAB_2D:
  //     case LabNames.INTERFERENCE:
  //         index = 0;
  //       break;
    
  //     case LabNames.DIFRACTION:
  //        index = 1;
  //     break;
  
  //     case LabNames.BORDER:
  //        index = 2;
  //     break;
  
  //     default:
  //       break;
  //   }
  
   // }, [labName])
  
   // const mediumMatrix = useAppSelector(selectMediumMatrixSet)[index];

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const rectwidth = width / countCol;
  const rectheight = height / countRow;
  
  const draw: drawType = (ctx) => {
    drawRect(ctx, 0, 0, '#eddede', width, height);
    drawMatrix(ctx, mediumMatrix);
  };


  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      canvas.setAttribute('width', '' + width);
      canvas.setAttribute('height', '' + height);

      if (context) {
        draw(context);
      }
    }

  }, [labName, mediumMatrix]);

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
            j * rectwidth,
            i * rectheight,
            mediums[colorIndex].color,
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
        // onClick={ handleMouseClick }
        ref={ canvasRef }
      />
    </>
  );
};

export default PreviewMatrix;

