import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from "../../components/nav/navbar.js";
import axios from 'axios';
import { Link } from '@material-ui/core';

export default function Clients() {

  const [link, setLink] = useState("");
  
  const onArukahSubmitHandler = (link) => {
    axios.post(`https://travel-calculator-server.herokuapp.com/billing/add/arukah/${link}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Navbar></Navbar>
      <input
          name="link"
          type="text"
          placeholder="Link"
          value={link}
          onChange={event => {
            setLink(event.target.value);
          }}
          class="form-elements"
      />
      <button onClick={onArukahSubmitHandler(link)}>Submit</button>
    </>
  );
}