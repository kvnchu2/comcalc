import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from "../../components/nav/navbar.js";
import axios from 'axios';
import useApplicationData from '../../useApplicationData.js';


export default function Clients() {

  const { sessionsCompleted } = useApplicationData();

  return (
    <>
      <Navbar></Navbar>
      <button onClick={() => sessionsCompleted("GL", "2022-02-08", "2022-05-30")}>Sessions Completed</button>
    </>
  );
}