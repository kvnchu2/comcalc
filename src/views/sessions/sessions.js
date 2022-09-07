import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from "../../components/nav/navbar.js";
import axios from 'axios';
import useApplicationData from '../../useApplicationData.js';


export default function Clients() {

  const { updateSessionsCompleted } = useApplicationData();

  return (
    <>
      <Navbar></Navbar>
      <button onClick={() => updateSessionsCompleted()}>Sessions Completed</button>
    </>
  );
}