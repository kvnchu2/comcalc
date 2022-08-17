import React from "react";
import TravelMileageTable from "./travelMileageTable";

export default function Show(props) {
  return (
    <>
    <section id="search-results">
      <div class="results-table">
        <TravelMileageTable wsbcRoutes={props.wsbcRoutes} routes={props.routes}  routesTwo={props.routesTwo}></TravelMileageTable>
      </div>
    </section>
    <section id="total-travel-calculation">
      <label>Total Wsbc Travel Time</label>
      <div>
        {props.wsbcTravelTime} seconds
      </div>
      <label>Total Wsbc Mileage</label>
      <div>
        {props.wsbcMileage} meters
      </div>


      <label> Total Icbc Travel Time</label>
      <div>
        {props.TravelTime} seconds
      </div>
      <label> Total Icbc Mileage </label>
      <div>
        {props.Mileage} meters
      </div>
    </section>
    <section id="travel-calculation">
      <label>Travel Time per Wsbc Client</label>
      <div>
        {((props.wsbcTravelTime/((props.wsbcRoutes.length)))/60)/60}
      </div>
      <label>Mileage per Wsbc Client</label>
      <div>
        {((props.wsbcMileage/((props.wsbcRoutes.length)))/1000)}
      </div>

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
