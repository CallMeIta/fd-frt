import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: -30,
    left: 120,
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: '#C6C6C6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 37,
  },
}));

const GearIcon = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <SettingsIcon className={classes.icon} />
      </Box>
    </>
  );
};

export default GearIcon;
