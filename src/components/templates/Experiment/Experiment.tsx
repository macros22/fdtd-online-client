import React from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';

import styles from './Experiment.module.scss';
import {
  // HeatMap,
  Sidebar,
  TextInput,
  Paper,
  // Column,
  MatrixEditor,
  Tag,
  NewHeatMap,
  GradientScale,
  ButtonGroup,
  Button,
} from 'components';

import { dataType, LabNames } from 'types/types';

import { useRefractionMatrix } from 'store/refraction-matrix.context';
import { useWebSocket } from 'hooks/useWebSocket';
import { IExperimentProps } from './Experiment.props';
import { displayedData } from 'utils/displayed-data';

const Experiment: React.FC<IExperimentProps> = ({
  currentLabName,
  currentLabContentType,
}) => {
  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const [beamsize, setBeamsize] = React.useState<number>(3);
  const [lambda, setLambda] = React.useState<number>(1);
  const [n1, setN1] = React.useState<number>(1);
  const [n2, setN2] = React.useState<number>(2);

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

  const { matrix } = useRefractionMatrix();
  console.log(currentLabContentType);

  React.useEffect(() => {
    connectWS({
      setIsWSocketConnected,
      setStep,
      setAllData,
      setSocket,
    });
    return () => {
      if (socket !== null) {
        socket.close(1000, 'работа закончена');
      }
    };
  }, []);

  const {
    connectWS,
    startDataReceiving,
    continueDataReceiving,
    pauseDataReceiving,
  } = useWebSocket();

  const clickStartPauseContinueBtnHandler = () => {
    // e.preventDefault();
    if (!simulation) {
      startDataReceiving({
        setPause,
        displayedData,
        currentDisplayingData,
        condition: [lambda, beamsize, n1, n2],
        matrix,
        socket,
      });
      setSimulation(true);
    } else {
      if (!pause) {
        pauseDataReceiving(socket);
      } else {
        continueDataReceiving(socket);
      }
      setPause((pause) => !pause);
    }
  };

  const clickStopBtnHandler = (e: React.MouseEvent) => {
    if (simulation) {
      pauseDataReceiving(socket);
      setPause(false);
      setSimulation(false);
      setStep(0);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar className={styles.sidebarLeft}>
          <TextInput
            value={typeof lambda === 'number' ? lambda : 0}
            label={WAVE_LENGTH_NAME}
            onChange={(e) => setLambda(+e.target.value)}
          />

          <TextInput
            label={BEAMSIZE_NAME}
            value={beamsize}
            onChange={(e) => setBeamsize(+e.target.value)}
          />

          <TextInput
            label={REFRACTIVE_INDEX_NAME}
            value={n1}
            onChange={(e) => setN1(+e.target.value)}
          />

          {currentLabName === LabNames.DIFRACTION && (
            <>
              <TextInput
                label={REFRACTIVE_INDEX_NAME}
                value={n2}
                onChange={(e) => setN2(+e.target.value)}
              />
              <hr />
              <MatrixEditor buttonStyle={styles.button + ' mt-3'} />
            </>
          )}
        </Sidebar>

        <div className={styles.content}>
          <div className={styles.workArea}>
            <h6>
              <span>
                {'Пространственно-временная структура ' +
                  displayedData[currentDisplayingData].title}
              </span>
            </h6>

            <div className={styles.graph}>
              <Paper>
                <NewHeatMap
                  minVal={Math.min(...allData.dataVal)}
                  maxVal={Math.max(...allData.dataVal)}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataVal}
                />
              </Paper>
              <Paper>
                <GradientScale />
              </Paper>
            </div>
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
          {currentLabName !== LabNames.LAB_2D && (
            <>
              <p className={styles.tempP}>Выбор данных:</p>
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
              <hr />
            </>
          )}

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
          <Tag size='l' color='primary'>
            {'Server: ' + isWSocketConnected}
          </Tag>
          <hr />
          <TextInput label={STEP_NUMBER_NAME} value={step} readOnly={true} />
          <Tag size='l' color='primary'>
            {step}
          </Tag>
        </Sidebar>
      </div>
    </>
  );
};

export default Experiment;
