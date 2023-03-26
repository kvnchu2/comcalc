import axios from 'axios';
import { useState } from 'react';
import { calculateTimeMax, firstMap, secondMap, wait, createEvents, obtainIcbcAddress, obtainWsbcAddress, fetchAppointmentsIcbc, fetchAppointmentsWsbc } from './helpers.js';



export default function useApplicationData() {
const [events, setEvents] = useState([]);
const [inputDate, setInputDate] = useState("");
const [routes, setRoutes] = useState([]);
const [travelTime, setTravelTime] = useState(0);
const [mileage, setMileage] = useState(0);
const [routesTwo, setRoutesTwo] = useState([]);
const [results, setResults] = useState("");


const [wsbcRoutes, setWsbcRoutes] = useState([]);
const [wsbcTravelTime, setWsbcTravelTime] = useState(0);
const [wsbcMileage, setWsbcMileage] = useState(0);

const [notScheduledList, setNotScheduledList] = useState([]);

const handleSearchInput = (e) => {
  setInputDate(e.target.value);
};
const handleIcbcSubmit = (e, billingLinks) => {
  e.preventDefault();
  setRoutes([]);
  setRoutesTwo([]);
  setTravelTime(0);
  setMileage(0);
  setWsbcRoutes([]);
  setWsbcTravelTime(0);
  setWsbcMileage(0);
  setResults("loading");
  handleIcbcClick(inputDate);
  setInputDate("");

  window.open(billingLinks[0].link, '_blank');
  window.open(billingLinks[1].link,'_blank');
  window.open(billingLinks[2].link,'_blank');
};

const handleWsbcSubmit = (e) => {
  e.preventDefault();
  setRoutes([]);
  setRoutesTwo([]);
  setTravelTime(0);
  setMileage(0);
  setResults("loading");
  handleWsbcClick(inputDate)
  setInputDate("");
};

const calculateICBCRouteTwo = (coordinates, icbcArr) => {
  console.log("icbcArrTwo", icbcArr)
  for(let y = 0; y < coordinates.length; y++) {
    if (y !== coordinates.length - 1) {
      axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=${process.env.["REACT_APP_TOM_TOM_KEY"]}&departAt=${icbcArr[y].startTime}&traffic=true`)
        .then((result) => {
          const travelMileageObj = {};
          travelMileageObj["mileage"] = result.data.routes[0].summary.lengthInMeters;
          travelMileageObj["traveltime"] = result.data.routes[0].summary.travelTimeInSeconds;
          travelMileageObj["events"] = icbcArr[y];
          travelMileageObj["order"] = y;
          
          setRoutesTwo(prevState => ([...prevState, travelMileageObj]));
          setTravelTime(prevState => (prevState + result.data.routes[0].summary.travelTimeInSeconds))
          setMileage(prevState => (prevState + result.data.routes[0].summary.lengthInMeters))
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      const eventsObj = {};
      eventsObj["events"] = icbcArr[y];
      eventsObj["order"] = y;
      setRoutesTwo(prevState => ([...prevState, eventsObj]));
    }
  }
}
//https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=${process.env.TOM_TOM_KEY}&departAt=${icbcArr[y].startTime}&traffic=true
//https://travel-calculator-server.herokuapp.com/travel/calculateRoute/${coordinates[y].results[0].position.lat}/${coordinates[y].results[0].position.lon}/${coordinates[y+1].results[0].position.lat}/${coordinates[y+1].results[0].position.lon}/${icbcArr[y].startTime}

const calculateICBCRoute = (coordinates, icbcArr) => {

  console.log("sample icbcArr", icbcArr);
  console.log("sample coordinates", coordinates)
  for(let y = 0; y < coordinates.length; y++) {
    if (y !== coordinates.length - 1) {
      axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=${process.env["REACT_APP_TOM_TOM_KEY"]}&departAt=${icbcArr[y].startTime}&traffic=true`)
        .then((result) => {
          const travelMileageObj = {};
          travelMileageObj["mileage"] = result.data.routes[0].summary.lengthInMeters;
          travelMileageObj["traveltime"] = result.data.routes[0].summary.travelTimeInSeconds;
          travelMileageObj["events"] = icbcArr[y];
          travelMileageObj["order"] = y;
          
          setRoutes(prevState => ([...prevState, travelMileageObj]));
          setTravelTime(prevState => (prevState + result.data.routes[0].summary.travelTimeInSeconds))
          setMileage(prevState => (prevState + result.data.routes[0].summary.lengthInMeters))
        })
        .catch((error) => {
          console.log(error);
        })
    } 
  }
}

