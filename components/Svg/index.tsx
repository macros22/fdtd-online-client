import * as React from 'react';

// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

// const Rect = () => {
//
//   let svg: SVGSVGElement | null | any = null;
//
//   let svgRectElem: any;
//
//   const [state, setState] = React.useState<any>({rect: {x: 0, y: 0}});
//
//   const startDrag = (event:any, draggedElem) => {
//     event.preventDefault();
//     if (svg !== null) {
//
//
//       let point = svg.createSVGPoint();
//       point.x = event.clientX;
//       point.y = event.clientY;
//       point = point.matrixTransform(svg.getScreenCTM().inverse());
//
//       setState((prevState:any) => ({
//         dragOffset: {
//           x: point.x - prevState.rect.x,
//           y: point.y - prevState.rect.y
//         }
//       }));
//
//       const mousemove = () => {
//         event.preventDefault();
//         point.x = event.clientX;
//         point.y = event.clientY;
//         let cursor = point.matrixTransform(svg.getScreenCTM().inverse());
//         setState((prevState:any) => ({
//           rect: {
//             x: cursor.x - prevState.dragOffset.x,
//             y: cursor.y - prevState.dragOffset.y
//           }
//         }));
//
//
//
//       };
//
//       const mouseup = () => {
//         document.removeEventListener("mousemove", mousemove);
//         document.removeEventListener("mouseup", mouseup);
//       };
//
//       document.addEventListener("mousemove", mousemove);
//       document.addEventListener("mouseup", mouseup);
//     }
//
//   }
//
//     return (
//       <div>
//         <svg viewBox="0 0 100 100" ref={(svg) => svg = svg}>
//           <rect
//             x={state.rect.x}
//             y={state.rect.y}
//             width="20"
//             height="20"
//             ref={(e) => svgRectElem = e}
//             onMouseDown={(e) => startDrag(e, svgRectElem)}
//           />
//         </svg>
//         Position: <br />
//         X: {state.rect.x}<br />
//         Y: {state.rect.y}
//       </div>
//     );
//
//
// }

// Same as above with class.

//
// class Rect extends React.Component {
//   constructor() {
//     super();
//     this.state = {rect: {x: 0, y: 0}};
//   }
//
//   render() {
//     return (
//       <>
//         {/**/}
//         <svg  viewBox="0 0 100 100" ref={(svg) => this.svg = svg}>
//           <rect x="0" y="0" width="40" height="60" fill="#fafafa"/>
//           <rect
//             x={this.state.rect.x}
//             y={this.state.rect.y}
//             width="10"
//             height="10"
//             ref={(e) => this.svgRectElem = e}
//             onMouseDown={(e) => this.startDrag(e, this.svgRectElem)}
//           />
//         </svg>
//         Position: <br />
//         X: {this.state.rect.x}<br />
//         Y: {this.state.rect.y}
//       </>
//     );
//   }
//
//   startDrag(event, draggedElem) {
//     event.preventDefault();
//     let point = this.svg.createSVGPoint();
//     point.x = event.clientX;
//     point.y = event.clientY;
//     point = point.matrixTransform(this.svg.getScreenCTM().inverse());
//     this.setState({dragOffset: {
//         x: point.x - this.state.rect.x,
//         y: point.y - this.state.rect.y
//       }});
//
//     const mousemove = (event) => {
//       event.preventDefault();
//       point.x = event.clientX;
//       point.y = event.clientY;
//       let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
//       this.setState({rect: {
//           x: cursor.x - this.state.dragOffset.x,
//           y: cursor.y - this.state.dragOffset.y
//         }});
//     };
//
//     const mouseup = (event) => {
//       document.removeEventListener("mousemove", mousemove);
//       document.removeEventListener("mouseup", mouseup);
//     };
//
//     document.addEventListener("mousemove", mousemove);
//     document.addEventListener("mouseup", mouseup);
//   }
// }

import {DifractionEditor} from "components";


type positionType = {
  x: number;
  y: number;
  coords: {
    x: number;
    y: number;
  }
}

type ShapeProps = {
  parentWidth: number;
  parentHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  panelHeight: number;
}

