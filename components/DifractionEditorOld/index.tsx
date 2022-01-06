import React from 'react';

// Number of all squares.
const n = 40;

const x = 10;
const y = 10;
const width = 160;
const height = 160;

const count = n / 2;
const rectHeight: number = height / (count * 2);
const rectWidth = rectHeight;

const colors = {
  background: '#eee',
  one: '#bbb',
};

const Canvas = () => <rect width={width} height={height} x={x} y={y} fill={colors.background} />;

interface IDifractionEditorProps {
  rIndex1: number;
  rIndex2: number;
}

const DifractionEditor: React.FC<IDifractionEditorProps> = ({ rIndex1, rIndex2 }) => {
  let matrix: unknown[][] = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < n; j++) {
      matrix[i].push(rIndex1);
    }
  }

  for (let i = 0; i < n; i += 2) {
    matrix[i][5] = rIndex2;
  }

  return (
    <svg width={width} height={height}>
      <Canvas />
      {matrix.map((row, i) => {
        return row.map((item: unknown, j: number) =>
          item == rIndex2 ? (
            <rect
              width={rectWidth}
              height={rectHeight}
              x={x + j * rectWidth}
              y={y + i * rectHeight}
              fill={colors.one}
            />
          ) : null
        );
      })}
    </svg>
  );
};

export default DifractionEditor;
