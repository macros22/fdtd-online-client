
const n = 40;

// Refraction indexes.
const rIndex1 = 1;
const rIndex2 = 1.5;



const x = 10;
const y = 10;
const width = 200;
const height = 200;

const count = 20;
const rectHeight: number = height / (count * 2);
const rectWidth = rectHeight;


//


const Canvas = () => (
  <rect width={width} height={height} x={x} y={y} fill="#eee"/>
);





const DifractionEditor = () => {

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
  
  return(
    <svg width={width} height={height}>
      <Canvas />
      {
        matrix.map((row, i) => {
          return row.map((item: number, j:number) =>
            item == rIndex2
              ?  <rect width={rectWidth} height={rectHeight} x={x + j*rectWidth} y={y + i*rectHeight} fill="#bbb"/>
              : null)
        })
      }
    </svg>
  );
}

export default DifractionEditor;

