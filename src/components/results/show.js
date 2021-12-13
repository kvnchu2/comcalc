import React from "react";
import TravelMileageTable from "./travelMileageTable";

export default function Show(props) {
  return (
    <>
    <section id="search-results">
      <div class="results-table">
        <TravelMileageTable routes={props.routes} routesTwo={props.routesTwo}></TravelMileageTable>
      </div>
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
