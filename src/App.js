import React from 'react';
import './App.css';
// import Date from './components/Nihao.js';
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import useApplicationData from './useApplicationData.js';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
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
          <form
            autoComplete="off"
           
            className={classes.root}
          >
            <div id="search-filter">
              <Input placeholder="Enter Date" inputProps={{ 'aria-label': 'description' }} value={inputDate} onChange={handleSearchInput} />
              {/* <SearchBar value={props.value} onChange={props.onChange} onRequestSearch={props.onClick}/> */}

              
            </div>
            {/* <button type="button" onClick={props.onClick}>Submit</button> */}
          </form>
          <button style={{width: 100, height: 50}} onClick={handleIcbcSubmit} class="submit-button">Calculate ICBC</button>
          <button style={{width: 100, height: 50}} onClick={handleWsbcSubmit} class="submit-button">Calculate WSBC</button>
        </section>
        <section id="search-results">
          {/* <div>
            {eventsList}
          </div>
          <div>
            {travelMileageList}
          </div> */}


          <table class="table">
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Travel Time/Duration</th>
              </tr>
            </thead>
            <tbody>
              {combinedList}
              {combinedListTwo}
            </tbody>
          </table>
          <div>
            {travelTime} seconds
          </div>
          <div>
            {mileage} meters
          </div>
        </section>
          <div>
            {((travelTime/(routes.length - 2))/60)/60}
          </div>
          <div>
            {(mileage/(routes.length - 2)/1000)}
          </div>
         
      
      </header>
    </div>
  );
}

export default App;