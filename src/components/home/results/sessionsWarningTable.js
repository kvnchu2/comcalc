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
    width: '100%',
    height: '50px',
    fontSize: '5px'
  },
  table: {
    paddingLeft: '60px',
    width: '100%',
    height: '400px'
  }
};

export default function SessionsWarningTable(props) {
  const sessionsWarningList = props.sessionsWarning.map( sessionWarning => {
    
      return (
        <TableRow
        key={sessionWarning.name}
        sx={style.tableRow}
        >
          <TableCell component="th" scope="row">{sessionWarning.name}</TableCell>
          <TableCell align="right">{sessionWarning["sessions_completed"]} </TableCell>
          <TableCell align="right">{sessionWarning["sessions_remaining"]} </TableCell>
        </TableRow>
      )
  })
 
  return (
    <TableContainer component={Paper} sx={style.table}>
      <label>Sessions Almost Completed</label>
      <Table sx={ style.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell align="right">Sessions Completed</TableCell>
            <TableCell align="right">Sessions Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessionsWarningList}
        </TableBody>
      </Table>
    </TableContainer>
  );
}