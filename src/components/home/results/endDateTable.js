import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EndDateTable(props) {
  const endDateList = props.clientEndDate.map( endDate => {
    
      return (
        <TableRow
        key={endDate.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{endDate.name}</TableCell>
          <TableCell align="right">{endDate["end_date"]} </TableCell>
        </TableRow>
      )
  })
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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