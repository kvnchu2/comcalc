import React from "react";
import Show from "./show.js"
import Loading from "./loading.js"

const LOADING = "loading";
const SHOW = "show";

export default function Results(props) {
  return (
    <>
    {props.results === LOADING && <Loading/>}
    {props.results === SHOW && <Show combinedList={props.combinedList} combinedListTwo={props.combinedListTwo} travelTime={props.travelTime} mileage={props.mileage} routes={props.routes} routesTwo={props.routesTwo}/> }
    </>
  )
};