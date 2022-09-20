import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import DateInput from "../../components/home/DateInput.js";
import Results from "../../components/home/results/index.js";
import EndDateTable from "../../components/home/results/endDateTable.js";
import Navbar from "../../components/nav/navbar.js";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import useApplicationData from '../../useApplicationData.js';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textfield: {
    width: "100%",
  },
}));

export default function Home() {

  const [clientEndDate, setClientEndDate] = useState([]);

  const { wsbcRoutes, wsbcTravelTime, wsbcMileage, routesTwo, travelTime, routes, events, inputDate, handleSearchInput, handleIcbcSubmit, handleWsbcSubmit, mileage, results } = useApplicationData();
  const classes = useStyles();

  const combinedList = routes.sort(function(a,b) { return a.order - b.order}).map( route => {
    if (isNaN(route.traveltime)) {
      return (
        <tr>
          <td>{route.events.summary}</td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{route.events.summary}</td>
          <td>{Math.ceil(route.traveltime / 60)} minutes {Math.ceil(route.mileage / 1000)} kilometers</td>
        </tr>
      )
    }
  })

  const combinedListTwo = routesTwo.sort(function(a,b) { return a.order - b.order}).map( route => {
    if (isNaN(route.traveltime)) {
      return (
        <tr>
          <td>{route.events.summary}</td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{route.events.summary}</td>
          <td>{Math.ceil(route.traveltime / 60)} minutes {Math.ceil(route.mileage / 1000)} kilometers</td>
        </tr>
      )
    }
  })

  useEffect(() => {

    Promise.all([
      axios.get("https://travel-calculator-server.herokuapp.com/client/find/enddate")
    ]).then((all) => {
      
      setClientEndDate(all[0].data.rows);
     
    });
  }, []);

  // useEffect(() => {

  //   Promise.all([
  //     axios.get("https://travel-calculator-server.herokuapp.com/client/find/enddate"),
  //     axios.get('http://localhost:8001/api/appointments'),
  //     axios.get('http://localhost:8001/api/interviewers'),
  //   ]).then((all) => {
      
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  //   });
  // }, [])

  return (
    <div className="App">
      <Navbar></Navbar>
      <header class="App-header">
        <div id="end-date-table">
          <EndDateTable clientEndDate={clientEndDate}></EndDateTable>
        </div>
        <section id="search-panel">
          <DateInput inputDate={inputDate} handleSearchInput={handleSearchInput}></DateInput>
          <div id="button-section">
          <Button variant="contained" color="primary" style={{width: 100, height: 50}} onClick={handleIcbcSubmit}>
            Calculate
          </Button>
          {/* <Button variant="contained" color="secondary" style={{width: 100, height: 50}} onClick={handleWsbcSubmit} >
            Calculate WSBC
          </Button> */}
          </div>
        </section>
        <Results results={results} wsbcTravelTime={wsbcTravelTime} wsbcMileage={wsbcMileage} wsbcRoutes={wsbcRoutes} combinedList={combinedList} combinedListTwo={combinedListTwo} travelTime={travelTime} mileage={mileage} routes={routes} routesTwo={routesTwo}/>
      </header>
    </div>
  );
}