const Shape:React.FC<ShapeProps> = ({parentWidth, parentHeight, width, height, x, y, panelHeight}) => {

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
  const handleMouseMove = React.useRef(e => {



    {
      setPosition(position => {
        const xDiff = position.coords.x - e.pageX;
        const yDiff = position.coords.y - e.pageY;

        const newX = position.x - xDiff;
        const newY = position.y - yDiff;

         if(newX > 0 &&
            newY > 0 &&
            newX < (parentWidth-width) &&
            newY < (parentHeight-height)) {
           return {
             x: newX,
             y: newY,
             coords: {
               x: e.pageX,
               y: e.pageY,
             },
           };
         } else {
           return  position;
         }

      });
    }
  });

  const handleMouseDown = e => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition(position => Object.assign({}, position, {
      coords: {
        x: pageX,
        y: pageY,
      },
    }));
    document.addEventListener('mousemove', handleMouseMove.current);
  };

  const handleMouseUp = () => {

    document.removeEventListener('mousemove', handleMouseMove.current);



    if(position.x > 0 &&
      position.y > 0 &&
      position.x < (parentWidth-width) &&
      position.y < (parentHeight-panelHeight-height)) {
      // Use Object.assign to do a shallow merge so as not to
      // totally overwrite the other values in state.
      setPosition(position =>
        Object.assign({}, position, {
          coords: {},
        })
      );
    }
    else {
  setPosition({
    x:initX,
    y:initY,
    coords: {
      x:initX,
      y:initY,
    },
  })
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
  const handleMouseMove = React.useRef(e => {


    // if(e.pageX < 200)
    {
    setPosition(position => {
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

  const handleMouseDown = e => {
    // Save the values of pageX and pageY and use it within setPosition.
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition(position => Object.assign({}, position, {
      coords: {
        x: pageX,
        y: pageY,
      },
    }));
    document.addEventListener('mousemove', handleMouseMove.current);
  };

  const handleMouseUp = () => {
    console.log(position)
    document.removeEventListener('mousemove', handleMouseMove.current);
    // Use Object.assign to do a shallow merge so as not to
    // totally overwrite the other values in state.
    setPosition(position =>
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


const getMatrix = (width = 400, height= 400) => {



// Refraction indexes.
  const rIndex1 = 1;
  const rIndex2 = 1.5;

  const count = 14;
  const n = count*2;
  const rectHeight: number = height / (count * 2);
  const rectWidth = rectHeight;


  let matrix: any[]=[];
  for(let i = 0; i < n; i++){
    matrix.push([]);
    for(let j = 0; j < n; j++){
      matrix[i].push( rIndex1);
    }
  }

  for(let i = 0; i < n; i += 2){
    matrix[i][5] = rIndex2;
  }

  return {
    matrix,
    rectWidth,
    rectHeight,
    rIndex2
  }

}


const Editor = () => {
  const width = 460;
  const height = width;

  const panelHeight = 50;

  const {
    matrix,
    rectWidth,
    rectHeight,
    rIndex2
  } = getMatrix(width, height);

  return(
    <>
      <svg
        style={{
           background: '#aaa',
          height: height+panelHeight+"px",
          width: width+'px',
        }}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#fafafa"

        />

        <Shape
          x={0}
          y={height + rectHeight}
          width={rectWidth}
          height={rectHeight}
          parentWidth={width}
          parentHeight={height+panelHeight}
          panelHeight={panelHeight}/>
        <Shape
          x={50}
          y={height + rectHeight}
          width={rectWidth}
          height={rectHeight}
          parentWidth={width}
          parentHeight={height+panelHeight}
          panelHeight={panelHeight}/>

        {
          matrix.map((row, i) => {
            return row.map((item: number, j:number) =>
              item == rIndex2
                ?  <rect width={rectWidth} height={rectHeight} x={j*rectWidth} y={i*rectHeight} fill="#bbb"/>
                : null)
          })
        }

      </svg>
    </>
  );
}

const Svg = () => {

  return(
    <>
      {/*// <!-- Button trigger modal -->*/}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Изменить
      </button>

      {/*// <!-- Modal -->*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
             <Editor/>
              {/*<DifractionEditor/>*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}

export default Svg;

// https://javascript.plainenglish.io/how-to-implement-drag-and-drop-from-react-to-svg-d3-16700f01470c