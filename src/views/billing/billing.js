import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from "../../components/nav/navbar.js";
import "./billing.css";
import axios from 'axios';
// import { Link } from '@material-ui/core';

export default function Clients() {

  const [arukahLink, setArukahLink] = useState("");
  const [lifeskillsLink, setLifeskillsLink] = useState("");
  const [kevinLink, setKevinLink] = useState("");
  
  const onArukahSubmitHandler = () => {
    axios.post(`https://travel-calculator-server.herokuapp.com/billing/add/arukah`, {"link": arukahLink})
      .then((result) => {
        console.log(result);
        setArukahLink("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onLifeskillsSubmitHandler = () => {
    axios.post(`https://travel-calculator-server.herokuapp.com/billing/add/lifeskills/`, {"link": lifeskillsLink})
      .then((result) => {
        console.log(result);
        setLifeskillsLink("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onKevinSubmitHandler = () => {
    axios.post(`https://travel-calculator-server.herokuapp.com/billing/add/kevin/`, {"link": kevinLink})
      .then((result) => {
        console.log(result);
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
    </>
  );
}