import React from 'react';
import { Modal, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus-visible': {
      visibility: 'hidden',
    },
  },
  paper: {
    backgroundColor: '#fff',
    outline: 0,
    borderRadius: 0,
    border: 'none',
    padding: '10px 5px',
    minHeight: 570,
    minWidth: 645,
    maxWidth: 645,
    boxShadow: '0px 0px 30px #00000029',
  },
}));

const RegisterModal = ({ isModalOpen, setIsModalOpen, ...props }) => {
  const classes = useStyles();
  return (
    <Modal
      open={isModalOpen}
      className={classes.modal}
      disableEscapeKeyDown={false}
      disableAutoFocus={false}
      onClose={(event, reason) => {
        if (reason && reason === 'backdropClick') {
          return;
        } else {
          setIsModalOpen(false);
        }
      }}
    >
      <Paper className={classes.paper}> {props.children} </Paper>
    </Modal>
  );
};

export default RegisterModal;
