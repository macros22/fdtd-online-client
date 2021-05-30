import { HeatMap } from "../../components/HeatMap";
import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import { Button, Divider, TextField, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { MainLayout } from "../../components/MainLayout";
require("url").URL;
require("url").URLSearchParams;

// tutorial for fetching on client side
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(2),
    marginTop: "1rem"
    // backgroundColor: theme.palette.grey[100],
  },
  condition: {
    padding: theme.spacing(2),
    width: "100%",
  },
  paper: {
    // marginTop: "1rem",
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
  },
}));

export default function Lab2({
  title,
  labName,
  data,
  lambdaServer = 1,
  beamsizeServer = 3,
  n1Server = 1,
  eachNumStep = 25,
}) {
  const classes = useStyles();

  const [beamsize, setBeamsize] = useState(beamsizeServer);
  const [lambda, setLambda] = useState(lambdaServer);
  const [n1, setN1] = useState(n1Server);

  const [step, setStep] = useState(0);
  const [simulation, setSimulation] = useState(false);
  const [pause, setPause] = useState(false);

  const [dataX, setDataX] = useState(null);
  const [dataY, setDataY] = useState(null);

  const [dataEz, setDataEz] = useState(null);
  const [maxEz, setMaxEz] = useState(null);
  const [minEz, setMinEz] = useState(null);

  const [dataHy, setDataHy] = useState(null);
  const [maxHy, setMaxHy] = useState(null);
  const [minHy, setMinHy] = useState(null);

  const [dataHx, setDataHx] = useState(null);
  const [maxHx, setMaxHx] = useState(null);
  const [minHx, setMinHx] = useState(null);

  const [dataEnergy, setDataEnergy] = useState(null);
  const [maxEnergy, setMaxEnergy] = useState(null);
  const [minEnergy, setMinEnergy] = useState(null);
  const [row, setRow] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(data).length) {
      setDataX(data.dataX);
      setDataY(data.dataY);
      setDataEz(data.dataEz);
      setDataHy(data.dataHy);
      setDataHx(data.dataHx);
      setDataEnergy(data.dataEnergy);
      setRow(data.row);

      const setMinMaxData = (data, setMin, setMax) => {
        let maxArr = [];
        let minArr = [];
        data.forEach((el) => {
          maxArr.push(Math.max(...el));
          minArr.push(Math.min(...el));
        });
        setMin(Math.min(...minArr));
        setMax(Math.max(...maxArr));
      };

      setMinMaxData(data.dataEz, setMinEz, setMaxEz);
      setMinMaxData(data.dataHy, setMinHy, setMaxHy);
      setMinMaxData(data.dataHx, setMinHx, setMaxHx);
      setMinMaxData(data.dataEnergy, setMinEnergy, setMaxEnergy);

      setStep(0);
      setPause(false);
      setSimulation(true);
    }
  }, [data]);

  useEffect(() => {
    if (simulation && !pause && Object.keys(data).length) {
      const interval = setInterval(() => {
        if (step < row - 1) {
          setStep((s) => s + 1);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [simulation, step, row, pause]);

  return (
    <React.Fragment>
      <MainLayout labName={labName} title={title}>
        <div className={classes.root}>
          <Grid container justify="space-between">
            <TextField
              value={lambda}
              label="Длина волны, мкм"
              variant="outlined"
              onChange={(e) => setLambda(e.target.value)}
            />
            <TextField
              label="Показатель преломления"
              variant="outlined"
              value={n1}
              onChange={(e) => setN1(e.target.value)}
            />
            <TextField
              label="Радиус пучка, мкм"
              variant="outlined"
              value={beamsize}
              onChange={(e) => setBeamsize(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (simulation) setPause((pause) => !pause);
              }}
              variant="contained"
              color="primary"
            >
              {pause ? "Продолжить" : "Пауза"}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();

                router.push(`/3D/${lambda}/${beamsize}/${n1}`);
              }}
              variant="contained"
              color="primary"
            >
              СТАРТ
            </Button>
            <TextField
              label="Номер шага"
              value={step * eachNumStep}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </div>
        <div>
          <Grid container spacing={2} justify="space-between">
            {simulation && (
              <>
                <Grid item>
                  <Typography className={classes.title} variant="h6">
                    Напряж. электр. поля Ez
                  </Typography>
                  <HeatMap
                    minVal={minEz}
                    maxVal={maxEz}
                    dataX={dataX[step]}
                    dataY={dataY[step]}
                    dataVal={dataEz[step]}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.title} variant="h6">
                    Напряж. магн. поля Hy
                  </Typography>
                  
                    <HeatMap
                      minVal={minHy}
                      maxVal={maxHy}
                      dataX={dataX[step]}
                      dataY={dataY[step]}
                      dataVal={dataHy[step]}
                    />
                  
                </Grid>
                <Grid item>
                  <Typography className={classes.title} variant="h6">
                    Напряж. магн. поля Hx
                  </Typography>
                 
                    <HeatMap
                      minVal={minHx}
                      maxVal={maxHx}
                      dataX={dataX[step]}
                      dataY={dataY[step]}
                      dataVal={dataHx[step]}
                    />
                  
                </Grid>
                <Grid item>
                  <Typography className={classes.title} variant="h6">
                    Плотность энергии
                  </Typography>
                 
                    <HeatMap
                      minVal={minEnergy}
                      maxVal={maxEnergy}
                      dataX={dataX[step]}
                      dataY={dataY[step]}
                      dataVal={dataEnergy[step]}
                    />
                  
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </MainLayout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  let data = {};
  const conditions = context.query.slug;

  if (conditions.length >= 3) {
    const [lambda, beamsize, n1] = [...conditions];

    const response = await fetch(
      process.env.API_URL +
        "api/echo?" +
        new URLSearchParams({
          lambda,
          beamsize,
          n1,
          type: "3D",
        })
    );
    data = await response.json();
    return {
      props: {
        title: "ВОЛНОВАЯ ОПТИКА",
        labName: "ПРОСТРАНСТВЕННО-ВРЕМЕННАЯ СТРУКТУРА ЭЛЕКТРОМАГНИТНЫХ ПУЧКОВ",
        data,
        lambdaServer: lambda,
        beamsizeServer: beamsize,
        n1Server: n1,
        eachNumStep: +data.eachNumStep,
      },
    };
  }

  return {
    props: {
      title: "ВОЛНОВАЯ ОПТИКА",
      labName: "ПРОСТРАНСТВЕННО-ВРЕМЕННАЯ СТРУКТУРА ЭЛЕКТРОМАГНИТНЫХ ПУЧКОВ",
      data,
    },
  };
}
