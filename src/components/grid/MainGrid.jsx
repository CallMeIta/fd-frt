import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import GridHeader from './GridHeader';
import GridBody from './GridBody';
import { useContext, useState } from 'react';
import Invitation from './invitation/Invitation';
import { makeStyles } from '@mui/styles';
import UserContext from '../context/users-context';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 172,
    paddingRight: 98,
    paddingTop: 60,
    position: 'relative',
  },
}));

const MainGrid = () => {
  const classes = useStyles();

  const ctx = useContext(UserContext);
  const rows = ctx.userData;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('userName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className={classes.root}>
      <Invitation />
      <TableContainer>
        <Table>
          <GridHeader
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <GridBody
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            getComparator={getComparator}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Records on page'}
      />
    </Box>
  );
};

export default MainGrid;
