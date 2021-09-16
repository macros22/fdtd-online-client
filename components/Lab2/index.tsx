import React, { useState, useEffect } from 'react';
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


// const SERVER_URL = process.env.SERVER_URL as string;
const SERVER_URL = 'https://protected-lowlands-53492.herokuapp.com/';
const min = -1;
const max =  1.1;

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
    dataEnergy: number[];
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
    dataEnergy: [],
    row: 0,
    col: 0,
    step: 0,
  }

  const [allData, setAllData] = useState<dataType>(initAllData);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(SERVER_URL + `connect/lab2`);

    eventSource.onopen = function () {
      console.log('Event: open');
    };

    eventSource.onerror = function () {
      console.log('Event: error');
    };

    setPause(false);

    eventSource.onmessage = function (event) {

       let data = JSON.parse(event.data);
       //console.log(data)
       setAllData(data)

       setStep(data.step || 0);

       console.log(Math.min(...data.dataEnergy));
       console.log(Math.max(...data.dataEnergy));
      //  // setMinEz(Math.min(...data.dataEz));
      //  // setMaxEz(Math.max(...data.dataEz));
      // setMinEz(-1);
      // setMaxEz(1.1);

    };
  };

  const sendConditions = (reload = true) => {
    (async function () {
      await axios.post(SERVER_URL + 'nextLayer/lab2', {
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
      await axios.get(SERVER_URL + 'pause/lab2');
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

        <Paper className={classes.paper}>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
          <HeatMap
            minVal={min}
            maxVal={max}
            dataX={allData.dataX}
            dataY={allData.dataY}
            dataVal={allData.dataEz}
          />
            </Grid>

<Grid item>
          <HeatMap
            minVal={min}
            maxVal={max}
            dataX={allData.dataX}
            dataY={allData.dataY}
            dataVal={allData.dataHy}
          /></Grid>
<Grid item>
          <HeatMap
            minVal={-0.1}
            maxVal={0.1}
            dataX={allData.dataX}
            dataY={allData.dataY}
            dataVal={allData.dataHx}
          /></Grid>
<Grid item>
          <HeatMap
            minVal={min}
            maxVal={max}
            dataX={allData.dataX}
            dataY={allData.dataY}
            dataVal={allData.dataEnergy}
          /></Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}
