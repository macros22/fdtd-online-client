import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

import { Button, TextField, Typography } from "@material-ui/core";


// tutorial for fetching on client side
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(2),
        marginTop: "1rem",

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



export default function Lab1({
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



    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`)
        eventSource.onmessage = function (event) {
            let {dataX, dataY, row, col} = JSON.parse(event.data);


            // col = Math.random() * (10 - 5) + 5;
            // dataX = [];
            // dataY = [];
            //
            // for(let i = 0; i < col; ++i){
            //     dataX[i] = i;
            //     dataY[i] = Math.random() * (100 - 10) + 10;
            // }


            setStep(0);
            setPause(false);
            setSimulation(true);

            let tmpDataChart = [];
            for (let j = 0; j < col; j++) {
                tmpDataChart.push({
                    argument: dataX[j],
                    value: dataY[j],
                });
            }
            console.log(tmpDataChart)
            setDataChart(tmpDataChart);
            setStep((step) => step + 1);

        }
    }

    const sendConditions = async () => {

            await axios.post('http://localhost:5000/nextLayer', {
                lambda,
                tau,
                n1,
                reload: false,
                type: "2D",
            })


    }




    // async function fetchData() {
    //     const [lambda, tau, n1] = [1,10,1];
    //
    //     const response = await fetch(
    //         // process.env.API_URL+
    //         "http://localhost:3000/" +
    //         "api/echo?" +
    //         new URLSearchParams({
    //             lambda,
    //             tau,
    //             n1,
    //             reload: false,
    //             type: "2D",
    //         })
    //
    //     );
    //     const data = await response.json();
    //     setData(data);
    //
    //     setDataX(data.dataX);
    //     setDataY(data.dataY);
    //     setRow(data.row);
    //     setCol(data.col);
    //
    //     setStep(0);
    //     setPause(false);
    //     setSimulation(true);
    //
    //     let tmpDataChart = [];
    //     for (let j = 0; j < data.col; j++) {
    //         tmpDataChart.push({
    //             argument: data.dataX[j],
    //             value: data.dataY[j],
    //         });
    //     }
    //     console.log(tmpDataChart)
    //     setDataChart(tmpDataChart);
    //     setStep((step) => step + 1);
    //
    // }


    // useEffect(() => {
    //
    //     if (simulation && !pause && Object.keys(data).length) {
    //         let tmpDataChart;
    //         // const interval = setInterval(() => {
    //
    //                 tmpDataChart = [];
    //                 for (let j = 0; j < col; j++) {
    //                     tmpDataChart.push({
    //                         argument: dataX[j],
    //                         value: dataY[j],
    //                     });
    //                 }
    //                 setDataChart(tmpDataChart);
    //                 setStep((step) => step + 1);
    //
    //         // }, 220);
    //        // return () => clearInterval(interval);
    //     }
    // }, [dataChart, simulation, pause, data]);




    // useEffect(() => {
    //
    //     if (simulation && !pause && Object.keys(data).length) {
    //         let tmpDataChart;
    //         const interval = setInterval(() => {
    //             if (step < (row-1)) {
    //                 tmpDataChart = [];
    //                 for (let j = 0; j < col; j++) {
    //                     tmpDataChart.push({
    //                         argument: dataX[step][j],
    //                         value: dataY[step][j],
    //                     });
    //                 }
    //                 setDataChart(tmpDataChart);
    //                 setStep((step) => step + 1);
    //             }else{
    //                 setSimulation(false)}
    //         }, 220);
    //         return () => clearInterval(interval);
    //     }
    // }, [dataChart, simulation, pause]);


    return (
        <React.Fragment>
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
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log('before')
                                //await fetchData();
                                sendConditions();
                                console.log('after')
                            }}
                            variant="contained"
                            color="primary"
                        >
                            СТАРТ
                        </Button>
                        <TextField
                            label="Номер шага"
                            value={step*10}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <div>asdasdasd</div>
                    <div>asdasdasasdasdd</div>
                    \<div>asdasdasd</div>
                    <div>
                        <Chart data={dataChart}>
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField="value" argumentField="argument" />
                        </Chart>
                    </div>
                </div>
        </React.Fragment>
    );
}
