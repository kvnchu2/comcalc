import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import DateInput from "../../components/home/DateInput.js";
import Results from "../../components/home/results/index.js";
import EndDateTable from "../../components/home/results/endDateTable.js";
import SessionsWarningTable from "../../components/home/results/sessionsWarningTable.js";
import NotScheduledTable from "../../components/home/results/notScheduledTable.js";
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

  const [sessionsWarning, setSessionsWarning] = useState([]);

  const [billingLinks, setBillingLinks] = useState([]);

  const { getClientsNotScheduled, notScheduledList, updateSessionsCompleted, wsbcRoutes, wsbcTravelTime, wsbcMileage, routesTwo, travelTime, routes, events, inputDate, handleSearchInput, handleIcbcSubmit, handleWsbcSubmit, mileage, results } = useApplicationData();
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
      axios.get("https://comcalc-server.herokuapp.com/client/find/enddate"), 
      axios.get("https://comcalc-server.herokuapp.com/client/find/sessionswarning"),
      axios.get("https://comcalc-server.herokuapp.com/billing/all")
    ]).then((all) => {
      getClientsNotScheduled();
      updateSessionsCompleted();
      setClientEndDate(all[0].data.rows);
      setSessionsWarning(all[1].data.rows);
      setBillingLinks(all[2].data.rows);
    });
  }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      <header class="App-header">
        <div id="end-date-table">
          <EndDateTable clientEndDate={clientEndDate}></EndDateTable>
          <SessionsWarningTable sessionsWarning={sessionsWarning}></SessionsWarningTable>
          <NotScheduledTable notScheduledList={notScheduledList}></NotScheduledTable>
        </div>
        <section id="search-panel">
          <DateInput inputDate={inputDate} handleSearchInput={handleSearchInput}></DateInput>
          <div id="button-section">
          <Button variant="contained" color="primary" style={{width: 100, height: 50}} onClick={(event) => handleIcbcSubmit(event, billingLinks)}>
            Calculate
          </Button>
          </div>
        <Results results={results} wsbcTravelTime={wsbcTravelTime} wsbcMileage={wsbcMileage} wsbcRoutes={wsbcRoutes} combinedList={combinedList} combinedListTwo={combinedListTwo} travelTime={travelTime} mileage={mileage} routes={routes} routesTwo={routesTwo}/>
        </section>
      </header>
    </div>
  );
}