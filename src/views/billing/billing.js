import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from "../../components/nav/navbar.js";
import "./billing.css";
import axios from 'axios';
// import { Link } from '@material-ui/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Clients() {

  const [arukahLink, setArukahLink] = useState("");
  const [lifeskillsLink, setLifeskillsLink] = useState("");
  const [kevinLink, setKevinLink] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  
  const onArukahSubmitHandler = () => {
    axios.post(`https://travel-calculator-server-production.up.railway.app/billing/add/arukah`, {"link": arukahLink})
      .then((result) => {
        console.log(result);
        handleOpen();
        setArukahLink("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onLifeskillsSubmitHandler = () => {
    axios.post(`https://travel-calculator-server-production.up.railway.app/billing/add/lifeskills/`, {"link": lifeskillsLink})
      .then((result) => {
        console.log(result);
        handleOpen();
        setLifeskillsLink("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onKevinSubmitHandler = () => {
    axios.post(`https://travel-calculator-server-production.up.railway.app/billing/add/kevin/`, {"link": kevinLink})
      .then((result) => {
        console.log(result);
        handleOpen();
        setKevinLink("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Navbar></Navbar>
      <div id="arukah-form">
      <input
          name="arukah link"
          type="text"
          placeholder="Arukah Link"
          value={arukahLink}
          onChange={event => {
            setArukahLink(event.target.value);
          }}
          class="form-elements"
      />
      <button onClick={() => onArukahSubmitHandler()}>Submit</button>
      </div>
      <div id="lifeskills-form">
      <input
          name="lifeskills link"
          type="text"
          placeholder="Lifeskills Link"
          value={lifeskillsLink}
          onChange={event => {
            setLifeskillsLink(event.target.value);
          }}
          class="form-elements"
      />
      <button onClick={() => onLifeskillsSubmitHandler()}>Submit</button>
      </div>
      <div id="kevin-form">
      <input
          name="kevin link"
          type="text"
          placeholder="Kevin Link"
          value={kevinLink}
          onChange={event => {
            setKevinLink(event.target.value);
          }}
          class="form-elements"
      />
      <button onClick={() => onKevinSubmitHandler()}>Submit</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submission Completed
          </Typography>
          <button onClick={handleClose}>OK</button>
        </Box>  
      </Modal>
    </>
  );
}