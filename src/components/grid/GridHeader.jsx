import { makeStyles } from '@mui/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTableCell-root': {
      padding: 20,
    },
    '& .MuiTableSortLabel-icon': {
      fontSize: 35,
    },
  },
}));

const GridHeader = ({ order, setOrderBy, orderBy, setOrder }) => {
  const gridHeader = [
    { label: '', id: 0, activeSort: false, width: 70 },
    { label: 'User', id: 'userName', activeSort: true, width: 500 },
    { label: 'Role', id: 'role', activeSort: true, width: 400 },
    { label: 'Status', id: 'status', activeSort: true, width: 300 },
    { label: 'Actions', id: 4, activeSort: true, width: 100 },
  ];

  const classes = useStyles({ gridHeader });

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead className={classes.root}>
      <TableRow>
        {gridHeader.map((item) => (
          <TableCell
            key={item.id}
            sortDirection={orderBy === item.id ? order : false}
            style={{
              border: item.id === 0 && 'none',
              width: item.width,
              textTransform: 'uppercase',
              font:
                item.id === 'userName'
                  ? 'normal normal 600 16px/21px Segoe UI'
                  : 'normal normal 600 16px/21px Segoe UI',
              opacity: item.id !== 'userName' && 0.37,
            }}
          >
            <TableSortLabel
              active={item.id !== 4 && true}
              direction={orderBy === item.id ? order : 'asc'}
              onClick={createSortHandler(item.id)}
              IconComponent={
                item.id !== (4 && 0) ? ArrowDropDownTwoToneIcon : ''
              }
            >
              {item.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default GridHeader;
