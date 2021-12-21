import React from "react";

export default function DateInput(props) {
  return (
    <form
      autoComplete="off"
    >
      <div id="search-filter">
        <label>Enter Date</label>
        <input placeholder="Enter Date" inputProps={{ 'aria-label': 'description' }} value={props.inputDate} onChange={props.handleSearchInput}></input>
      </div>
    </form>
  )
};

