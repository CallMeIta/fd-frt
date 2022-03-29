import { useState, useMemo, useContext } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserContext from '../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    height: 211,
  },
  paper: {
    height: '100%',
    width: '100%',
    boxShadow: '0px 3px 6px #00000029',
    border: 'none',
    borderRadius: 'none',
  },
  contentGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '96px 98px 0 276px',
  },
  typography: {
    font: 'normal normal 600 36px/48px Segoe UI',
  },
  search: {
    width: 357,
  },
}));

const Header = () => {
  const classes = useStyles();

  const { searchItem } = useContext(UserContext);

  const [searchedItem, setSearchedItem] = useState('');

  const searchUsers = useMemo(() => {
    return searchItem(searchedItem);
  }, [searchedItem, searchItem]);

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Grid className={classes.contentGrid}>
          <Typography className={classes.typography}>Project Access</Typography>
          <TextField
            label="Type to filter the table"
            variant="standard"
            className={classes.search}
            value={searchedItem}
            onChange={(e) => {
              setSearchedItem(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default Header;
