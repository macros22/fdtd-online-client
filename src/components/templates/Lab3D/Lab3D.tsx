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
  HeatMap,
  Sidebar,
  NumberInput,
  Paper,
  MatrixEditor,
  Tag,
  GradientScale,
  ButtonGroup,
  Button,
  WithLabel,
} from 'components';

import { dataType, LabNames } from 'types/types';

import { displayedData } from 'utils/displayed-data';
import { SERVER_URL_LOCAL } from 'constants/url';
import { Lab3DProps } from './Lab3D.prop';
import { useAppSelector } from 'app/hooks';
import { selectEpsilonMatrix } from 'app/reducers/medium-matrix.reducer';

const Lab3D: React.FC<Lab3DProps> = ({ currentLabName }) => {
  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const heatMapWidth = 430;
  const heatMapHeight = 430;

  const [beamsize, setBeamsize] = React.useState<number>(3);
  const [lambda, setLambda] = React.useState<number>(1);
  const [refractiveIndex1, setrefractiveIndex1] = React.useState<number>(1);
  const [refractiveIndex2, setRefractiveIndex2] = React.useState<number>(2);

  const [step, setStep] = React.useState<number>(0);
  const [simulation, setSimulation] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);

  const [currentDisplayingData, setCurrentDisplayingData] =
    React.useState<number>(0);

  const initAllData: dataType = {
    dataX: [],
    dataY: [],
    dataVal: [],
    row: 0,
    col: 0,
    step: 0,
  };

  const [allData, setAllData] = React.useState<dataType>(initAllData);

  const matrix = useAppSelector(selectEpsilonMatrix);

  console.log(matrix);
  // Websocket ---- start.
  const connectWS = () => {
    const socket = new WebSocket(SERVER_URL_LOCAL);
    if (socket) {
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        let data = JSON.parse(event.data);
        setStep(data.step || 0);
        setAllData(data);

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

  const startDataReceiving = () => {
    setPause(false);

    const message = {
      event: 'start',
      type: (currentLabName == LabNames.INTERFERENCE
        ? LabNames.INTERFERENCE
        : LabNames.LAB_3D
      ).toString(),
      dataToReturn: displayedData[currentDisplayingData].type,
      condition:
        currentLabName == LabNames.INTERFERENCE
          ? [lambda, beamsize, refractiveIndex1]
          : [lambda, beamsize],
      matrix,
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
      type: (currentLabName == LabNames.INTERFERENCE
        ? LabNames.INTERFERENCE
        : LabNames.LAB_3D
      ).toString(),
      dataToReturn: displayedData[currentDisplayingData].type,
      condition:
        currentLabName == LabNames.INTERFERENCE
          ? [lambda, beamsize, refractiveIndex1]
          : [lambda, beamsize],
      matrix,
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
            value={beamsize}
            onChange={(e) => setBeamsize(+e.target.value)}
          />

          <NumberInput
            label={REFRACTIVE_INDEX_NAME}
            value={refractiveIndex1}
            onChange={(e) => setrefractiveIndex1(+e.target.value)}
          />
          <>
            <NumberInput
              label={REFRACTIVE_INDEX_NAME}
              value={refractiveIndex2}
              onChange={(e) => setRefractiveIndex2(+e.target.value)}
            />
            <hr />
            <WithLabel labelText='Матрица:'>
              <MatrixEditor />
            </WithLabel>
          </>
        </Sidebar>

        <div className={styles.content}>
          <div className={styles.workArea}>
            <h6>
              <span>
                {'Пространственно-временная структура ' +
                  displayedData[currentDisplayingData].title}
              </span>
            </h6>

            <div className={styles.graph2D}>
              <Paper>
                <HeatMap
                  width={heatMapWidth}
                  height={heatMapHeight}
                  minVal={Math.min(...allData.dataVal)}
                  maxVal={Math.max(...allData.dataVal)}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataVal}
                />
              </Paper>
              <Paper>
                <GradientScale gradientHeight={heatMapHeight} />
              </Paper>
            </div>
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
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
          <hr />

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

export default Lab3D;
