import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

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
    marginTop: "1rem",
    //  backgroundColor: theme.palette.grey[100],
  },
  condition: {
    padding: theme.spacing(2),
    width: "100%",
  },
  paper: {
    marginTop: "1rem",
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
  tauServer = 10,
  n1Server = 1,
}) {
  const classes = useStyles();

  const [tau, setTau] = useState(tauServer);
  const [lambda, setLambda] = useState(lambdaServer);
  const [n1, setN1] = useState(n1Server);

  const [step, setStep] = useState(0);
  const [simulation, setSimulation] = useState(false);
  const [pause, setPause] = useState(false);

  const [dataChart, setDataChart] = useState([]);
  const [dataX, setDataX] = useState(null);
  const [dataY, setDataY] = useState(null);

  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(data).length) {
      setDataX(data.dataX);
      setDataY(data.dataY);
      setRow(data.row);
      setCol(data.col);

      setStep(0);
      setPause(false);
      setSimulation(true);
    }
  }, [data]);

  useEffect(() => {
  
    if (simulation && !pause && Object.keys(data).length) {
      let tmpDataChart;
      const interval = setInterval(() => {
        if (step < row) {
          tmpDataChart = [];
          for (let j = 0; j < col; j++) {
            tmpDataChart.push({
              argument: dataX[step][j],
              value: dataY[step][j],
            });
          }
          setDataChart(tmpDataChart);
          setStep((step) => step + 1);
        }else{
          setSimulation(false)}
      }, 25);
      return () => clearInterval(interval);
    }
  }, [dataChart, simulation, pause]);


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
              label="Длительн. импульса, фс"
              variant="outlined"
              value={tau}
              onChange={(e) => setTau(e.target.value)}
            />
            <Button
              onClick={(e) => {
              //  e.preventDefault();
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
                router.push(`/2D/${lambda}/${tau}/${n1}`);
              }}
              variant="contained"
              color="primary"
            >
              СТАРТ
            </Button>
            <TextField
              label="Номер шага"
              value={step}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <div>
            <Chart data={dataChart}>
              <ArgumentAxis />
               <ValueAxis />
              <LineSeries valueField="value" argumentField="argument" />
            </Chart>
          </div>
        </div>
      </MainLayout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {

  const conditions = context.query.slug;

  if (conditions.length >= 3) {
    const [lambda, tau, n1] = [...conditions];

    const response = await fetch(
      process.env.API_URL +
        "api/echo?" +
        new URLSearchParams({
          lambda,
          tau,
          n1,
          type: "2D",
        })
      // {
      //   headers: {
      //     Accept: "application/json, text/plain, */*",
      //     "User-Agent": "*",
      //   },
      // }
    );
  console.log("data fecthingasd adasdasdas dasda");
  
    const data = await response.json();
    console.log(data); 
  console.log("data fecthingasd adasdasdas dasda");  
    return {
      props: {
        title: "ВОЛНОВАЯ ОПТИКА",
        labName:
          "ПРОСТРАНСТВЕННО-ВРЕМЕННАЯ СТРУКТУРА ЭЛЕКТРОМАГНИТНЫХ ИМПУЛЬСОВ",
        data,
        lambdaServer: lambda,
        tauServer: tau,
        n1Server: n1,
      },
    };
  }

 
  return {
    props: {
      title: "ВОЛНОВАЯ ОПТИКА",
      labName: "ПРОСТРАНСТВЕННО-ВРЕМЕННАЯ СТРУКТУРА ЭЛЕКТРОМАГНИТНЫХ ИМПУЛЬСОВ",
      data : {},
    },
  };
}
