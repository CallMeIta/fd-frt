import { useParams, Redirect } from 'react-router';
import { useContext, useMemo } from 'react';
import GearIcon from './GearIcon';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserInformationGrid from './UserInformationGrid';
import UserDetails from './UserDetails';
import UserPermissions from './UserPermissions';
import UserContext from '../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 192,
    paddingRight: 70,
    paddingTop: 60,
    position: 'relative',
  },
  componentsBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const MainUserInformation = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const { getUserById } = useContext(UserContext);
  const user = useMemo(() => getUserById(userId), [userId, getUserById]);

  if (!user) return <Redirect to="/" />;

  return (
    <Box className={classes.root}>
      <GearIcon />
      <Box className={classes.contentBox}>
        <UserInformationGrid />
        <UserDetails user={user} />
        <UserPermissions user={user} />
      </Box>
    </Box>
  );
};

export default MainUserInformation;
