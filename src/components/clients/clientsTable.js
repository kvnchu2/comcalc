import * as React from 'react';
import { Modal } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicModal from './basicModal';
import Delete from './delete';

const mobileRowStyle = {
  ['@media (max-width:390px)']: { // eslint-disable-line no-useless-computed-key
    display: 'block'
  }, 
  ['@media (min-width:391px)']: { // eslint-disable-line no-useless-computed-key
    display: 'none'
  }
}

const headRowStyle = {
  ['@media (max-width:390px)']: { // eslint-disable-line no-useless-computed-key
    display: 'none'
  }
}

const desktopRowStyle = {
  ['@media (max-width:390px)']: { // eslint-disable-line no-useless-computed-key
    display: 'none'
  }
}


export default function ClientsTable(props) {
  
  const allClients = props.clients.map((client) => {
    return (
      <TableRow
          key={client.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, mobileRowStyle}}
        >
          <TableCell sx={mobileRowStyle} component="th" scope="row">Client: {client.name}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Address: {client.address}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Provider: {client.provider}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Start Date: {client.start_date}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">End Date: {client.end_date}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Sessions Remaining: {client.sessions_remaining}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Sessions Completed: {client.sessions_completed}</TableCell>
          <TableCell sx={mobileRowStyle} align="left"><BasicModal client={client}></BasicModal></TableCell>
          <TableCell sx={mobileRowStyle} align="left"><Delete onClick={() => props.onDeleteHandler(client)}>Delete</Delete></TableCell>


          <TableCell sx={desktopRowStyle} component="th" scope="row">{client.name}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.address}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.provider}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.start_date}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.end_date}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.sessions_remaining}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.sessions_completed}</TableCell>
          <TableCell sx={desktopRowStyle} align="right"><BasicModal client={client}></BasicModal></TableCell>
          <TableCell sx={desktopRowStyle} align="right"><Delete onClick={() => props.onDeleteHandler(client)}>Delete</Delete></TableCell>
      </TableRow>
    )
  })

  const searchClient = props.searchClientArray.map((client) => {
    return (
      <TableRow
          key={client.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, mobileRowStyle}}
        >
          <TableCell sx={mobileRowStyle} component="th" scope="row">Client: {client.name}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Address: {client.address}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Provider: {client.provider}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Start Date: {client.start_date}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">End Date: {client.end_date}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Sessions Remaining: {client.sessions_remaining}</TableCell>
          <TableCell sx={mobileRowStyle} align="left">Sessions Completed: {client.sessions_completed}</TableCell>
          <TableCell sx={mobileRowStyle} align="left"><BasicModal client={client}></BasicModal></TableCell>
          <TableCell sx={mobileRowStyle} align="left"><Delete onClick={() => props.onDeleteHandler(client)}>Delete</Delete></TableCell>


          <TableCell sx={desktopRowStyle} component="th" scope="row">{client.name}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.address}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.provider}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.start_date}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.end_date}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.sessions_remaining}</TableCell>
          <TableCell sx={desktopRowStyle} align="right">{client.sessions_completed}</TableCell>
          <TableCell sx={desktopRowStyle} align="right"><BasicModal client={client}></BasicModal></TableCell>
          <TableCell sx={desktopRowStyle} align="right"><Delete onClick={() => props.onDeleteHandler(client)}>Delete</Delete></TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={headRowStyle}>
            <TableCell sx={headRowStyle}>Client</TableCell>
            <TableCell sx={headRowStyle} align="right">Address</TableCell>
            <TableCell sx={headRowStyle} align="right">Provider</TableCell>
            <TableCell sx={headRowStyle} align="right">Start Date</TableCell>
            <TableCell sx={headRowStyle} align="right">End Date</TableCell>
            <TableCell sx={headRowStyle} align="right">Sessions Remaining</TableCell>
            <TableCell sx={headRowStyle} align="right">Sessions Completed</TableCell>
            <TableCell sx={headRowStyle} align="right">Edit</TableCell>
            <TableCell sx={headRowStyle} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.searchClientArray.length > 0 ? searchClient : allClients}
        </TableBody>
      </Table>
    </TableContainer>
  );
}