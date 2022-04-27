import React from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';

import styles from '../../../styles/lab3D.module.scss';
import {
  HeatMap,
  Sidebar,
  NumberInput,
  Paper,
  Tag,
  GradientScale,
  ButtonGroup,
  Button,
  WithLabel,
  Canvas,
  InputRange,
} from 'components';

import { dataType, SimulationDimension } from 'types/types';

import { displayedData } from 'utils/displayed-data';
import { SERVER_URL as SERVER_URL } from 'constants/url';
import { useAppSelector } from 'app/hooks';

import useResizeObserver from 'use-resize-observer';
import PreviewMatrixSidebar from 'components/organisms/MatrixEditor/PreviewMatrixSidebar';
import { DataChartType } from 'types/lab1';
import {
  selectMediumMatrix,
  selectMediums,
} from 'app/reducers/medium-matrix.reducer';
import { SimulationProps } from './Simulation.props';

const Simulation: React.FC<SimulationProps> = ({
  currentSimulationDimension,
}) => {
  const previewMatrixParentRef = React.useRef(null);
  const {
    width: previewMatrixParentWidth = 150,
    height: previewMatrixParentHeight = 150,
  } = useResizeObserver<HTMLDivElement>({
    ref: previewMatrixParentRef,
  });

  // React.useEffect(() => {
  //   console.log("wwwww", previewMatrixParentWidth);
  //   console.log("rrrrr", previewMatrixParentRef);

  // }, [previewMatrixParentRef, previewMatrixParentWidth])

  const mediumMatrix = useAppSelector(selectMediumMatrix);
  const mediums = useAppSelector(selectMediums);

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
    window.addEventListener('resize', resizePlot);
    return () => window.removeEventListener('resize', resizePlot);
  }, []);

  React.useEffect(() => {
    resizePlot();
  }, [currentSimulationDimension]);

  const [lambda, setLambda] = React.useState<number>(1);
  // For 2D.
  const [beamsize, setBeamsize] = React.useState<number>(3);
  // For 1D.
  const [tau, setTau] = React.useState<number>(10);

  const [step, setStep] = React.useState<number>(0);
  const [simulation, setSimulation] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);

  // For 2D.
  const [currentDisplayingData, setCurrentDisplayingData] =
    React.useState<number>(0);

  // For 2D.
  const initAllData2D: dataType = {
    dataX: [],
    dataY: [],
    dataVal: [],
    row: 0,
    col: 0,
    step: 0,
    max: 0.0001,
    min: -0.0001,
  };

  const [allData2D, setAllData2D] = React.useState<dataType>(initAllData2D);

  const [sourcePositionRelativeX, setSourcePositionRelativeX] =
    React.useState(0.4);

  const [sourcePositionRelativeY, setSourcePositionRelativeY] =
    React.useState(0.4);
  // const matrix = useAppSelector(selectEpsilonMatrix);

  // For 2D.
  const [maxVal, setMaxVal] = React.useState(1);
  const [minVal, setMinVal] = React.useState(-1);

  // For 1D
  const [minX, setMinX] = React.useState<number>(0);
  const [minY, setMinY] = React.useState<number>(-1);
  const [maxX, setMaxX] = React.useState<number>(100);
  const [maxY, setMaxY] = React.useState<number>(0.001);

  const data1DChart: DataChartType = [];
  for (let i = 0; i < plotWidth * 0.9; i += 10) {
    data1DChart.push({
      x: i,
      y: Math.random() * plotHeight * 0.8 + 20,
    });
  }
  const [allData1D, setAllData1D] = React.useState<DataChartType>(data1DChart);

  // console.log(matrix);
  // Websocket ---- start.
  const connectWS = () => {
    const socket = new WebSocket(SERVER_URL);
    if (socket) {
      console.log('[open] Connection established');
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        let data = JSON.parse(event.data);
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
          setMinY(Math.min(...data.dataY));
          setMaxX(Math.max(...data.dataX));
          setMaxY(Math.max(...data.dataY));

          setAllData1D(tmpdata2DChart);
        } else {
          if (data.max > maxVal) {
            setMaxVal(data.max);
          }
          if (data.min < minVal) {
            setMinVal(data.min);
          }

          setAllData2D(data);
        }

        socket.send(JSON.stringify({ step: data.step || 0 }));
      };

      socket.onclose = (event) => {
        console.log('Socket закрыт');
        if (event.wasClean) {
          console.log();
          `Websocket: [close] Connection closed cleanly, code=${event.code} reason=${event.reason}`;
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log('Websocket:[close] Connection died');
        }
        setTimeout(() => {
          connectWS();
        }, 5000);
        setIsWSocketConnected(false);
      };

      socket.onerror = () => {
        console.log('Socket произошла ошибка');
        setIsWSocketConnected(false);
      };
    }
    setSocket(socket);
  };

  const startDataReceiving = () => {
    setPause(false);

    let message: unknown;
    if (currentSimulationDimension === SimulationDimension.SIMULATION_1D) {
      message = {
        event: 'start',
        type: '2D',
        // condition: [lambda, tau, refractiveIndex1],
        condition: [lambda, tau, 1],
        sourcePositionRelative: { x: sourcePositionRelativeX, y: 0 },
        // matrix,
        dataToReturn: 'Hy',
        // omegaMatrix,
      };
    } else {
      message = {
        event: 'start',
        type: SimulationDimension.SIMULATION_2D,
        dataToReturn: displayedData[currentDisplayingData].type,
        condition:
          currentSimulationDimension == SimulationDimension.SIMULATION_2D
            ? [lambda, beamsize, 1]
            : [lambda, beamsize],
        // matrix,
      };
    }
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  const pauseDataReceiving = () => {
    const message = {
      event: 'pause',
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const continueDataReceiving = () => {
    let message: unknown;
    if (currentSimulationDimension === SimulationDimension.SIMULATION_1D) {
      message = {
        event: 'continue',
        type: '2D',
        condition: [lambda, tau, 1],
        sourcePositionRelative: { x: sourcePositionRelativeX, y: 0 },
        // matrix,
        dataToReturn: 'Hy',
        // omegaMatrix,
      };
    } else {
      message = {
        event: 'continue',
        type: (currentSimulationDimension == SimulationDimension.SIMULATION_2D
          ? SimulationDimension.SIMULATION_2D
          : SimulationDimension.SIMULATION_2D
        ).toString(),
        dataToReturn: displayedData[currentDisplayingData].type,
        condition:
          currentSimulationDimension == SimulationDimension.SIMULATION_2D
            ? [lambda, beamsize, 1]
            : [lambda, beamsize],
        // matrix,
      };
    }
    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  React.useEffect(() => {
    connectWS();
    // socket?.OPEN
    return () => {
      if (socket !== null) {
        socket.close(1000, 'работа закончена');
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

  const clickStopBtnHandler = (e: React.MouseEvent) => {
    if (simulation) {
      pauseDataReceiving();
      setPause(false);
      setSimulation(false);
      setStep(0);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar className={styles.sidebarLeft}>
          <NumberInput
            value={typeof lambda === 'number' ? lambda : 0}
            label={WAVE_LENGTH_NAME}
            onChange={(e) => setLambda(+e.target.value)}
          />

          <hr />

          {currentSimulationDimension === SimulationDimension.SIMULATION_1D ? (
            <NumberInput
              label={BEAMSIZE_NAME}
              value={beamsize}
              onChange={(e) => setBeamsize(+e.target.value)}
            />
          ) : (
            <NumberInput
              label={'tau'}
              value={tau}
              onChange={(e) => setTau(+e.target.value)}
            />
          )}

          <hr />
          <WithLabel
            labelText={`Source position X(${sourcePositionRelativeX})`}
          >
            <InputRange
              value={sourcePositionRelativeX}
              setValue={setSourcePositionRelativeX}
            />
          </WithLabel>
          <hr />

          {currentSimulationDimension === SimulationDimension.SIMULATION_2D && (
            <>
              <WithLabel
                labelText={`Source position Y(${sourcePositionRelativeY})`}
              >
                <InputRange
                  value={sourcePositionRelativeY}
                  setValue={setSourcePositionRelativeY}
                />
              </WithLabel>
              <hr />
            </>
          )}

          <div ref={previewMatrixParentRef}></div>
          {/* <WithLabel labelText='Матрица мат-ов:' ref={previewMatrixParentRef} > */}
          <WithLabel labelText='Матрица мат-ов:'>
            {/* <MatrixEditor /> */}
            <PreviewMatrixSidebar
              width={previewMatrixParentWidth || 100}
              height={previewMatrixParentWidth || 100}
            />
          </WithLabel>
        </Sidebar>

        <div className={styles.content}>
          <div className={styles.workArea}>
            <h6>
              <span>
                {'Пространственно-временная структура ' +
                  displayedData[currentDisplayingData].title}
              </span>
            </h6>

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
                  />
                </Paper>
                <Paper>
                  <GradientScale
                    gradientHeight={plotHeight}
                    gradientWidth={plotHeight * 0.03}
                  />
                </Paper>
              </div>
            ) : (
              <div className={styles.graph1D}>
                <Paper>
                  <Canvas
                    data={allData1D}
                    minY={minY}
                    minX={minX}
                    maxY={maxY}
                    maxX={maxX}
                    WIDTH={plotWidth}
                    HEIGHT={plotHeight}
                    epsilonData={mediumMatrix[0].map(
                      (materialName) =>
                        mediums.find((medium) => medium.name === materialName)
                          ?.eps || 1
                    )} //!!!!!!!!!!!
                    sourcePositionRelative={sourcePositionRelativeX}
                  />
                </Paper>
              </div>
            )}
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
          {currentSimulationDimension !== SimulationDimension.SIMULATION_1D && (
            <WithLabel labelText='Выбор данных:'>
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
          )}
          <hr />

          <WithLabel labelText={STEP_NUMBER_NAME}>
            <Tag size='l' color='primary' fullWidth>
              {step}
            </Tag>
          </WithLabel>

          <hr />

          <Button
            appearance={isWSocketConnected ? 'primary' : 'ghost'}
            onClick={clickStartPauseContinueBtnHandler}
          >
            {!simulation ? 'СТАРТ' : pause ? CONTINUE_NAME : PAUSE_NAME}
          </Button>

          <Button
            appearance={simulation ? 'primary' : 'ghost'}
            onClick={clickStopBtnHandler}
          >
            STOP
          </Button>

          <hr />

          <WithLabel labelText='Server connection:'>
            <Tag size='l' color='primary' fullWidth>
              {isWSocketConnected + ''}
            </Tag>
          </WithLabel>
        </Sidebar>
      </div>
    </>
  );
};

export default Simulation;
