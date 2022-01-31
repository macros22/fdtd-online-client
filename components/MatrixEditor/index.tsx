// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import * as React from 'react';
import styles from './matrix-editor.module.scss';
import { useRefractionMatrix } from 'store/refraction-matrix.context';

const colors = ['#fafafa', '#a1bb21', '#1a52aa'];

const Editor: React.FC = () => {

  const width = 400;
  const height = width;
  const { matrix, setMatrix, returnObj } = useRefractionMatrix();
  const panelHeight = 70;

  const { rectWidth, rectHeight, rIndex1, rIndex2, rIndex3, n } = returnObj;

  const [currentShape, setCurrentShape] = React.useState(1);

  const rIndexes = [rIndex1, rIndex2, rIndex3];

  const panelPaddingY = height + rectHeight + 10;
  const panelPaddingX = 50;

  let panelShapes = [
    {
      type: 'rect',
      x: panelPaddingX,
      y: panelPaddingY,
      width: rectWidth,
      height: rectHeight,
      rIndex: rIndexes[0],
      color: colors[0],
    },
    {
      type: 'rect',
      x: panelPaddingX * 2,
      y: panelPaddingY,
      width: rectWidth,
      height: rectHeight,
      rIndex: rIndexes[1],
      color: colors[1],
    },
    {
      type: 'rect',
      x: panelPaddingX * 3,
      y: panelPaddingY,
      width: rectWidth,
      height: rectHeight,
      rIndex: rIndexes[2],
      color: colors[2],
    },
  ];

  React.useEffect(() => {
    console.log(matrix.length)
  }, [matrix])

  const handleMouseClick = () => {
    const newJ = focusedCoord.j;
    const newI = focusedCoord.i;

    setMatrix((prevMatrix) => {
      prevMatrix[newI][newJ] = panelShapes[currentShape].rIndex;
      return JSON.parse(JSON.stringify(prevMatrix));
    });
  };

  const initialFocusedCoords = { i: 0, j: 0 };

  const [focusedCoord, setFocusedCoord] = React.useState(initialFocusedCoords);

  // const handleMouseOut = () => {
  //   setFocusedCoord(initialFocusedCoords);
  // };

  const handleMouseMove = (e: any) => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.pageX;
    const pageY = e.pageY;
    const { x: gridX, y: gridY } = e.target.getBoundingClientRect();

    const x = pageX - gridX - rectWidth / 2;
    const y = pageY - gridY - rectWidth / 2;

    setFocusedCoord({
      i: Math.round((n * x) / width),
      j: Math.round((n * y) / height),
    });
  };

  return (
    <>
      <svg
        style={{
          // background: '#aaa',
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
        // onMouseOut={handleMouseOut}
        />

        {matrix.map((row, i) => {
          return row.map((item: number, j: number) => {
            if (i == focusedCoord.i && j == focusedCoord.j) {
              return (
                <rect
                  key={j}
                  width={rectWidth}
                  height={rectHeight}
                  x={i * rectWidth}
                  y={j * rectHeight}
                  fill="gray"
                  opacity="0.4"
                  onClick={handleMouseClick}
                />
              );
            }

            switch (item) {
              case panelShapes[1].rIndex:
                return (
                  <rect
                    key={j}
                    width={rectWidth}
                    height={rectHeight}
                    x={i * rectWidth}
                    y={j * rectHeight}
                    fill={panelShapes[1].color}
                  />
                );
              case panelShapes[2].rIndex:
                return (
                  <rect
                    key={j}
                    width={rectWidth}
                    height={rectHeight}
                    x={i * rectWidth}
                    y={j * rectHeight}
                    fill={panelShapes[2].color}
                  />
                );
              default:
                return null;
            }
          });
        })}

        {panelShapes.map((shape, index) => {
          switch (shape.type) {
            case 'rect':
              return (
                <>
                  <rect
                    key={index + shape.x}
                    fill={shape.color}
                    stroke="red"
                    strokeWidth={index == currentShape ? '2px' : '0px'}
                    strokeOpacity="1"
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    onClick={() => setCurrentShape(index)}
                  />
                  <text x={shape.x} y={shape.y + rectHeight * 3} className={styles.heavy}>
                    {shape.rIndex}
                  </text>
                </>
              );
          }
        })}
      </svg>
    </>
  );
};

interface IDifractionEditorProps {
  buttonStyle: string;
}

const MatrixEditor: React.FC<IDifractionEditorProps> = ({ buttonStyle }) => {

  return (
    <>
      {/*// <!-- Button trigger modal -->*/}
      <svg className={styles.matrixPreview} />
      <button
        type="button"
        className={"btn btn-primary " + buttonStyle}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Изменить
      </button>

      {/*// <!-- Modal -->*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Редактор дифракционной решетки
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <Editor />
            <div className="modal-footer">
              <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                Закрыть
              </button>
              <button
                type="button"
                className="btn btn-primary"
              // onClick={() => {
              //   setShowMatrix((prev) => prev + 1);
              // }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatrixEditor;


