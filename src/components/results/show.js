import React from "react";

export default function Show(props) {
  return (
    <>
    <section id="search-results">
      <table class="results-table">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Travel Time/Duration</th>
          </tr>
        </thead>
        <tbody>
          {props.combinedList}
          {props.combinedListTwo}
        </tbody>
      </table>
    </section>
    <section id="total-travel-calculation">
      <label>Total Travel Time</label>
      <div>
        {props.travelTime} seconds
      </div>
      <label>Total Mileage</label>
      <div>
        {props.mileage} meters
      </div>
    </section>
    <section id="travel-calculation">
      <label>Travel Time per Client</label>
      <div>
        {((props.travelTime/((props.routes.length + props.routesTwo.length) - 2))/60)/60}
      </div>
      <label>Mileage per Client</label>
      <div>
        {((props.mileage/((props.routes.length + props.routesTwo.length) - 2))/1000)}
      </div>
    </section>
    </>
  )
};
