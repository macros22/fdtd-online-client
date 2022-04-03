import React from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';

import styles from '../../../styles/lab3D.module.scss';
import {
  Sidebar,
  NumberInput,
  Paper,
  Tag,
  Button,
  WithLabel,
  Canvas,
  MatrixEditor,
} from 'components';

// import { dataType, LabNames } from 'types/types';

// import { useRefractionMatrix } from 'components/organisms/MatrixEditor/refraction-matrix.context';
import { displayedData } from 'utils/displayed-data';
import { SERVER_URL_LOCAL } from 'constants/url';
import { DataChartType } from 'types/lab1';
import { selectEpsilonMatrix, selectOmegaMatrix } from 'app/reducers/medium-matrix.reducer';
import { useAppSelector } from 'app/hooks';
import InputRange from 'components/atoms/InputRange/InputRange';

const Lab2D: React.FC = () => {
  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const CANVAS_HEIGHT_2D = 200;
  const CANVAS_WIDTH_2D = 700;
  const data2DChart: DataChartType = [];
  for (let i = 0; i < CANVAS_WIDTH_2D * 0.9; i += 10) {
    data2DChart.push({
      x: i,
      y: Math.random() * CANVAS_HEIGHT_2D * 0.8 + 20,
    });
  }

  const [tau, setTau] = React.useState<number>(10);
  const [lambda, setLambda] = React.useState<number>(1);
  const [refractiveIndex1, setrefractiveIndex1] = React.useState<number>(1);

  const [step, setStep] = React.useState<number>(0);
  const [simulation, setSimulation] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);

  const [minX, setMinX] = React.useState<number>(0);
  const [minY, setMinY] = React.useState<number>(-1);
  const [maxX, setMaxX] = React.useState<number>(100);
  const [maxY, setMaxY] = React.useState<number>(0.001);

  const [sourcePositionRelative, setSourcePositionRelative] =
    React.useState(0.4);

  const [currentDisplayingData, setCurrentDisplayingData] =
    React.useState<number>(0);

  const [allData, setAllData] = React.useState<DataChartType>(data2DChart);

  // Websocket ---- start.
  const connectWS = () => {
    const socket = new WebSocket(SERVER_URL_LOCAL);
    // console.log(socket)
    if (socket) {
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        let data = JSON.parse(event.data);
        setStep(data.step || 0);

        console.log(data);

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

        setAllData(tmpdata2DChart);

        socket.send(JSON.stringify({ step: data.step || 0 }));
      };

      socket.onclose = () => {
        console.log('Socket закрыт');
        setIsWSocketConnected(false);
      };

      socket.onerror = () => {
        console.log('Socket произошла ошибка');
        setIsWSocketConnected(false);
      };
    }
    setSocket(socket);
  };

  const matrix = useAppSelector(selectEpsilonMatrix);
  const omegaMatrix = useAppSelector(selectOmegaMatrix);

  const startDataReceiving = () => {
    setPause(false);

    console.log(matrix);

    const message = {
      event: 'start',
      type: '2D',
      // condition: [lambda, tau, refractiveIndex1],
      condition: [lambda, tau, 1],
      sourcePositionRelative: {x: sourcePositionRelative, y: 0},
      matrix,
      dataToReturn: 'Hy',
      omegaMatrix,
    };

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
    const message = {
      event: 'continue',
      type: '2D',
      condition: [lambda, tau, 1],
      sourcePositionRelative: {x: sourcePositionRelative, y: 0},
      matrix,
      dataToReturn: 'Hy',
      omegaMatrix,
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  React.useEffect(() => {
    connectWS();
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

          <NumberInput
            label={BEAMSIZE_NAME}
            value={tau}
            onChange={(e) => setTau(+e.target.value)}
          />

          <NumberInput
            label={REFRACTIVE_INDEX_NAME}
            value={refractiveIndex1}
            onChange={(e) => setrefractiveIndex1(+e.target.value)}
          />
          <hr />
          <WithLabel labelText={`Source position(${sourcePositionRelative})`}>
            <InputRange
              value={sourcePositionRelative}
              setValue={setSourcePositionRelative}
            />
          </WithLabel>
          <hr />
          <WithLabel labelText='Матрица:'>
            <MatrixEditor />
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

            <div className={styles.graph1D}>
              <Paper>
                <Canvas
                  data={allData}
                  minY={minY}
                  minX={minX}
                  maxY={maxY}
                  maxX={maxX}
                  WIDTH={CANVAS_WIDTH_2D}
                  HEIGHT={CANVAS_HEIGHT_2D}
                  epsilonData={matrix[0]}
                  sourcePositionRelative={sourcePositionRelative}
                />
              </Paper>
              <Paper>
                <Canvas
                  data={allData}
                  minY={minY}
                  minX={minX}
                  maxY={maxY}
                  maxX={maxX}
                  WIDTH={CANVAS_WIDTH_2D}
                  HEIGHT={CANVAS_HEIGHT_2D}
                  epsilonData={matrix[0]}
                  sourcePositionRelative={sourcePositionRelative}
                />
              </Paper>
            </div>
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
          <Button onClick={clickStartPauseContinueBtnHandler}>
            {!simulation ? 'СТАРТ' : pause ? CONTINUE_NAME : PAUSE_NAME}
          </Button>
          <Button
            appearance={simulation ? 'primary' : 'ghost'}
            onClick={clickStopBtnHandler}
          >
            STOP
          </Button>
          <hr />
          <WithLabel labelText={STEP_NUMBER_NAME}>
            <Tag size='l' color='primary' fullWidth>
              {step}
            </Tag>
          </WithLabel>
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

export default Lab2D;

