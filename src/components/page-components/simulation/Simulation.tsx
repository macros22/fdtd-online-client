import React from "react";
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from "libs/names/lab2.name";

import styles from "./Simulation.module.scss";
import {
  HeatMap,
  Sidebar,
  NumberInput,
  Paper,
  Tag,
  ColorBar,
  ButtonGroup,
  Button,
  WithLabel,
  PlotLine,
  InputRange,
  Divider,
} from "components";

import { DataType, SimulationDimension } from "libs/types/types";

import { displayedData } from "libs/utils/displayed-data";
import { SERVER_URL as SERVER_URL } from "libs/constants/url";
import { useAppSelector } from "store/hooks";

// import PreviewMatrixSidebar from "components/molecules/matrixEditor/PreviewMatrixSidebar";
import { DataChartType } from "libs/types/lab1";
import {
  selectMaterialMatrix,
  selectMaterials,
} from "store/reducers/material-matrix.reducer";
import { ISimulationProps } from "./Simulation.props";
import {
  MaterialForBackend,
  transformMaterialForBackend,
} from "libs/utils/transform-materials-array";
import { PreviewMatrixSidebar } from "components/matrix-editor/preview/in-sidebar/PreviewMatrixSidebar";

type SourcePosition = {
  x: number;
  y: number;
};

export type EventType = "start" | "pause" | "continue" | "close";

export type MessageToBackend = {
  event: EventType;
  type: SimulationDimension;
  dataToReturn: number;
  condition: [number, number];
  materialMatrix: number[][];
  materials: MaterialForBackend[];
  srcPositionRelative: SourcePosition[];
};

