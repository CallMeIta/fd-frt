import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import userIcon from '../../icons/grid/userIcon.svg';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import keyIcon from '../../icons/grid/keyIcon.svg';
import inactiveUserKey from '../../icons/grid/inactiveUserKey.svg';
import UserContext from '../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTableCell-root': {
      padding: 17,
    },
  },
  tableCell: {
    border: 'none',
  },
  iconBackground: {
    backgroundColor: '#666',
    position: 'relative',
    border: '2px solid #666 ',
    height: 47,
    width: 46,
    borderRadius: 50,
  },
  icon: {
    height: 46,
    width: 46,
    position: 'absolute',
    top: 0,
  },
  userName: {
    display: 'flex',
  },
  firstNameTypography: {
    color: '#000000',
    font: 'normal normal 600 16px/21px Segoe UI',
  },
  lastNameTypography: {
    color: '#000000',
    font: 'normal normal 600 16px/21px Segoe UI',
    paddingLeft: 10,
  },
  userEmail: {
    color: '#000000',
    font: 'normal normal 300 16px/21px Segoe UI',
  },
  toggleUser: {},
  activeKeyIcon: {
    width: 48,
    height: 32,
    backgroundColor: '#7E7EF1',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    paddingLeft: 10,
    color: '#C6C6C6',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
      transition: '0.5s',
    },
  },
  deleteIcon: {
    color: '#C6C6C6',
    paddingLeft: 25,
    cursor: 'pointer',
    '&:hover': {
      color: '#FF0000',
      transition: '0.5s',
    },
  },
  role: {
    font: 'normal normal 600 16px/21px Segoe UI',
    marginLeft: 20,
  },
  inactiveUserKey: {
    marginLeft: 10,
    marginRight: 10,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const GridBody = ({ order, orderBy, getComparator, page, rowsPerPage }) => {
  const classes = useStyles();
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  return (
    <TableBody className={classes.root}>
      {userData
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow key={index} hover>
              <TableCell className={classes.tableCell}>
                <Box
                  className={classes.iconBackground}
                  style={{
                    opacity: row.status === false && 0.35,
                  }}
                >
                  <img src={userIcon} className={classes.icon} alt={''} />
                </Box>
              </TableCell>
              <TableCell>
                <Grid
                  className={classes.userName}
                  style={{ opacity: row.status === false && 0.35 }}
                >
                  <Typography className={classes.firstNameTypography}>
                    {row.firstName}
                  </Typography>
                  <Typography className={classes.lastNameTypography}>
                    {row.lastName}
                  </Typography>
                </Grid>
                <Grid
                  className={classes.userEmail}
                  style={{ opacity: row.status === false && 0.35 }}
                >
                  {row.email}
                </Grid>
              </TableCell>
              <TableCell>
                <Box
                  className={classes.status}
                  style={{
                    marginLeft: row.role === 'Admin' && -50,
                  }}
                >
                  <Grid sx={{ display: row.role !== 'Admin' && 'none' }}>
                    {row.status === false ? (
                      <img
                        className={classes.inactiveUserKey}
                        src={inactiveUserKey}
                        alt={''}
                      />
                    ) : (
                      <Box className={classes.activeKeyIcon}>
                        <img src={keyIcon} alt={''} />
                      </Box>
                    )}
                  </Grid>
                  <Grid
                    className={classes.role}
                    style={{ opacity: row.status === false && 0.35 }}
                  >
                    {row.role}
                  </Grid>
                </Box>
              </TableCell>
              <TableCell>
                <Switch
                  className={classes.toggleUser}
                  checked={row.status}
                  onClick={() =>
                    setUserData((prevState) => {
                      const newState = [...prevState];
                      const userIndex = newState.findIndex(
                        (u) => u.id === row.id
                      );
                      newState[userIndex].status = !newState[userIndex].status;
                      return newState;
                    })
                  }
                />
              </TableCell>
              <TableCell>
                {row.status !== false && (
                  <SettingsIcon
                    className={classes.settingsIcon}
                    onClick={() => history.push(`/user/${row.id}`)}
                  />
                )}
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={() => {
                    if (row.id) {
                      setUserData((prev) =>
                        prev.filter((item) => item.id !== row.id)
                      );
                    }
                  }}
                  style={{ paddingLeft: row.status === false && 60 }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 85 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default GridBody;
