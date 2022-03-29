import { Box, Button, Typography } from '@mui/material';
import userIcon from '../../icons/grid/userIcon.svg';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    maxHeight: 300,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: '#666',
    position: 'relative',
    border: '2px solid #666 ',
    height: 210,
    width: 210,
    borderRadius: '50%',
  },
  icon: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  uploadPhoto: {
    font: 'normal normal 300 14px/19px Segoe UI',
    color: '#B0ACAC',
  },
  firstName: {
    font: 'normal normal 600 48px/48px Segoe UI',
    marginTop: 30,
  },
  lastName: {
    font: 'normal normal 600 48px/48px Segoe UI',
  },
  email: {
    font: 'normal normal 300 16px/21px Segoe UI',
    marginTop: 15,
  },
  invitationButton: {
    backgroundColor: '#7E7EF1',
    boxShadow: '0px 3px 6px #00000029',
    color: '#fff',
    width: 209,
    marginTop: 60,
    height: 50,
    borderRadius: 100,
    textTransform: 'none',
    font: 'normal normal 600 16px/21px Segoe UI',
    '&:hover': {
      backgroundColor: '#5858cf',
    },
  },
}));

const UserInformationGrid = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.iconBackground}>
        <img src={userIcon} className={classes.icon} alt={''} />
      </Box>
      <Button className={classes.uploadPhoto}>Upload A Photo</Button>
      <Typography className={classes.firstName}>FirstName</Typography>
      <Typography className={classes.lastName}>LastName</Typography>
      <Typography className={classes.email}>email@email.com</Typography>
      <Button className={classes.invitationButton}>Resend the invite</Button>
    </Box>
  );
};

export default UserInformationGrid;
