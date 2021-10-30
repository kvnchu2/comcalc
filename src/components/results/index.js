import React from "react";
import Show from "./show.js"
import Loading from "./loading.js"

const LOADING = "loading";

export default function Results(props) {
  return (
    <>
    {/* <Show combinedList={props.combinedList} combinedListTwo={props.combinedListTwo} travelTime={props.travelTime} mileage={props.mileage} routes={props.routes} routesTwo={props.routesTwo}/> */}
    {props.results === LOADING && <Loading/>}
    </>
  )
};


//{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}