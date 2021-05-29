import React, { useState } from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ArgumentAxis,ValueAxis, Chart, LineSeries} from "@devexpress/dx-react-chart-material-ui";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import { Button, Divider, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    //color: theme.palette.primary,
  },
  condition: {
    padding: theme.spacing(2),
    width: "100%",
  },
  paper: {
    marginTop: "1rem",
  },
}));

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
  { argument: 4, value: 34 },
  { argument: 5, value: 64 },
  { argument: 6, value: 76 },
];

const sections = [
  { title: "LAB 1.1", url: "#" },
  { title: "LAB 1.2", url: "#" },
  { title: "LAB 2.1", url: "#" },
];


export default function Blog({data2, title}) {

  console.log(title);

  const classes = useStyles();

  const [tau, setTau] = useState(2);
  const [lambda, setLambda] = useState(52);
  const [n1, setN1] = useState(1);
  const [step, setStep] = useState(0);

  const formHandler = (event) => {
    event.preventDefault();
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={sections} />
        <Divider />
        <main>
          <Typography className={classes.title} variant="h3">
            FINITE DIFFERNCE TIME DOMAIN METHOD
          </Typography>

          <div className={classes.root}>
            <form onSubmit={formHandler} noValidate autoComplete="off">
              <Grid container justify="space-between">
                <TextField
                  value={lambda}
                  
                  label="lambda"
                  variant="outlined"
                  onChange={(e) => setLambda(e.target.value)}
                />
                <TextField
                 
                  label="n1"
                  variant="outlined"
                  value={n1}
                  onChange={(e) => setN1(e.target.value)}
                />
                <TextField
                  // id="n1"
                  label="n1"
                  variant="outlined"
                  value={tau}
                  onChange={(e) => setTau(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Start
                </Button>

                <TextField
                  // id="number of step"
                  label="Step"
                  value={step}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </form>
            <div>
              <Paper className={classes.paper}>
                <Chart data={data}>
                  <ArgumentAxis />
                  <ValueAxis />
                  <LineSeries valueField="value" argumentField="argument" />
                </Chart>
              </Paper>
            </div>
          </div>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  //process.env.API_URL
  const response = await fetch("http://localhost:3000/" + "api/echo");
  const data = await response.json();
  
 
  return {
    props: {
      title: "WAVE OPTICS",
      data2: data,
      // lastLayer: data.data[1],
    },
  };
}
