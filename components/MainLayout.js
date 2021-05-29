import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import React from "react";

import Header from "./Header";



const sections = [
  { title: "Лабораторная № 1", url: "/2D/start" },
  { title: "Лабораторная № 2", url: "/3D/start" },
];

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1),
    textAlign: "center",
    width: "100%",
  },
}));

export const MainLayout = ({ children, labName, title }) => {

    const classes = useStyles();


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={sections} />
        <Divider />
        <main>
          <Typography className={classes.title} variant="h6">
            {labName}
          </Typography>
          <Divider />
          {children}
        </main>
      </Container>
    </React.Fragment>
  );
};
