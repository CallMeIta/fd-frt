import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import { useContext, useState } from 'react';
import UserContext from '../context/users-context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {},
  detailsText: {
    font: 'normal normal 600 36px/48px Segoe UI',
    paddingLeft: 17,
  },
  activeUserToggle: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: 55,
    marginLeft: -40,
  },
  textFieldGrid: {
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  firstNameTextField: {
    width: 305,
    marginTop: 45,
  },
  lastNameTextField: {
    width: 305,
    marginTop: 45,
  },
  roleTextField: {
    width: 305,
    marginTop: 45,
  },
  saveButton: {
    backgroundColor: '#44A0D3',
    boxShadow: '0px 3px 6px #00000029',
    color: '#fff',
    width: 209,
    marginTop: 60,
    height: 50,
    borderRadius: 100,
    textTransform: 'none',
    font: 'normal normal 600 16px/21px Segoe UI',
    '&:hover': {
      backgroundColor: '#277fb1',
    },
  },
  activeUser: {
    font: 'normal normal bold 16px/21px Segoe UI',
    marginLeft: 8,
  },
}));

const UserDetails = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { setUserDataById } = useContext(UserContext);
  const [userForm, setUserForm] = useState(user);
  const handleSubmit = () => {
    setUserDataById(userForm.id, userForm);
    history.push('/');
  };

  const roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ];

  return (
    <Box>
      <Typography className={classes.detailsText}>Details</Typography>
      <Grid className={classes.activeUserToggle}>
        <Switch
          checked={userForm.status}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, status: e.target.checked }))
          }
        />
        <Typography>The User Is</Typography>
        <Typography className={classes.activeUser}>Active</Typography>
      </Grid>
      <Grid className={classes.textFieldGrid}>
        <TextField
          label="*First Name"
          value={userForm.firstName}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, firstName: e.target.value }))
          }
          variant="standard"
          className={classes.firstNameTextField}
        />
        <TextField
          label="*Last Name"
          variant="standard"
          value={userForm.lastName}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, lastName: e.target.value }))
          }
          className={classes.lastNameTextField}
        />
        <TextField
          label="*Role"
          variant="standard"
          value={userForm.role}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, role: e.target.value }))
          }
          select={true}
          className={classes.roleTextField}
        >
          {roles.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={handleSubmit} className={classes.saveButton}>
          Save Changes
        </Button>
      </Grid>
    </Box>
  );
};

export default UserDetails;
