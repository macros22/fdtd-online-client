import React, { useState, useEffect } from 'react';
//import { ArgumentAxis, ValueAxis, Chart, LineSeries } from '@devexpress/dx-react-chart-material-ui';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';
import classes from './lab2.module.scss';

import { HeatMap } from 'components';
// import { DataChartType } from 'types/lab2';

export default function Lab1() {
  const [beamsize, setBeamsize] = useState<number>(3);
  const [lambda, setLambda] = useState<number>(1);
  const [n1, setN1] = useState<number>(1);

  const [step, setStep] = useState<number>(0);
  const [simulation, setSimulation] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);




  type dataType = {
    dataX: number[];
    dataY: number[];
    dataEz: number[];
    dataHx: number[];
    dataHy: number[];
    row: number;
    col: number;
    step: number;
  } ;
  const initAllData: dataType = {
    dataX: [],
    dataY: [],
    dataEz: [],
    dataHx: [],
    dataHy: [],
    row: 0,
    col: 0,
    step: 0,
  }

  const [allData, setAllData] = useState<dataType>(initAllData);



  // const [dataX, setDataX] = useState<dataType>(null);
  // const [dataY, setDataY] = useState<dataType>(null);
  //
  // const [dataEz, setDataEz] = useState<dataType>(null);
   const [maxEz, setMaxEz] = useState<number>(1);
   const [minEz, setMinEz] = useState<number>(-1);

  // const [dataHy, setDataHy] = useState<number[]>(null);
  // const [maxHy, setMaxHy] = useState<number[]>(null);
  // const [minHy, setMinHy] = useState<number[]>(null);
  //
  // const [dataHx, setDataHx] = useState<number[]>(null);
  // const [maxHx, setMaxHx] = useState<number[]>(null);
  // const [minHx, setMinHx] = useState<number[]>(null);
  //
  // const [dataEnergy, setDataEnergy] = useState<number[]>(null);
  // const [maxEnergy, setMaxEnergy] = useState<number[]>(null);
  // const [minEnergy, setMinEnergy] = useState<number[]>(null);


  //const [dataChart, setDataChart] = useState<DataChartType>([]);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect/lab2`);

    eventSource.onopen = function () {
      console.log('Event: open');
    };

    eventSource.onerror = function () {
      console.log('Event: error');
    };

    setPause(false);

    eventSource.onmessage = function (event) {

      let data = JSON.parse(event.data);
      console.log(data);
      // setAllData(data)
      //
      // //let { dataX, dataY, dataEz, dataHy, dataHx, dataEnergy, step, col, row} = JSON.parse(event.data);
      // setStep(step || 0);
      //
      //
      // setMinEz(Math.min(...data.dataEz));
      // setMaxEz(Math.max(...data.dataEz));




      // let tmpDataChart = [];
      // for (let j = 0; j < col; j++) {
      //   tmpDataChart.push({
      //     argument: dataX[j],
      //     value: dataY[j],
      //   });
      // }
      // setDataChart(tmpDataChart);
    };
  };

  const sendConditions = (reload = true) => {
    (async function () {
      await axios.post('http://localhost:5000/nextLayer/lab2', {
        lambda,
        beamsize,
        n1,
        reload,
        type: '3D',
      });
    })();
  };

  const pauseDataReceiving = () => {
    (async function () {
      await axios.get('http://localhost:5000/pause/lab2');
    })();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <TextField
              value={lambda}
              label={WAVE_LENGTH_NAME}
              variant="outlined"
              onChange={(e) => setLambda(+e.target.value)}
            />
            <TextField
              label={REFRACTIVE_INDEX_NAME}
              variant="outlined"
              value={n1}
              onChange={(e) => setN1(+e.target.value)}
            />
            <TextField
              label={BEAMSIZE_NAME}
              variant="outlined"
              value={beamsize}
              onChange={(e) => setBeamsize(+e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!pause) {
                  pauseDataReceiving();
                } else {
                  sendConditions(false);
                }
                setPause((pause) => !pause);
              }}
              disabled={!simulation}
              variant="contained"
              color="primary"
            >
              {pause ? CONTINUE_NAME : PAUSE_NAME}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                sendConditions();
                setSimulation(true);
              }}
              variant="contained"
              color="primary"
            >
              СТАРТ
            </Button>
            <TextField
              label={STEP_NUMBER_NAME}
              value={step}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Paper>

        {/*<Paper className={classes.paper}>*/}
        {/*  <HeatMap*/}
        {/*    minVal={minEz}*/}
        {/*    maxVal={maxEz}*/}
        {/*    dataX={allData.dataX}*/}
        {/*    dataY={allData.dataY}*/}
        {/*    dataVal={allData.dataEz}*/}
        {/*  />*/}
        {/*</Paper>*/}
      </div>
    </React.Fragment>
  );
}
