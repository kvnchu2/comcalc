import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
  tableRow: {
    width: '70%'
  },
  table: {
    width: '70%',
    borderWidth: '70%'
  }
};


export default function EndDateTable(props) {
  const endDateList = props.clientEndDate.map( endDate => {
    
      return (
        <TableRow
        key={endDate.name}
        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        sx={style.tableRow}
        >
          <TableCell component="th" scope="row">{endDate.name}</TableCell>
          <TableCell align="right">{endDate["end_date"]} </TableCell>
        </TableRow>
      )
  })
 
  return (
    <TableContainer component={Paper} sx={style.table}>
      <label>Client End Dates Approaching</label>
      <Table sx={style.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell align="right">Client End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {endDateList}
        </TableBody>
      </Table>
    </TableContainer>
  );
}