import React, { useState, useEffect } from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import classes from './lab4.module.scss';
import {
  HeatMap,
  Sidebar,
  TextInput,
  Paper,
  CenteredBlock,
  Column,
  DifractionEditor,
} from 'components';

import { SERVER_URL } from 'constants/url';
import MainLayout from 'layout/MainLayout';
import { dataType } from 'types/types';
import { isDynamicRoute } from 'next/dist/next-server/lib/router/utils';

const min = -1;
const max = 1.1;

const displayedData = [
  { title: 'Напряженность электр. поля Ez', name: 'Ez' },
  { title: 'Напряженность магн. поля Hy', name: 'Hy' },
  { title: 'Напряженность магн. поля Hx', name: 'Hx' },
  { title: 'Плотность энергии электромагн. поля', name: 'Energy' },
];

export default function Index() {
  const [isWSocketConnected, setIsWSocketConnected] = React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const [beamsize, setBeamsize] = useState<number>(3);
  const [lambda, setLambda] = useState<number>(1);
  const [n1, setN1] = useState<number>(1);

  const [step, setStep] = useState<number>(0);
  const [simulation, setSimulation] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const [currentDisplayingData, setCurrentDisplayingData] = React.useState<number>(0);

  const initAllData: dataType = {
    dataX: [],
    dataY: [],
    dataEz: [],
    dataHx: [],
    dataHy: [],
    dataEnergy: [],
    row: 0,
    col: 0,
    step: 0,
  };

  const [allData, setAllData] = useState<dataType>(initAllData);

  useEffect(() => {
    connectWS();
    return () => {
      if (socket !== null) {
        socket.close(1000, 'работа закончена');
      }
    };
  }, []);

  function connectWS() {
    const socket = new WebSocket(SERVER_URL);

    if (socket) {
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        let data = JSON.parse(event.data);
        setStep(data.step || 0);
        setAllData(data);
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
  }

  // console.log(Math.min(...data.dataEnergy));
  // console.log(Math.max(...data.dataEnergy));

  const startDataReceiving = () => {
    setPause(false);

    const message = {
      event: 'start',
      type: 'DIFRACTION',
      condition: [lambda, beamsize, n1, 1.5],
    };

    if (socket !== null) {
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
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <>
      <MainLayout title={'Wave optics | Lab 4'}>
        <div className="d-flex bg-light align-items-stretch mh-100">
          <Sidebar>
            <TextInput
              value={typeof lambda === 'number' ? lambda : 0}
              label={WAVE_LENGTH_NAME}
              onChange={(e) => setLambda(+e.target.value)}
            />
            <TextInput
              label={REFRACTIVE_INDEX_NAME}
              value={n1}
              onChange={(e) => setN1(+e.target.value)}
            />
            <TextInput
              label={BEAMSIZE_NAME}
              value={beamsize}
              onChange={(e) => setBeamsize(+e.target.value)}
            />

            <DifractionEditor />
          </Sidebar>

          <div className="p-4 bd-highlight w-100">
            <Column>
              <CenteredBlock>
                {displayedData.map((item, index) => {
                  return (
                    <button className={'btn m-2 p-2 w-25 ' + (currentDisplayingData == index ? "btn-primary " : "btn-info ")} key={item.name}>
                      {item.name}
                    </button>
                  );
                })}

                {/* 
                <h3>
                  <span className="badge bg-secondary">
                    Пространственно-временная структура электромагнитных пучков
                  </span>
                </h3> */}
              </CenteredBlock>

              <CenteredBlock>
                <Paper>
                  <CenteredBlock>
                    <h4>
                      <span className="badge bg-primary">
                        
                        {"Пространственно-временная структура \n " + displayedData[currentDisplayingData].name}
                      </span>
                    </h4>
                  </CenteredBlock>
                  <HeatMap
                    minVal={min}
                    maxVal={max}
                    dataX={allData.dataX}
                    dataY={allData.dataY}
                    dataVal={
                      allData.dataEz
                      // Dynamically access object property in TypeScript.
                      // allData[('data' + currentDisplayingData) as keyof typeof allData] as number[]
                    }
                  />
                </Paper>
              </CenteredBlock>
            </Column>
          </div>

          <Sidebar>
            <button
              onClick={(e) => {
                e.preventDefault();
                startDataReceiving();
                setSimulation(true);
              }}
              type="button"
              className={'btn btn-primary mt-2 ' + classes.button}
            >
              СТАРТ
            </button>
            <button
              type="button"
              className={'btn btn-primary  mt-2 ' + classes.button}
              disabled={!simulation}
              onClick={(e) => {
                e.preventDefault();
                if (!pause) {
                  pauseDataReceiving();
                } else {
                  continueDataReceiving();
                }
                setPause((pause) => !pause);
              }}
            >
              {pause ? CONTINUE_NAME : PAUSE_NAME}
            </button>
            <button
              type="button"
              className={'btn btn-primary  mt-2 ' + classes.button}
              disabled={!simulation}
              onClick={(e) => {
                e.preventDefault();
                pauseDataReceiving();
                setPause(false);
                setSimulation(false);
                setStep(0);
              }}
            >
              STOP
            </button>
            <h3>
              <span className="badge bg-info mt-2 server-badge">
                {'Server: ' + isWSocketConnected}
              </span>
            </h3>
            <TextInput label={STEP_NUMBER_NAME} value={step} readOnly={true} />
          </Sidebar>
        </div>
      </MainLayout>
    </>
  );
}


