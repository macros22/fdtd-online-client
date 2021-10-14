import * as React from 'react';

// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import { DifractionEditor } from 'components';
import { useDifractionMatrix } from './useDifractionMatrix';

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
        fill="#ccc"
        stroke="gray"
        strokeWidth="1"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

const Circle = () => {
  const [position, setPosition] = React.useState<positionType>({
    x: 100,
    y: 100,
    coords: {
      x: 100,
      y: 100,
    },
  });

  // Use useRef to create the function once and hold a reference to it.
  const handleMouseMove = React.useRef((e) => {
    // if(e.pageX < 200)
    {
      setPosition((position) => {
        const xDiff = position.coords.x - e.pageX;
        const yDiff = position.coords.y - e.pageY;
        return {
          x: position.x - xDiff,
          y: position.y - yDiff,
          coords: {
            x: e.pageX,
            y: e.pageY,
          },
        };
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
    console.log(position);
    document.removeEventListener('mousemove', handleMouseMove.current);
    // Use Object.assign to do a shallow merge so as not to
    // totally overwrite the other values in state.
    setPosition((position) =>
      Object.assign({}, position, {
        coords: {},
      })
    );
  };

  return (
    <>
      <circle
        cx={position.x}
        cy={position.y}
        r={25}
        fill="black"
        stroke="black"
        strokeWidth="1"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

const Editor = () => {
  const width = 460;
  const height = width;

  const panelHeight = 50;

  const { matrix, setMatrix, rectWidth, rectHeight, rIndex2, n } = useDifractionMatrix(
    width,
    height
  );

  let panelShapes = [
    {
      x: 0,
      y: height + rectHeight,
      width: rectWidth,
      height: rectHeight,
    },
    {
      x: 50,
      y: height + rectHeight,
      width: rectWidth,
      height: rectHeight,
    },
  ];
  // const initPanelShapes =  panelShapes;

  // w/x = n / ?
  const changeMatrix = (x: number, y: number) => {
    const newJ = Math.round((n * x) / width);
    const newI = Math.round((n * y) / height);

    setMatrix((prevMatrix) => {
      prevMatrix[newI][newJ] = rIndex2;
      return JSON.parse(JSON.stringify(prevMatrix));
    });
    // panelShapes = initPanelShapes;
  };

  return (
    <>
      <svg
        style={{
          background: '#aaa',
          height: height + panelHeight + 'px',
          width: width + 'px',
        }}
      >
        <rect x={0} y={0} width={width} height={height} fill="#fafafa" />

        {matrix.map((row, i) => {
          return row.map((item: number, j: number) =>
            item == rIndex2 ? (
              <rect
                key={j}
                width={rectWidth}
                height={rectHeight}
                x={j * rectWidth}
                y={i * rectHeight}
                fill="#bbb"
              />
            ) : null
          );
        })}

        {panelShapes.map((shape, index) => {
          return (
            <Shape
              key={index + shape.x}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              parentWidth={width}
              parentHeight={height + panelHeight}
              panelHeight={panelHeight}
              changeMatrix={changeMatrix}
            />
          );
        })}
      </svg>
    </>
  );
};

const Svg = () => {
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
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Editor />
              {/*<DifractionEditor/>*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Svg;

// https://javascript.plainenglish.io/how-to-implement-drag-and-drop-from-react-to-svg-d3-16700f01470c
