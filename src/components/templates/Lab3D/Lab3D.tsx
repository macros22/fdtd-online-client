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
import { SERVER_URL as SERVER_URL } from 'constants/url';
import { Lab3DProps } from './Lab3D.prop';
import { useAppSelector } from 'app/hooks';
import { selectEpsilonMatrix } from 'app/reducers/medium-matrix.reducer';
import PreviewMatrixEditor from 'components/organisms/MatrixEditor/PreviewMatrixEditor';

import useResizeObserver from 'use-resize-observer';

const Lab3D: React.FC<Lab3DProps> = ({ currentLabName }) => {
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

  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const initialPlotWidth = 400;
  const [plotWidth, setPlotWidth] = React.useState(initialPlotWidth);
  const [plotHeight, setPlotHeight] = React.useState(initialPlotWidth);

  const resizePlot = () => {
    let newWidth;
    if (window.innerWidth > 1200) {
      newWidth = window.innerWidth * 0.35;
    } else {
      newWidth = window.innerWidth * 0.68;
    }

    const newHeight = newWidth;
    setPlotWidth(newWidth);
    setPlotHeight(newHeight);
  };

  React.useEffect(() => {
    resizePlot();
    window.addEventListener('resize', resizePlot);
    return () => window.removeEventListener('resize', resizePlot);
  }, []);

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
    max: 0.0001,
    min: -0.0001,
  };

  const [allData, setAllData] = React.useState<dataType>(initAllData);

  const matrix = useAppSelector(selectEpsilonMatrix);

  const [maxVal, setMaxVal] = React.useState(1);
  const [minVal, setMinVal] = React.useState(-1);

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

        console.log(data.max);
        if (data.max > maxVal) {
          setMaxVal(data.max);
        }
        if (data.min < minVal) {
          setMinVal(data.min);
        }

        setAllData(data);

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

          <NumberInput
            label={BEAMSIZE_NAME}
            value={beamsize}
            onChange={(e) => setBeamsize(+e.target.value)}
          />

          <hr />
          
          <div ref={previewMatrixParentRef}></div>
          {/* <WithLabel labelText='Матрица мат-ов:' ref={previewMatrixParentRef} > */}
          <WithLabel labelText='Матрица мат-ов:'>
            {/* <MatrixEditor /> */}
            <PreviewMatrixEditor
              width={previewMatrixParentWidth || 100}
              height={previewMatrixParentHeight || 100}
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

            <div className={styles.graph2D}>
              <Paper>
                <HeatMap
                  width={plotWidth}
                  height={plotHeight}
                  minVal={maxVal}
                  maxVal={minVal}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataVal}
                />
              </Paper>
              <Paper>
                <GradientScale
                  gradientHeight={plotHeight}
                  gradientWidth={plotHeight * 0.03}
                />
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

export default Lab3D;
