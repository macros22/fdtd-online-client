import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      maxWidth: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontWeight: 500,
      letterSpacing: '4px',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
  })
);