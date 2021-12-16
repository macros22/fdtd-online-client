import React, { useState, useEffect } from 'react';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';
import classes from './lab1.module.scss';
import { Sidebar, TextInput, Paper, CenteredBlock, Column, Canvas } from 'components';

import { SERVER_URL } from 'constants/url';
import MainLayout from 'layout/MainLayout';

import { DataChartType } from 'types/lab1';

import { LAB_1_2D } from 'constants/data-type.constants';
import { CONTINUE, START, PAUSE } from 'constants/ws-event.constants';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 440;

const initDataChart: DataChartType = [];
for (let i = 0; i < CANVAS_WIDTH * 0.9; i += 10) {
  initDataChart.push({
    x: i,
    y: Math.random() * CANVAS_HEIGHT * 0.8 + 20,
  });
}

export default function Index() {
  const [isWSocketConnected, setIsWSocketConnected] = React.useState<boolean>(false);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  // Input params.
  const [tau, setTau] = useState<number>(10);
  const [lambda, setLambda] = useState<number>(1);
  const [n1, setN1] = useState<number>(1);

  const [dataChart, setDataChart] = useState<DataChartType>(initDataChart);

  // Data min
  const [maxX, setMaxX] = useState<number>(CANVAS_WIDTH);
  const [maxY, setMaxY] = useState<number>(CANVAS_HEIGHT);
  const [minX, setMinX] = useState<number>(0);
  const [minY, setMinY] = useState<number>(0);

  // Simulation step.
  const [step, setStep] = useState<number>(0);

  // If simulation begin, simulation = true.
  const [simulation, setSimulation] = useState<boolean>(false);

  // Simulation status.
  const [pause, setPause] = useState<boolean>(false);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket !== null) {
        socket.close(1000, 'Work end!');
      }
    };
  }, []);

  React.useEffect(() => {
    return () => {
      closeSocket();
    };
  }, []);

  // WebSocket configuration.
  function connectWebSocket() {
    const socket = new WebSocket(SERVER_URL);

    if (socket) {
      socket.onopen = () => {
        setIsWSocketConnected(true);
      };

      socket.onmessage = (event: any) => {
        let data = JSON.parse(event.data);

        let { dataX, dataY, step, col } = data;
        setStep(step || 0);

        let tmpDataChart: DataChartType = [];

        setMaxX(Math.max(...dataX));
        setMaxY(Math.max(...dataY));

        setMinX(Math.min(...dataX));
        setMinY(Math.min(...dataY));

        for (let j = 0; j < col; j++) {
          tmpDataChart.push({
            x: +dataX[j],
            y: +dataY[j],
          });
        }

        setDataChart(tmpDataChart);

        setStep(data.step || 0);
      };

      socket.onclose = () => {
        console.log('Socket closed!!');
        closeSocket();
        setIsWSocketConnected(false);
      };

      socket.onerror = () => {
        console.log('Socket error!!');
        setIsWSocketConnected(false);
      };
    }
    setSocket(socket);
  }

  const startDataReceiving = () => {
    setPause(false);

    const message = {
      event: START,
      type: LAB_1_2D,
      condition: [lambda, tau, n1],
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const pauseDataReceiving = () => {
    const message = {
      event: PAUSE,
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const closeSocket = () => {
    const message = {
      event: 'close',
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const continueDataReceiving = () => {
    const message = {
      event: CONTINUE,
    };

    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <>
      <MainLayout title={'Wave optics | Lab 1'}>
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
              value={tau}
              onChange={(e) => setTau(+e.target.value)}
            />
          </Sidebar>

          <div className="p-4 bd-highlight w-100">
            <Column>
              <CenteredBlock>
                <h4>
                  <span>Пространсвенно-временная структура электромагнитных импульсов</span>
                </h4>
              </CenteredBlock>

              <CenteredBlock>
                <Paper>
                  <Column>
                    <CenteredBlock>
                      <h4>
                        <span className="badge bg-primary">Зависимость Y от X</span>
                      </h4>
                    </CenteredBlock>

                    <Canvas
                      data={dataChart}
                      maxX={maxX}
                      maxY={maxY}
                      minX={minX}
                      minY={minY}
                      WIDTH={CANVAS_WIDTH}
                      HEIGHT={CANVAS_HEIGHT}
                    />
                  </Column>
                </Paper>
              </CenteredBlock>
            </Column>
          </div>
          <Sidebar>
            <TextInput label={STEP_NUMBER_NAME} value={step} readOnly={true} />
            <button
              onClick={(e) => {
                e.preventDefault();
                startDataReceiving();
                setSimulation(true);
              }}
              type="button"
              className={'btn btn-success mt-2 ' + classes.button}
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
                closeSocket();
                setSimulation(false);
                setStep(0);
              }}
            >
              STOP
            </button>
            <h3>
              <span className={'badge bg-info mt-2 server-badge'}>
                {'Server: ' + isWSocketConnected}
              </span>
            </h3>
          </Sidebar>
        </div>
      </MainLayout>
    </>
  );
}
