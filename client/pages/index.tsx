import * as React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';

import MainLayout from 'layout/MainLayout';
import { Lab2 } from 'components';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: 5,
//     textAlign: 'center',
//   },
// });

export default function Index() {
  // const classes = useStyles();

  return (
    <MainLayout title={'Wave optics'}>
      {/*      <Grid*/}
      {/*        container*/}
      {/*        className={classes.root}*/}
      {/*        direction="row"*/}
      {/*        justifyContent="space-around"*/}
      {/*        alignItems="stretch"*/}
      {/*      >*/}
      {/*        <Grid item>*/}
      {/*<h1>asd</h1>*/}
      {/*        </Grid>*/}
      {/*        <Grid item>*/}
      {/*          <h1>asd</h1>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      <Lab2 />
    </MainLayout>
  );
}
