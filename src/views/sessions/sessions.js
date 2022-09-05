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
      <button onClick={() => sessionsCompleted("WP", "2022-08-08", "2022-09-30")}>Sessions Completed</button>
    </>
  );
}