var gapi = window.gapi
/* 
  Update with your own Client Id and Api key 
*/
var CLIENT_ID = process.env["REACT_APP_CLIENT_ID"]
var API_KEY = process.env["REACT_APP_API_KEY"]
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"


const handleIcbcClick = function(eventDate){

  console.log("eventDate", eventDate);
  const inputDate = eventDate.split(" ");
  const hyphenatedDate = inputDate.join("-");

  axios.get(`https://travel-calculator-server.onrender.com/client/listevents/${hyphenatedDate}`)
      .then(response => {
        const eventsObject = response.data;
        
        const startTime = new Date(eventsObject[0].start.dateTime);
        startTime.setMinutes(new Date(eventsObject[0].start.dateTime).getMinutes() - 30);
        console.log("startTime", startTime);
        eventsObject.splice(0,0, {summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada", start: {dateTime: startTime.toISOString()}})
        eventsObject.push({summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada", start: {dateTime: eventsObject[eventsObject.length - 1].start.dateTime}})
        return eventsObject;
      })
      .then((eventsObject) => {
        console.log("eventsObject", eventsObject);
        let icbcClients = fetchAppointmentsIcbc(eventsObject);
        console.log("icbcClients", icbcClients);
        return icbcClients;
      })
      .then((clientsObject) => {

        let icbcArr = createEvents(clientsObject);
        console.log("this icbcArr length", icbcArr.length);
        //if icbcArr.length is > 5, then divide icbcArr into two 
        let icbcArrOne;
        let icbcArrTwo;
        if (icbcArr.length % 2 === 0) {
          icbcArrOne = icbcArr.slice(0,((icbcArr.length/2) + 1));
          icbcArrTwo = icbcArr.slice(icbcArr.length/2);
        } else {
          icbcArrOne = icbcArr.slice(0,Math.ceil(icbcArr.length/2));
          icbcArrTwo = icbcArr.slice(Math.floor(icbcArr.length/2));
        }

        //then do return Promise.all(icbcArrOne.map) let it resolve then Promise.all(icbcArrTwo.map)
        //within each Promise.all, set the coordinates State 

        console.log("icbcArrOne", icbcArrOne);
        console.log("icbcArrTwo", icbcArrTwo);
        
        return obtainIcbcAddress(icbcArrOne)
          .then((eventLocations) => {
            // console.log("eventLocations", eventLocations[0].rows[0].address)
            return firstMap(eventLocations);
          })
          .then((coordinates) => {
            console.log("afterFirstMap coordinates", coordinates);
            calculateICBCRoute(coordinates, icbcArrOne);
          //proceed with helper function that loops from beginning element of coordinates array to the last element
          //calculateICBCRoute(coordinates, icbcArr)
          })    
          .then(async() => await wait(5000))
          .then(() => {
            return obtainIcbcAddress(icbcArrTwo);
          })
          .then((eventLocations) => {
            return secondMap(eventLocations);
          })
          .then((coordinates) => {
            calculateICBCRouteTwo(coordinates, icbcArrTwo);
            handleWsbcClick(eventDate);
          })  
          .catch((error) => {
            console.log(error);
          })
      })

    

}

const handleWsbcClick = function(eventDate){
  
  console.log("eventDate", eventDate);
  const inputDate = eventDate.split(" ");
  const hyphenatedDate = inputDate.join("-");

  axios.get(`https://travel-calculator-server.onrender.com/client/listevents/${hyphenatedDate}`)
      .then(response => {
        const eventsObject = response.data;
        
        const startTime = new Date(eventsObject[0].start.dateTime);
        startTime.setMinutes(new Date(eventsObject[0].start.dateTime).getMinutes() - 30);
        console.log("startTime", startTime);
        eventsObject.splice(0,0, {summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada", start: {dateTime: startTime.toISOString()}})
        eventsObject.push({summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada", start: {dateTime: eventsObject[eventsObject.length - 1].start.dateTime}})
        return eventsObject;
      })
      .then((eventsObject) => {
        let WsbcClients = fetchAppointmentsWsbc(eventsObject);
        return WsbcClients;
      })
      .then((clientsObject) => {
        console.log("clientsObject", clientsObject);
        let wsbcArr = createEvents(clientsObject);

          return obtainWsbcAddress(wsbcArr)
            .then((wsbcAddress)=> {
              console.log("wsbcAddress", wsbcAddress);
              return Promise.all( wsbcAddress.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.rows[0].address}`)
                .then(({data})=> data))
              )
            })
            .then((coordinates) => {
              console.log("coordinates", coordinates);

              for(let y = 0; y < coordinates.length; y++) {
                if (y !== coordinates.length - 1) {
                  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv`)
                    .then((result) => {
                      const travelMileageObj = {};
                      travelMileageObj["mileage"] = result.data.routes[0].summary.lengthInMeters;
                      travelMileageObj["traveltime"] = result.data.routes[0].summary.travelTimeInSeconds;
                      travelMileageObj["events"] = wsbcArr[y];
                      travelMileageObj["order"] = y;
                      
                      setWsbcRoutes(prevState => ([...prevState, travelMileageObj]));
                      setWsbcTravelTime(prevState => (prevState + result.data.routes[0].summary.travelTimeInSeconds))
                      setWsbcMileage(prevState => (prevState + result.data.routes[0].summary.lengthInMeters))
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                } else {
                  const eventsObj = {};
                  eventsObj["events"] = wsbcArr[y];
                  eventsObj["order"] = y;
                  setWsbcRoutes(prevState => ([...prevState, eventsObj]));
                }
                
              }

              setResults("show");

            })
            



      })



 
}


const sessionsCompleted = function(name, startDate, endDate) {
  axios.get(`https://travel-calculator-server.onrender.com/client/sessionscompleted/${name}/${startDate}/${endDate}`)
  .then((results) => {
    const sessionsCompleted = results.data.length;

    console.log("hit")
    console.log("sessions completed", sessionsCompleted);
    return axios.post(`https://comcalc-server.herokuapp.com/session/completed/${name}/${sessionsCompleted}`);
  });
  
};


const updateSessionsCompleted = async() => {
  //query array of names, start_date, end_date 
  const clientDates = await axios.get(`https://comcalc-server.herokuapp.com/session/clients`);

  console.log("hello");
  console.log(clientDates);

  

        for (let x = 0; x < clientDates.data.rows.length; x++) {
          if (clientDates.data.rows[x]["start_date"] && clientDates.data.rows[x]["end_date"]) {
            console.log("made it");
            sessionsCompleted(clientDates.data.rows[x].name, clientDates.data.rows[x]["start_date"], clientDates.data.rows[x]["end_date"])
          }
        }

  //loop through array, and pass in names, start_date, end_date into sessionsCompleted function

}

const getClientsNotScheduled = (date, dayOfWeek)=> {

  const getNextMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const daysUntilMonday = day === 0 ? 1 : 8 - day;
    const nextMonday = new Date(today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
    return nextMonday;
  }

  const compareArrays = (arr1, arr2) => {
    let uniqueElements = [];
  
    for (let i = 0; i < arr1.length; i++) {
      if (!arr2.includes(arr1[i])) {
        uniqueElements.push(arr1[i]);
      }
    }
  
    for (let i = 0; i < arr2.length; i++) {
      if (!arr1.includes(arr2[i])) {
        uniqueElements.push(arr2[i]);
      }
    }
    return uniqueElements;
  }
  
  
  console.log("test")
  const startDate = getNextMonday();

  const endDate = new Date();

  endDate.setDate(startDate.getDate() + 7)

  console.log(startDate);
  console.log(endDate);

  axios.get(`https://travel-calculator-server.onrender.com/client/clientsnotscheduled/${startDate.toString().split(" ").slice(1,4).join("-")}/${endDate.toString().split(" ").slice(1,4).join("-")}`)
    .then((results) => {
      
      const clientsScheduled = results.data.map(x => x.summary);
      console.log("clientsNotScheduled", clientsScheduled);

      axios.get("https://comcalc-server.herokuapp.com/client/all")
      .then((result) => {
        const allClients = result.data.map(x => x.name);
        console.log(allClients);

        const clientsNotScheduled = compareArrays(allClients, clientsScheduled);
        console.log("clientscompareArrays", clientsNotScheduled);

        setNotScheduledList(clientsNotScheduled);
      })
      
    })
}

return { getClientsNotScheduled, notScheduledList, updateSessionsCompleted, sessionsCompleted, wsbcRoutes, wsbcTravelTime, wsbcMileage, routesTwo, travelTime, routes, events, inputDate, handleSearchInput, handleIcbcSubmit, handleWsbcSubmit, mileage, results}
};
