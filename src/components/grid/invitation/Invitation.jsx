import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import InvitationModal from './InvitationModal';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: -30,
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: '#305ECA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#277fb1',
      transition: '0.5s',
    },
  },
  icon: {
    color: '#fff',
    fontSize: 37,
  },
}));

const Invitation = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Box className={classes.root} onClick={() => setIsModalOpen(true)}>
        <AddIcon className={classes.icon} />
      </Box>
      <InvitationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Invitation;
