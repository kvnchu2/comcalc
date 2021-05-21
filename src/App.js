import React from 'react';
import './App.css';
// import Date from './components/Nihao.js';
import TextField from "@material-ui/core/TextField";
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

  const { convertAddress, routes, events, coordinates, inputDate, handleSearchInput, handleSubmit, fetchTravelAndDistance} = useApplicationData();
  const classes = useStyles();

  const eventsList = events.map( event => {
    return (
      <ul>
        <li>{event.summary}   {event.location}</li>
      </ul>
    )
  })

  const coordinatesList = coordinates.map( coordinate => {
    return (
      <ul>
        <li>{coordinate.position.lat} {coordinate.position.lon}</li>
      </ul>
    )
  })

  const travelMileageList = routes.map( route => {
    return (
      <ul>
        <li>{Math.ceil(route.traveltime / 60)} minutes {Math.ceil(route.mileage / 1000)} kilometers</li>
      </ul>
    )
  })


  return (
    <div className="App">
      <header class="App-header">
        <section id="search-panel">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className={classes.root}
          >
            <div id="search-filter">
              <TextField
                id="outlined-basic"
                label="Enter Date"
                variant="outlined"
                value={inputDate}
                onChange={handleSearchInput}
                className={classes.textfield}
              />
              {/* <SearchBar value={props.value} onChange={props.onChange} onRequestSearch={props.onClick}/> */}

              <label>
                <SearchIcon onClick={handleSubmit} id="search-icon" />
              </label>
            </div>
            {/* <button type="button" onClick={props.onClick}>Submit</button> */}
          </form>
          <button style={{width: 100, height: 50}} onClick={convertAddress}>Fetch Coordinates</button>
          <button style={{width: 100, height: 50}} onClick={fetchTravelAndDistance}>Fetch Travel Time and Distance</button>
        </section>
        <section id="search-results">
          <div>
            {eventsList}
          </div>
          <div>
            {coordinatesList}
          </div>
          <div>
            {travelMileageList}
          </div>
        </section>
      
      </header>
    </div>
  );
}

export default App;