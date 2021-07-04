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

  const { routes, events, inputDate, handleSearchInput, handleSubmit, fetchTimeDistance} = useApplicationData();
  const classes = useStyles();

  const eventsList = events.map( event => {
    return (
      <ul>
        <li>{event.summary}</li>
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
              <Input placeholder="Enter Date" inputProps={{ 'aria-label': 'description' }} value={inputDate} onChange={handleSearchInput} />
              {/* <SearchBar value={props.value} onChange={props.onChange} onRequestSearch={props.onClick}/> */}

              <button style={{width: 100, height: 50}} onClick={handleSubmit} class="submit-button">Calculate</button>
            </div>
            {/* <button type="button" onClick={props.onClick}>Submit</button> */}
          </form>
          
        </section>
        <section id="search-results">
          <div>
            {eventsList}
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