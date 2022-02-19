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

import { useRefractionMatrix } from 'store/refraction-matrix.context';
import { useWebSocket } from 'hooks/useWebSocket';
import { IExperimentProps } from './Experiment.props';
import { displayedData } from 'utils/displayed-data';

const Experiment: React.FC<IExperimentProps> = ({ currentLabName }) => {
  const [isWSocketConnected, setIsWSocketConnected] =
    React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const heatMapWidth = 430;
  const heatMapHeight = 430;

  const [tau, setTau] = React.useState<number>(10);
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

  const { matrix } = useRefractionMatrix();

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

  // Handlers.
  const clickStartPauseContinueBtnHandler = () => {
    if (!simulation) {
      startDataReceiving({
        setPause,
        displayedData,
        currentDisplayingData,
        condition: [lambda, beamsize, refractiveIndex1, refractiveIndex2],
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
          <NumberInput
            value={typeof lambda === 'number' ? lambda : 0}
            label={WAVE_LENGTH_NAME}
            onChange={(e) => setLambda(+e.target.value)}
          />
          {currentLabName === LabNames.LAB_2D ? (
            <NumberInput
              label={BEAMSIZE_NAME}
              value={tau}
              onChange={(e) => setTau(+e.target.value)}
            />
          ) : (
            <NumberInput
              label={BEAMSIZE_NAME}
              value={beamsize}
              onChange={(e) => setBeamsize(+e.target.value)}
            />
          )}

          <NumberInput
            label={REFRACTIVE_INDEX_NAME}
            value={refractiveIndex1}
            onChange={(e) => setrefractiveIndex1(+e.target.value)}
          />

          {currentLabName === LabNames.DIFRACTION && (
            <>
              <NumberInput
                label={REFRACTIVE_INDEX_NAME}
                value={refractiveIndex2}
                onChange={(e) => setRefractiveIndex2(+e.target.value)}
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
                <GradientScale height={heatMapHeight} />
              </Paper>
            </div>
          </div>
        </div>

        <Sidebar className={styles.sidebarRight}>
          {currentLabName !== LabNames.LAB_2D && (
            <>
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

export default Experiment;
