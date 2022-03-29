import CustomModal from '../../common/CustomModal';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import keyIcon from '../../../icons/modal/keyIcon.svg';
import { makeStyles } from '@mui/styles';
import cancelFormIcon from '../../../icons/modal/cancelFormIcon.svg';
import UserContext from '../../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    width: 490,
    paddingLeft: 70,
  },
  cancelIcon: {
    float: 'right',
    paddingRight: 15,
    paddingTop: 7,
    cursor: 'pointer',
  },
  namesGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
  },
  typography: {
    font: 'normal normal 600 36px/48px Segoe UI',
    padding: '70px 83px 0 123px',
  },
  icon: {
    marginRight: 27,
    paddingTop: 20,
    fontSize: 25,
  },
  textFieldGrid: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
  },
  firstNameTextField: {
    width: 220,
  },
  lastNameTextField: {
    width: 212,
  },
  emailTextField: {
    width: '100%',
  },
  roleTextField: {
    width: 220,
  },
  submitGrid: {
    paddingTop: 40,
    paddingLeft: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButton: {
    width: 170,
    height: 45,
    backgroundColor: '#33A3DC',
    borderRadius: 30,
    '&:hover': {
      backgroundColor: '#1373a5',
    },
  },
  disabledSubmitButton: {
    backgroundColor: 'rgba(151,151,151, 0.6)',
  },
  invitationButtonText: (props) => ({
    color: props.isValid ? '#fff' : '#979797',
    font: 'normal normal 600 16px Segoe UI',
  }),
  indicatiorText: (props) => ({
    font: 'italic normal 300 16px/21px Segoe UI',
    color: props.isValid ? '#44D36A' : '#F89797',
  }),
}));

const InvitationModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isValid, setIsValid] = useState(false);

  const { setUserData } = useContext(UserContext);

  const classes = useStyles({ isValid });

  const roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const validateEmail = (userEmail) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  useEffect(() => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      role.trim() !== '' &&
      validateEmail(email)
    ) {
      setIsValid(true);
    } else setIsValid(false);
  }, [firstName, lastName, email, role]);

  const cancelFormHandler = () => {
    setIsModalOpen(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
    setIsValid(false);
  };

  return (
    <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <Box className={classes.cancelIcon} onClick={cancelFormHandler}>
        <img src={cancelFormIcon} alt={''} />
      </Box>
      <Typography className={classes.typography}>Invite New User</Typography>
      <Box className={classes.root}>
        <Grid item xs={12} className={classes.namesGrid}>
          <Grid>
            <FaceIcon className={classes.icon} />
            <TextField
              label="*First Name"
              variant="standard"
              className={classes.firstNameTextField}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <TextField
            label="*Last Name"
            variant="standard"
            className={classes.lastNameTextField}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <AlternateEmailIcon className={classes.icon} />
          <TextField
            label="*Email"
            variant="standard"
            className={classes.emailTextField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <img src={keyIcon} alt={''} className={classes.icon} />
          <TextField
            label="*Role"
            variant="standard"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            select={true}
            className={classes.roleTextField}
          >
            {roles.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className={classes.submitGrid}>
          <Button
            className={classes.submitButton}
            disabled={!isValid}
            classes={{ disabled: classes.disabledSubmitButton }}
          >
            <Typography
              className={classes.invitationButtonText}
              onClick={() =>
                setUserData((prevState) => {
                  const newState = [...prevState];
                  const newUser = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    role: role,
                    id: Math.random().toString(36).slice(2),
                  };
                  newState.push(newUser);
                  setIsModalOpen(false);
                  return newState;
                })
              }
            >
              Send Invitation
            </Typography>
          </Button>
          <Grid>
            <Typography className={classes.indicatiorText}>
              {!isValid ? 'Fill in all the fields' : 'Good To Go'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default InvitationModal;
