import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmitHandler = () => {
    axios.post("https://travel-calculator-server.herokuapp.com/client/edit/address", {"address": address, "id": props.client.id})
      .then((result) => {
        console.log(result);
        setAddress("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter New Address
          </Typography>
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
            name="address"
            type="text"
            placeholder="Address"
            value={address}
            onChange={event => {
              setAddress(event.target.value);
            }}
            class="form-elements"
            />
            <button onClick={() => onSubmitHandler()}>Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}