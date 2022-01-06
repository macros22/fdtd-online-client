import * as React from 'react';

// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import { useDifractionMatrix } from './useDifractionMatrix';

import classes from './style.module.scss';
import { useRefractionMatrix } from 'store/refraction-matrix.context';

type positionType = {
  x: number;
  y: number;
  coords: {
    x: number;
    y: number;
  };
};

type ShapeProps = {
  parentWidth: number;
  parentHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  panelHeight: number;
  changeMatrix: (x: number, y: number) => void;
  changeAllShapes: () => void;
};

const Shape: React.FC<ShapeProps> = ({
  parentWidth,
  parentHeight,
  width,
  height,
  x,
  y,
  panelHeight,
  changeMatrix,
  changeAllShapes,
}) => {
  const initX = x;
  const initY = y;

  const [position, setPosition] = React.useState<positionType>({
    x,
    y,
    coords: {
      x,
      y,
    },
  });

  // Use useRef to create the function once and hold a reference to it.
  const handleMouseMove = React.useRef((e) => {
    {
      setPosition((position) => {
        const xDiff = position.coords.x - e.pageX;
        const yDiff = position.coords.y - e.pageY;

        const newX = position.x - xDiff;
        const newY = position.y - yDiff;

        if (newX > 0 && newY > 0 && newX < parentWidth - width && newY < parentHeight - height) {
          return {
            x: newX,
            y: newY,
            coords: {
              x: e.pageX,
              y: e.pageY,
            },
          };
        } else {
          return position;
        }
      });
    }
  });

  const handleMouseDown = (e) => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition((position) =>
      Object.assign({}, position, {
        coords: {
          x: pageX,
          y: pageY,
        },
      })
    );
    document.addEventListener('mousemove', handleMouseMove.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove.current);

    if (
      position.x > 0 &&
      position.y > 0 &&
      position.x < parentWidth - width &&
      position.y < parentHeight - panelHeight - height
    ) {
      changeMatrix(position.x, position.y);

      // Use Object.assign to do a shallow merge so as not to
      // totally overwrite the other values in state.
      setPosition((position) =>
        Object.assign({}, position, {
          coords: {},
        })
      );
    } else {
      setPosition({
        x: initX,
        y: initY,
        coords: {
          x: initX,
          y: initY,
        },
      });
    }
  };

  return (
    <>
      <rect
        x={position.x}
        y={position.y}
        width={width}
        height={height}
        fill="#b5f"
        stroke="gray"
        strokeWidth="1"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

interface IEditorInterface {
  showMatrix: number;
}

const Editor: React.FC<IEditorInterface> = ({ showMatrix }) => {
  // React.useEffect(() => {
  //   console.log(matrix);
  // }, [showMatrix]);

  const width = 400;
  const height = width;
  const [matrix, setMatrix, obj] = useRefractionMatrix();

  const panelHeight = 70;

  // const { matrix, setMatrix, rectWidth, rectHeight, rIndex2, n } = useDifractionMatrix(
  const { rectWidth, rectHeight, rIndex2, n } = obj;

  const [currentShape, setCurrentShape] = React.useState(1);

  const rIndexes = [1, 1.5, 2];
  const colors = ['#fafafa', '#a1bb21', '#1a52aa'];

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
  // const initPanelShapes =  panelShapes;

  const handleMouseClick = () => {
    const newJ = focusedCoord.j;
    const newI = focusedCoord.i;
    // console.log(newI, ':==:', newJ);
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
    // console.log(gridX, '::', gridY, '----grid');
    // console.log(pageX, '::', pageY, '----page');
    const x = pageX - gridX - rectWidth / 2;
    const y = pageY - gridY - rectWidth / 2;

    // console.log(rectWidth);
    // console.log(x, '::', y);

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
                  <text x={shape.x} y={shape.y + rectHeight * 3} className={classes.heavy}>
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

const DifractionEditor = () => {
  const [showMatrix, setShowMatrix] = React.useState(0);

  // return <Editor />;
  return (
    <>
      {/*// <!-- Button trigger modal -->*/}
      <button
        type="button"
        className="btn btn-primary"
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
            <Editor showMatrix={showMatrix} />
            {/*<DifractionEditor/>*/}
            {/* </div> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Закрыть
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowMatrix((prev) => prev + 1);
                }}
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

export default DifractionEditor;

// https://javascript.plainenglish.io/how-to-implement-drag-and-drop-from-react-to-svg-d3-16700f01470c
