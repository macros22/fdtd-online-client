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
              <svg
                style={{
                  background: '#fafafa',
                  height: '400px',
                  width: '400px',
                }}
              >
                <Circle />
              </svg>
              <DifractionEditor/>
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