export const Simulation = ({
  currentSimulationDimension,
}: ISimulationProps): JSX.Element => {
  const materialMatrix = useAppSelector(selectMaterialMatrix);
  const materials = useAppSelector(selectMaterials);

  const [isMatrixEditorOpen, setIsMatrixEditorOpen] = React.useState(false);

  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const initialPlotWidth = 400;
  const [plotWidth, setPlotWidth] = React.useState(initialPlotWidth);
  const [plotHeight, setPlotHeight] = React.useState(initialPlotWidth);

  const resizePlot = () => {
    let newWidth;
    let plotCoeff = 1;

    if (currentSimulationDimension !== SimulationDimension.SIMULATION_1D) {
      if (window.innerWidth > 1200) {
        newWidth = window.innerWidth * 0.35;
      } else {
        newWidth = window.innerWidth * 0.68;
      }
      plotCoeff = 1;
    } else {
      if (window.innerWidth > 1200) {
        newWidth = window.innerWidth * 0.6;
      } else {
        newWidth = window.innerWidth * 0.85;
      }
      plotCoeff = 0.27;
    }

    const newHeight = newWidth * plotCoeff;
    setPlotWidth(newWidth);
    setPlotHeight(newHeight);
  };

  React.useEffect(() => {
    resizePlot();
    window.addEventListener("resize", resizePlot);
    return () => window.removeEventListener("resize", resizePlot);
  }, []);

  React.useEffect(() => {
    stopSimulation();
    connectWS();
    resizePlot();
  }, [currentSimulationDimension]);

  const [lambda, setLambda] = React.useState<number>(3);
  // For 2D.
  const [beamsize, setBeamsize] = React.useState<number>(8);
  // For 1D.
  const [tau, setTau] = React.useState<number>(3);

  const [step, setStep] = React.useState<number>(0);
  console.log(typeof setStep);
  const [simulation, setSimulation] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);

  // For 2D.
  const [currentDisplayingData, setCurrentDisplayingData] =
    React.useState<number>(0);

  // For 2D.
  const initAllData2D: DataType = {
    dataX: [],
    dataY: [],
    dataVal: [],
    row: 0,
    col: 0,
    step: 0,
    max: 0.0001,
    min: -0.0001,
  };

  const [allData2D, setAllData2D] = React.useState<DataType>(initAllData2D);

  const [srcPositionRelativeX, setSourcePositionRelativeX] =
    React.useState(0.4);

  const [srcPositionRelativeY, setSourcePositionRelativeY] =
    React.useState(0.4);
  // const matrix = useAppSelector(selectEpsilonMatrix);

  // For 2D.
  const [maxVal, setMaxVal] = React.useState(0.04);
  const [minVal, setMinVal] = React.useState(-0.04);

  // For 1D
  const [minX, setMinX] = React.useState<number>(0);
  const [maxX, setMaxX] = React.useState<number>(0.1);
  const [minY, setMinY] = React.useState<number>(-0.2);
  const [maxY, setMaxY] = React.useState<number>(0.2);

  const data1DChart: DataChartType = [];
  for (let i = 0; i < plotWidth * 0.9; i += 10) {
    data1DChart.push({
      x: i,
      y: i, //Math.random()* (minY + maxY) + minY,
    });
  }
  const [allData1D, setAllData1D] = React.useState<DataChartType>(data1DChart);

  // console.log(matrix);
  // Websocket ---- start.
  const connectWS = () => {
    const socket = new WebSocket(SERVER_URL);
    if (socket) {
      console.log("[open] Connection established");
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        setStep(data.step || 0);

        if (currentSimulationDimension == SimulationDimension.SIMULATION_1D) {
          const tmpdata2DChart: DataChartType = [];
          for (let i = 0; i < data.col; i++) {
            tmpdata2DChart.push({
              x: data.dataX[i],
              y: data.dataY[i],
            });
          }
          setMinX(Math.min(...data.dataX));
          setMaxX(Math.max(...data.dataX));

          const maxYServer = Math.max(...data.dataY);
          const minYServer = Math.min(...data.dataY);
          if (maxYServer > maxY) {
            setMaxY(maxYServer);
          }
          if (minYServer < minY) {
            setMinY(minYServer);
          }
          // setMaxY(maxYServer);
          // setMinY(minYServer);
          setAllData1D(tmpdata2DChart);
        } else {
          if (data.step > 5 && data.max > maxVal) {
            setMaxVal(data.max);
          }
          if (data.step > 5 && data.min < minVal) {
            setMinVal(data.min);
          }

          setAllData2D(data);
        }

        socket.send(JSON.stringify({ step: data.step || 0 }));
      };

      socket.onclose = (event) => {
        console.log("Socket closed");
        if (event.wasClean) {

          `Websocket: [close] Connection closed cleanly, code=${event.code} reason=${event.reason}`;
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log("Websocket:[close] Connection died");
        }
        setTimeout(() => {
          connectWS();
        }, 5000);
        setIsWSocketConnected(false);
      };

      socket.onerror = () => {
        console.log("Socket error");
        setIsWSocketConnected(false);
      };
    }
    setSocket(socket);
  };

  const startDataReceiving = () => {
    setPause(false);

    let message: MessageToBackend;
    if (currentSimulationDimension === SimulationDimension.SIMULATION_1D) {
      message = {
        event: "start",
        type: SimulationDimension.SIMULATION_1D,
        dataToReturn: 0,
        condition: [lambda, beamsize],
        materialMatrix,
        materials: transformMaterialForBackend(materials),
        srcPositionRelative: [{ x: srcPositionRelativeX, y: 0 }],
      };
    } else {
      message = {
        event: "start",
        type: SimulationDimension.SIMULATION_2D,
        dataToReturn: currentDisplayingData,
        condition: [lambda, beamsize],
        materialMatrix,
        materials: transformMaterialForBackend(materials),
        srcPositionRelative: [
          { x: srcPositionRelativeX, y: 1 - srcPositionRelativeY },
        ],
      };
    }
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  const pauseDataReceiving = () => {
    const message = {
      event: "pause",
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const continueDataReceiving = () => {
    let message: unknown;
    if (currentSimulationDimension === SimulationDimension.SIMULATION_1D) {
      message = {
        event: "continue",
        type: SimulationDimension.SIMULATION_1D,
        dataToReturn: 0,
        condition: [lambda, beamsize],
        materialMatrix,
        materials: transformMaterialForBackend(materials),
        srcPositionRelative: [{ x: srcPositionRelativeX, y: 0 }],
      };
    } else {
      message = {
        event: "continue",
        type: SimulationDimension.SIMULATION_2D,
        dataToReturn: currentDisplayingData,
        condition: [lambda, beamsize],
        materialMatrix,
        materials: transformMaterialForBackend(materials),
        srcPositionRelative: [
          { x: srcPositionRelativeX, y: 1 - srcPositionRelativeY },
        ],
      };
    }
    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  React.useEffect(() => {
    connectWS();
    return () => {
      if (socket !== null) {
        stopSimulation();
        socket.close(1000, "Socket work end");
      }
    };
  }, []);
  // Websocket ---- end.

  // Handlers.
  const clickStartPauseContinueBtnHandler = () => {
    if (!simulation) {
      startDataReceiving();
      setSimulation(true);
    } else {
      if (!pause) {
        pauseDataReceiving();
      } else {
        continueDataReceiving();
      }
      setPause((pause) => !pause);
    }
  };

  const stopSimulation = () => {
    if (simulation) {
      pauseDataReceiving();
      setPause(false);
      setSimulation(false);
      setStep(0);
    }
  };
  // : React.FormEvent<HTMLInputElement>
  const clickStopBtnHandler = (e: React.MouseEvent) => {
    stopSimulation();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar className={styles.sidebarLeft}>
          <NumberInput
            value={typeof lambda === "number" ? lambda : 0}
            label={WAVE_LENGTH_NAME}
            onChange={(e) => setLambda(parseInt(e.target.value))}
          />

          <Divider className={styles.divider} />

          {currentSimulationDimension === SimulationDimension.SIMULATION_1D ? (
            <NumberInput
              label={BEAMSIZE_NAME}
              value={beamsize}
              onChange={(e) => setBeamsize(parseInt(e.target.value))}
            />
          ) : (
            <NumberInput
              label={BEAMSIZE_NAME}
              value={tau}
              onChange={(e) => setTau(parseInt(e.target.value))}
            />
          )}

          <Divider className={styles.divider} />
          <WithLabel labelText={`Source position X(${srcPositionRelativeX})`}>
            <InputRange
              value={srcPositionRelativeX}
              setValue={setSourcePositionRelativeX}
            />
          </WithLabel>
          <Divider className={styles.divider} />

          {currentSimulationDimension === SimulationDimension.SIMULATION_2D && (
            <>
              <WithLabel
                labelText={`Source position Y(${srcPositionRelativeY})`}
              >
                <InputRange
                  value={srcPositionRelativeY}
                  setValue={setSourcePositionRelativeY}
                />
              </WithLabel>
              <Divider className={styles.divider} />
            </>
          )}

          <WithLabel labelText="Material matrix:">
            <PreviewMatrixSidebar
              isModalOpen={isMatrixEditorOpen}
              setIsModalOpen={setIsMatrixEditorOpen}
              srcPositionRelativeX={srcPositionRelativeX}
              srcPositionRelativeY={srcPositionRelativeY}
            />
          </WithLabel>
        </Sidebar>

        <div className={styles.content}>
          <div className={styles.workArea}>
            <span>
              <Tag color="primary" size="lg" className={styles.title}>
                {displayedData[currentDisplayingData].name}
              </Tag>
              <span className={styles.subTitle}> structure</span>
            </span>

            {currentSimulationDimension == SimulationDimension.SIMULATION_2D ? (
              <div className={styles.graph2D}>
                <Paper>
                  <HeatMap
                    width={plotWidth}
                    height={plotHeight}
                    minVal={maxVal}
                    maxVal={minVal}
                    dataX={allData2D.dataX}
                    dataY={allData2D.dataY}
                    dataVal={allData2D.dataVal}
                    srcPositionRelativeX={srcPositionRelativeX}
                    srcPositionRelativeY={srcPositionRelativeY}
                  />
                </Paper>
                <Paper>
                  <ColorBar
                    gradientHeight={plotHeight}
                    gradientWidth={plotHeight * 0.03}
                    maxVal={maxVal}
                    minVal={minVal}
                  />
                </Paper>
              </div>
            ) : (
              <div className={styles.graph1D}>
                <Paper>
                  <PlotLine
                    data={allData1D}
                    minY={minY}
                    minX={minX}
                    maxY={maxY}
                    maxX={maxX}
                    WIDTH={plotWidth}
                    HEIGHT={plotHeight}
                    epsilonData={materialMatrix[0].map(
                      (materialId) =>
                        materials.find((material) => material.id === materialId)
                          ?.eps || 1
                    )} //!!!!!!!!!!!
                    srcPositionRelative={srcPositionRelativeX}
                  />
                </Paper>
              </div>
            )}
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
          {currentSimulationDimension == SimulationDimension.SIMULATION_2D && (
            <>
              <WithLabel labelText="Choose data type:">
                <ButtonGroup activeButton={currentDisplayingData}>
                  {displayedData.map((item, index) => {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setCurrentDisplayingData(index);
                        }}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </ButtonGroup>
              </WithLabel>
              <Divider className={styles.divider} />
            </>
          )}

          <WithLabel labelText={STEP_NUMBER_NAME}>
            <Tag size="lg" color="primary" fullWidth>
              {step}
            </Tag>
          </WithLabel>

          <Divider className={styles.divider} />

          <Button
            variant={isWSocketConnected ? "primary" : "ghost"}
            onClick={clickStartPauseContinueBtnHandler}
          >
            {!simulation ? "START" : pause ? CONTINUE_NAME : PAUSE_NAME}
          </Button>

          <Button
            variant={simulation ? "primary" : "ghost"}
            onClick={clickStopBtnHandler}
          >
            STOP
          </Button>

          <Divider className={styles.divider} />

          <WithLabel labelText="Server connection:">
            <Tag size="lg" color="primary" fullWidth>
              {isWSocketConnected + ""}
            </Tag>
          </WithLabel>
        </Sidebar>
      </div>
    </>
  );
};

