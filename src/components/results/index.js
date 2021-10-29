import React from "react";
import Show from "./show.js"

export default function Results(props) {
  return (
    <>
    <Show combinedList={props.combinedList} combinedListTwo={props.combinedListTwo} travelTime={props.travelTime} mileage={props.mileage} routes={props.routes} routesTwo={props.routesTwo}/>
    </>
  )
};
