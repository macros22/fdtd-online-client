// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import * as React from 'react';
import styles from './MatrixEditor.module.scss';
import { MatrixEditorProps } from './MatrixEditor.props';
import { Button } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LabNames } from 'types/types';
import { selectLabName } from 'app/reducers/labTypeSlice';
import {
  selectEpsilonMatrix,
  selectEpsilonMatrixCountRow,
  selectEpsilonMatrixCountCol,
  selectEpsilonMatrixValues,
  setEpsilonMatrix,
  updateEpsilonMatrix,
} from 'app/reducers/epsilon-matrix.reducer';
import DragAndDrop from './DragAndDrop';

const colors = ['#fafafa', 'tomato', '#1a52aa'];

const Editor: React.FC = () => {
  // Matrix sizes.
  const width = 400;
  const height = 400;

  const countRow = useAppSelector(selectEpsilonMatrixCountRow);
  const countCol = useAppSelector(selectEpsilonMatrixCountCol);
  const matrix = useAppSelector(selectEpsilonMatrix);
  const rIndexes = useAppSelector(selectEpsilonMatrixValues);

  
  React.useEffect(() => {
    console.log(matrix);
    console.log(rIndexes);
  }, [matrix, rIndexes]);

  const rectWidth = width / countCol;
  const rectHeight = height / countRow;


  const dispatch = useAppDispatch();

  // Under matrix panel size.
  const panelHeight = 70;

  const [currentShape, setCurrentShape] = React.useState(1);

  const panelPaddingY = height + Math.min(rectWidth, rectHeight) + 10;
  const panelPaddingX = 50;

  // Panel with refraction index shapes.
  let panelShapes = new Array(rIndexes.length).fill({}).map((_, index) => ({
    type: 'rect',
    x: panelPaddingX * (index + 1),
    y: panelPaddingY,
    width: rectWidth,
    height: rectHeight,
    rIndex: rIndexes[index],
    color: colors[index],
  }));

  const initialFocusedCoords = { i: 0, j: 0 };

  const [focusedCoord, setFocusedCoord] = React.useState(initialFocusedCoords);

  // Handlers.
  const handleMouseClick = () => {
    const newJ = focusedCoord.j;
    const newI = focusedCoord.i;
    console.log(newI, newJ, 'asdsd');
    dispatch(
      updateEpsilonMatrix({
        i: newI,
        j: newJ,
        newEpsilonValue: panelShapes[currentShape].rIndex,
      })
    );
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

    // console.log('x, y:', x, y);
    // console.log(
    //   'focusedCoord (i,j)',
    //   Math.round((countRow * y) / height),
    //   Math.round((countCol * x) / width)
    // );
    setFocusedCoord({
      j: Math.round((countCol * x) / width),
      i: Math.round((countRow * y) / height),
    });
  };

  return (
    <>
      <svg
        style={{
          height: height + panelHeight + 'px',
          width: width + 'px',
        }}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={colors[0]}
          onClick={handleMouseClick}
          onMouseMove={handleMouseMove}
        />

        {matrix.map((row, i) => {
          return row.map((item: number, j: number) => {
            const colorIndex = panelShapes.findIndex(
              (panel) => panel.rIndex == item
            );
            if (colorIndex > 0) {
              return (
                <rect
                  key={i + '' + j}
                  width={rectWidth}
                  height={rectHeight}
                  x={j * rectWidth}
                  y={i * rectHeight}
                  fill={panelShapes[colorIndex].color}
                  // element is invisible for clicks.
                  style={{ pointerEvents: 'none' }}
                />
              );
            }
          });
        })}

        {/* Focused rect */}
        <rect
          width={rectWidth}
          height={rectHeight}
          x={focusedCoord.j * rectWidth}
          y={focusedCoord.i * rectHeight}
          fill='gray'
          opacity='0.4'
          onClick={handleMouseClick}
        />

        {panelShapes.map((shape, index) => {
          switch (shape.type) {
            case 'rect':
              return (
                <React.Fragment key={index + shape.x}>
                  <rect
                    fill={shape.color}
                    stroke='black'
                    strokeWidth={index == currentShape ? '2px' : '0px'}
                    strokeOpacity='1'
                    x={shape.x}
                    y={shape.y}
                    width={Math.min(shape.width, shape.height)}
                    height={Math.min(shape.width, shape.height)}
                    onClick={() => setCurrentShape(index)}
                  />
                  <text
                    x={shape.x}
                    y={shape.y + rectHeight * 3}
                    className={styles.heavy}
                  >
                    {shape.rIndex}
                  </text>
                </React.Fragment>
              );
          }
        })}
      </svg>
    </>
  );
};

const MatrixEditor: React.FC<MatrixEditorProps> = () => {
  const [isOpened, setIsOpend] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentLabName = useAppSelector(selectLabName);
  React.useEffect(() => {
    console.log(currentLabName);
  }, [currentLabName]);

  const resetMatrix = (currentLabName: LabNames) => {
    dispatch(setEpsilonMatrix({ currentLabName }));
  };

  React.useEffect(() => {
    if (currentLabName == LabNames.LAB_2D) {
      dispatch(
        setEpsilonMatrix({ currentLabName, newCountRow: 1, newCountCol: 25 })
      );
    } else {
      dispatch(
        setEpsilonMatrix({ currentLabName, newCountRow: 40, newCountCol: 40 })
      );
    }

    // }, []);
  }, [currentLabName]);

  return (
    <>
      {/* <!-- Button trigger modal -->*/}
      <svg className={styles.matrixPreview} />
      <Button onClick={() => setIsOpend(true)}>Изменить</Button>
      {isOpened && (
        <>
          <div className={styles.substrate}></div>

          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              <h2>Editor</h2>
              <Editor />
              <div className={styles.buttons}>
                <Button onClick={() => resetMatrix(currentLabName)}>
                  Reset
                </Button>
                <Button onClick={() => setIsOpend(false)}>Back</Button>
              </div>
            </div>
            {/* <DragAndDrop WIDTH={400} HEIGHT={400} /> */}
          </div>
        </>
      )}
    </>
  );
};

export default MatrixEditor;
