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
    width: "50%",
  },
}));

function App() {

  const { convertAddress, events, coordinates, inputDate, handleSearchInput, handleSubmit, fetchTravelAndDistance} = useApplicationData();
  const classes = useStyles();

  const eventsList = events.map( event => {
    return (
      <ul>
        <li>{event.summary}   {event.location}</li>
      </ul>
    )
  })

  const coordinatesList = coordinates.map( coordinate => {
    console.log("coordinate", coordinates);
    return (
      <ul>
        <li>{coordinate.position.lat} {coordinate.position.lon}</li>
      </ul>
    )
  })

 

  return (
    <div className="App">
      <header className="App-header">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.root,"searchbar-with-icon"}
        >
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
          {/* <button type="button" onClick={props.onClick}>Submit</button> */}
        </form>
        <button style={{width: 100, height: 50}} onClick={convertAddress}>Fetch Coordinates</button>
        <button style={{width: 100, height: 50}} onClick={fetchTravelAndDistance}>Fetch Travel Time and Distance</button>
      <div>
        {eventsList}
      </div>
      <div>
        {coordinatesList}
      </div>
      </header>
    </div>
  );
}

export default App;