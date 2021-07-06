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

  const { routes, events, inputDate, handleSearchInput, handleSubmit} = useApplicationData();
  const classes = useStyles();

  const combinedList = routes.slice(0).reverse().map( route => {
    if (isNaN(route.traveltime)) {
      console.log("route hitttttt")
      return (
        <tr>
          <td>{route.events.summary}</td>
        </tr>
      )
    } else {
      console.log("route of course hitttttt")
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
            </tbody>
          </table>
        </section>
      
      </header>
    </div>
  );
}

export default App;