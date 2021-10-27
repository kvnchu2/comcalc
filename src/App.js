import React from 'react';
import './App.css';
import DateInput from "./components/DateInput.js"
import Results from "./components/results/index.js"
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import useApplicationData from './useApplicationData.js';


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

function App() {

  const { routesTwo, travelTime, routes, events, inputDate, handleSearchInput, handleIcbcSubmit, handleWsbcSubmit, mileage } = useApplicationData();
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

 

  return (
    <div className="App">
      <header class="App-header">
        <section id="search-panel">
          <DateInput inputDate={inputDate} handleSearchInput={handleSearchInput}></DateInput>
          <div id="button-section">
          <Button variant="contained" color="primary" style={{width: 100, height: 50}} onClick={handleIcbcSubmit}>
            Calculate ICBC
          </Button>
          <Button variant="contained" color="secondary" style={{width: 100, height: 50}} onClick={handleWsbcSubmit} >
            Calculate WSBC
          </Button>
          </div>
        </section>
        <Results combinedList={combinedList} combinedListTwo={combinedListTwo} travelTime={travelTime} mileage={mileage} routes={routes} routesTwo={routesTwo}/>
      </header>
    </div>
  );
}

export default App;