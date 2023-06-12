type ColorRange = { start: number; end: number };

type Params = {
  r: ColorRange;
  g: ColorRange;
  b: ColorRange;
};

const createGradientBreakpointsMatlab = ({ r, g, b }: Params) => {
  const breakpointsAmount = 255;
  const rgbMaxValue = 255;

  const getRange = ({ start, end }: ColorRange) => {
    const range = [];
    const delta = (end - start) / breakpointsAmount;

    for (let i = 0; i < breakpointsAmount; i += 1) {
      range.push(Math.floor((start + i * delta) * rgbMaxValue));
    }

    return range;
  };

  const rs = getRange(r);
  const gs = getRange(g);
  const bs = getRange(b);

  const colorBreakpoints = {};
  const delta = 1 / breakpointsAmount;

  for (let i = 0; i < breakpointsAmount; i += 1) {
    colorBreakpoints[`${i * delta}`] = `rgb(${rs[i]},${gs[i]},${bs[i]})`;
  }

  return colorBreakpoints;
};

const parula = createGradientBreakpointsMatlab({
  r: { start: 0.2422, end: 0.9769 },
  g: { start: 0.1504, end: 0.9839 },
  b: { start: 0.6603, end: 0.0805 },
});

// console.log(parula);

export const defaultGradient2: { [key: string]: string } = parula;

export const defaultGradient: { [key: string]: string } = {
  // 0.0: "#352a87",
  // 0.12: "#0363e1",
  // 0.24: "#1485d4",
  // 0.36: "#06a7c6",
  // // 0.48: "#38b99e",
  // // 0.6: "#92bf73",
  // // 0.72: "#d9ba56",
  // 0.84: "#fcce2e",
  // 1.0: "#f9fb0e",

  // 0: 'red',
  // 0.5: 'white',
  // 1: 'blue',

  0.0: "blue",
  0.3: "cyan",
  0.5: "lime",
  0.7: "yellow",
  1.0: "tomato",

  // 0.0: "blue",
  // 0.35: "cyan",
  // 0.5: "lime",
  // 0.65: "yellow",
  // 1.0: "tomato",

  // 0.0: 'black',
  // 0.5: 'yellow',
  // 1.0: 'tomato',
};
