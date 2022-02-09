import React from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';

import styles from './lab3/lab3.module.scss';
import {
  HeatMap,
  Sidebar,
  TextInput,
  Paper,
  Column,
  MatrixEditor,
  Tag,
  NewHeatMap,
  GradientScale,
  ButtonGroup,
} from 'components';

import cn from 'classnames';

import { MetaPropsType, withLayout } from 'layout/MainLayout';
import { dataType } from 'types/types';

import { useRefractionMatrix } from 'store/refraction-matrix.context';
import { useWebSocket } from 'hooks/useWebSocket';
import { displayedData } from 'utils/displayed-data';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Button } from 'components/atoms/Button/Button';

export enum LabNames {
  LAB_2D = '2D',
  LAB_3D = '3D',
  DIFRACTION = 'DIFRACTION',
  INTERFERENCE = 'INTERFERENCE',
  BORDER = 'BORDER',
}

const LabPage: React.FC<ILabPageProps> = ({ currentLabName }) => {
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

  const { matrix, setMatrix } = useRefractionMatrix(currentLabName);

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

  const clickStartBtnHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    startDataReceiving({
      setPause,
      displayedData,
      currentDisplayingData,
      condition: [lambda, beamsize, n1, n2],
      matrix,
      socket,
    });
    setSimulation(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar className={styles.sidebar}>
          {/* <div className={styles.sidebar}> */}
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
        {/* </div> */}

        {/* <div className='p-3 bd-highlight w-75'> */}
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

        <Sidebar className={styles.sidebar2}>
          {/* <div className={styles.sidebar2}> */}
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
          <button
            onClick={clickStartBtnHandler}
            type='button'
            className={'btn btn-primary mt-2 ' + styles.button}
          >
            СТАРТ
          </button>
          <button
            type='button'
            className={'btn btn-primary mt-2 ' + styles.button}
            disabled={!simulation}
            onClick={(e) => {
              e.preventDefault();
              if (!pause) {
                pauseDataReceiving(socket);
              } else {
                continueDataReceiving(socket);
              }
              setPause((pause) => !pause);
            }}
          >
            {pause ? CONTINUE_NAME : PAUSE_NAME}
          </button>
          <button
            type='button'
            className={'btn btn-primary  mt-2 ' + styles.button}
            disabled={!simulation}
            onClick={(e) => {
              e.preventDefault();
              pauseDataReceiving(socket);
              setPause(false);
              setSimulation(false);
              setStep(0);
            }}
          >
            STOP
          </button>
          <h3>
            <span className='badge bg-info mt-2 server-badge'>
              {'Server: ' + isWSocketConnected}
            </span>
          </h3>
          <hr />
          <TextInput label={STEP_NUMBER_NAME} value={step} readOnly={true} />
          <Tag size='l' color='primary'>
            {step}
          </Tag>
        </Sidebar>
        {/* </div> */}
      </div>
    </>
  );
};

export default withLayout(LabPage);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lab: LabNames.LAB_2D } },
      { params: { lab: LabNames.LAB_3D } },
      { params: { lab: LabNames.DIFRACTION } },
      { params: { lab: LabNames.INTERFERENCE } },
      { params: { lab: LabNames.BORDER } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ILabPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (typeof params?.lab === 'string') {
    const currentLabName: LabNames | null =
      Object.values(LabNames).find(
        (l) => l == params.lab?.toString().toUpperCase()
      ) || null;

    if (currentLabName) {
      return {
        props: {
          currentLabName,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export interface ILabPageProps extends Record<string, unknown> {
  currentLabName: LabNames;
}
