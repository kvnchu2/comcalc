import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, travel) {
  return { name, travel };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TravelMileageTable(props) {
  const combinedList = props.routes.sort(function(a,b) { return a.order - b.order}).map( route => {
    if (isNaN(route.traveltime)) {
      return (
        <TableRow
        key={route.events.summary}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{route.events.summary}</TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow
        key={route.events.summary}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{route.events.summary}</TableCell>
          <TableCell align="right">{Math.ceil(route.traveltime / 60)} minutes {Math.ceil(route.mileage / 1000)} kilometers</TableCell>
        </TableRow>
      )
    }
  })
  const combinedListTwo = props.routesTwo.sort(function(a,b) { return a.order - b.order}).map( route => {
    if (isNaN(route.traveltime)) {
      return (
        <TableRow
        key={route.events.summary}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{route.events.summary}</TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow
        key={route.events.summary}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{route.events.summary}</TableCell>
          <TableCell align="right">{Math.ceil(route.traveltime / 60)} minutes {Math.ceil(route.mileage / 1000)} kilometers</TableCell>
        </TableRow>
      )
    }
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="right">Travel Time and Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combinedList}
          {combinedListTwo}
        </TableBody>
      </Table>
    </TableContainer>
  );
}