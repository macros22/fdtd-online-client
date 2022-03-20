// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import * as React from 'react';
import styles from './MatrixEditor.module.scss';
import { MatrixEditorProps } from './MatrixEditor.props';
import { Button } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LabNames } from 'types/types';
import { selectLabName } from 'app/reducers/labTypeSlice';
import { selectEpsilonMatrix, selectEpsilonMatrixCountX, selectEpsilonMatrixCountY, selectEpsilonMatrixRectHeight, selectEpsilonMatrixRectWidth, selectEpsilonMatrixValues, setEpsilonMatrix2D, updateEpsilonMatrix2D } from 'app/reducers/epsilon-matrix.reducer';

const colors = ['#fafafa', 'tomato', '#1a52aa'];

const Editor: React.FC = () => {
  // Matrix sizes.
  const width = 400;
  const height = width;
  
  const countX = useAppSelector(selectEpsilonMatrixCountX);
  const countY = useAppSelector(selectEpsilonMatrixCountY);
  const matrix = useAppSelector(selectEpsilonMatrix);
  const rectWidth = useAppSelector(selectEpsilonMatrixRectWidth);
  const rectHeight = useAppSelector(selectEpsilonMatrixRectHeight);

  console.log(rectWidth)
  console.log(rectHeight)
  const rIndexes = useAppSelector(selectEpsilonMatrixValues);

  const dispatch = useAppDispatch();


  // Under matrix panel size.
  const panelHeight = 70;

  const [currentShape, setCurrentShape] = React.useState(1);

  const panelPaddingY = height + rectHeight + 10;
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
    dispatch(updateEpsilonMatrix2D({i:newI, j: newJ, newEpsilonValue: panelShapes[currentShape].rIndex}))
  };

  React.useEffect(() => {
    // console.log(focusedCoord);
  }, [focusedCoord])

  const handleMouseMove = (e: React.MouseEvent) => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.clientX;
    const pageY = e.clientY;

    const { x: gridX, y: gridY } = (
      e.target as Element
    ).getBoundingClientRect();

    const x = pageX - gridX - rectWidth / 2;
    const y = pageY - gridY - rectHeight / 2;

    setFocusedCoord({
      i: Math.round((countX * x) / width),
      j: Math.round((countY * y) / height),
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
                  x={i * rectWidth}
                  y={j * rectHeight}
                  fill={panelShapes[colorIndex].color}

                  // element is invisible for clicks.
                  style={{pointerEvents: "none"}}
                />
              );
            }
          });
        })}

        {/* Focused rect */}
        <rect
          width={rectWidth}
          height={rectHeight}
          x={focusedCoord.i * rectWidth}
          y={focusedCoord.j * rectHeight}
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
                    width={shape.width}
                    height={shape.height}
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

  const resetMatrix = (currentLabName: LabNames) => {
    dispatch(setEpsilonMatrix2D(currentLabName));
  }

  React.useEffect(() => {
    dispatch(setEpsilonMatrix2D(currentLabName));
  }, [currentLabName])

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
                <Button onClick={() => resetMatrix(currentLabName)}>Reset</Button>
                <Button onClick={() => setIsOpend(false)}>Back</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MatrixEditor;
