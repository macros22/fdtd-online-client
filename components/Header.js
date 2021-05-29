import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const router = useRouter();
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          gutterBottom
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <>
          {sections.map((section) => (
            <Button key={section.url} onClick={(e) => router.push(section.url)}>
              {section.title}
            </Button>
          ))}
        </>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
