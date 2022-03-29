import { useContext, useEffect, useState } from 'react';
import { Box, Grid, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UsersContext from '../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
  },
  titleTextGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  permissionsText: {
    font: 'normal normal 600 36px/48px Segoe UI',
  },
  roleText: {
    font: 'normal normal 300 16px/21px Segoe UI',
  },
  superAdminGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 55,
    marginBottom: 26,
  },
  superAdminTypography: {
    font: 'normal normal bold 16px/21px Segoe UI',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D8D8D8',
  },
  permissionGroupGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    userSelect: 'none',
    marginTop: 26,
  },
  permissionGroupTypography: {
    font: 'normal normal 600 16px/21px Segoe UI',
  },
  userPermissionsGrid: {
    justifyContent: 'space-between',
  },
  userPermissionNameGrid: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 30,
    cursor: 'context-menu',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    marginRight: 10,
  },
  permissionNameGrid: {
    display: 'flex',
    marginLeft: -33,
  },
  permissionIcons: {
    marginRight: 10,
  },
}));

const UserPermissions = ({ user }) => {
  const ctx = useContext(UsersContext);
  const setUserData = ctx.setUserData;
  const [permissionData, setPermissionData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const userData = ctx.userData;
    setPermissionData(userData);
  }, [ctx.userData, permissionData]);

  return (
    <Box className={classes.root}>
      <Grid className={classes.titleTextGrid}>
        <Typography className={classes.permissionsText}>Permissions</Typography>
        <Typography className={classes.roleText}>Admin</Typography>
      </Grid>
      {permissionData.map((user) => {
        return user.superAdmin?.map((superAdmin, index) => (
          <Grid className={classes.superAdminGrid} key={index + 1}>
            <Typography className={classes.superAdminTypography}>
              {superAdmin.name}
            </Typography>
            <Switch
              checked={superAdmin.superAdminStatus}
              onClick={() =>
                setUserData((prevState) => {
                  const newState = [...prevState];
                  const userIndex = newState.findIndex((u) => u.id === user.id);
                  newState[userIndex].superAdmin.superAdminStatus =
                    !newState[userIndex].superAdmin.superAdminStatus;
                  return newState;
                })
              }
            />
          </Grid>
        ));
      })}
      <Box className={classes.divider} />
      <Box>
        {permissionData.map((user) => {
          return (
            <>
              {user.permissionGroups?.map((permissionGroup) => (
                <>
                  <Grid
                    className={classes.permissionGroupGrid}
                    style={{
                      marginBottom: permissionGroup.isOpen ? 40 : 10,
                    }}
                    key={permissionGroup.id}
                  >
                    <Grid
                      className={classes.permissionNameGrid}
                      onClick={() =>
                        setUserData((prevState) => {
                          const newState = [...prevState];
                          const userIndex = newState.findIndex(
                            (u) => u.id === user.id
                          );
                          const permissionIndex = newState[
                            userIndex
                          ].permissionGroups.findIndex(
                            (p) => p.id === permissionGroup.id
                          );
                          newState[userIndex].permissionGroups[
                            permissionIndex
                          ].isOpen =
                            !newState[userIndex].permissionGroups[
                              permissionIndex
                            ].isOpen;
                          return newState;
                        })
                      }
                    >
                      {permissionGroup.isOpen ? (
                        <KeyboardArrowUpIcon
                          className={classes.permissionIcons}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          className={classes.permissionIcons}
                        />
                      )}
                      <Typography className={classes.permissionGroupTypography}>
                        {permissionGroup.name}
                      </Typography>
                    </Grid>
                    <Switch
                      checked={permissionGroup.isActive}
                      onClick={() =>
                        setUserData((prevState) => {
                          const newState = [...prevState];
                          const userIndex = newState.findIndex(
                            (u) => u.id === user.id
                          );
                          const permissionIndex = newState[
                            userIndex
                          ].permissionGroups.findIndex(
                            (p) => p.id === permissionGroup.id
                          );
                          newState[userIndex].permissionGroups[
                            permissionIndex
                          ].isActive =
                            !newState[userIndex].permissionGroups[
                              permissionIndex
                            ].isActive;

                          console.log(permissionData);
                          return newState;
                        })
                      }
                    />
                  </Grid>
                  {permissionGroup.permissions?.map((permissions) => (
                    <Grid
                      className={classes.userPermissionsGrid}
                      style={{
                        display: permissionGroup.isOpen ? 'flex' : 'none',
                      }}
                      key={permissions.id}
                    >
                      <Grid className={classes.userPermissionNameGrid}>
                        <Box
                          className={classes.dot}
                          style={{
                            backgroundColor: permissions.isActive
                              ? '#44A0D3'
                              : '#FF0000',
                          }}
                        />
                        <Typography
                          style={{
                            font: permissions.isActive
                              ? 'normal normal 600 16px/21px Segoe UI'
                              : 'normal normal 300 16px/21px Segoe UI',
                          }}
                        >
                          {permissions.name}
                        </Typography>
                      </Grid>
                      <Switch
                        checked={permissions.isActive}
                        onClick={() =>
                          setUserData((prevState) => {
                            const newState = [...prevState];
                            const userIndex = newState.findIndex(
                              (u) => u.id === user.id
                            );
                            const permissionGroupIndex = newState[
                              userIndex
                            ].permissionGroups.findIndex(
                              (p) => p.id === permissionGroup.id
                            );

                            const permissionIndex = newState[
                              userIndex
                            ].permissionGroups[
                              permissionGroupIndex
                            ].permissions.findIndex(
                              (p) => p.id === permissions.id
                            );

                            newState[userIndex].permissionGroups[
                              permissionGroupIndex
                            ].permissions[permissionIndex].isActive =
                              !newState[userIndex].permissionGroups[
                                permissionGroupIndex
                              ].permissions[permissionIndex].isActive;

                            return newState;
                          })
                        }
                      />
                    </Grid>
                  ))}
                  <Box className={classes.divider} />
                </>
              ))}
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default UserPermissions;
