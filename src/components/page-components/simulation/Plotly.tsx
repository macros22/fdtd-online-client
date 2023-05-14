import React from "react";
import plotly from "plotly.js/dist/plotly";
import createPlotComponent from "react-plotly.js/factory";

const Plot = createPlotComponent(plotly);

export default () => (
  <Plot
    data={[
      {
        z: [
          [1, 20, 30],
          [20, 1, 60],
          [30, 60, 1],
        ],
        type: "heatmap",
      },
    ]}
    layout={{
      width: 620,
      height: 540,
      title: "A Fancy Plot",
    }}
  />
);
