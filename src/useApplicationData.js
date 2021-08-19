import axios from 'axios';
import {useState} from 'react';


export default function useApplicationData() {
const [events, setEvents] = useState([]);
const [inputDate, setInputDate] = useState("");
const [routes, setRoutes] = useState([]);
const [travelTime, setTravelTime] = useState(0);
const [mileage, setMileage] = useState(0);
const [routesTwo, setRoutesTwo] = useState([]);
const [coordinates, setCoordinates] = useState([]);

const handleSearchInput = (e) => {
  setInputDate(e.target.value);
};
const handleIcbcSubmit = (e) => {
  e.preventDefault();
  handleIcbcClick(inputDate)
  setInputDate("");
};

const handleWsbcSubmit = (e) => {
  e.preventDefault();
  handleWsbcClick(inputDate)
  setInputDate("");
};

const calculateICBCRouteTwo = (coordinates, icbcArr) => {
  for(let y = 0; y < coordinates.length; y++) {
    if (y !== coordinates.length - 1) {
      axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv`)
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


const calculateICBCRoute = (coordinates, icbcArr) => {
  for(let y = 0; y < coordinates.length; y++) {
    if (y !== coordinates.length - 1) {
      axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv`)
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
    } else {
      const eventsObj = {};
      eventsObj["events"] = icbcArr[y];
      eventsObj["order"] = y;
      setRoutes(prevState => ([...prevState, eventsObj]));
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
  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })

    gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    gapi.auth2.getAuthInstance().signIn()
    .then(() => {
      let splitDate = eventDate.split(" ")
      const maxDay = Number(eventDate.split(" ")[0]) + 1;
      splitDate[0] = maxDay;
     const maxDate = splitDate.join(" ");
      
      // get events
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date(`${eventDate} 07:00 UTC`)).toISOString(),
        'timeMax': (new Date(`${maxDate} 6:59 UTC`)).toISOString(),
        'showDeleted': false,
        'singleEvents': true, //shows recurring events
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        const eventsObject = response.result.items
        eventsObject.splice(0,0, {summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada"})
        eventsObject.push({summary: "home", location: "6568 Brooks St Vancouver, BC V5S 3J5, Canada"})
        console.log("eventsObject", eventsObject)
        // setEvents(eventsObject);
        return eventsObject
      }).then((eventsObject) => {
        let icbcArr = [];
        let wsbcArr = [];
        console.log("eventsObject", eventsObject)
          eventsObject.forEach(event => {
            const eventSplit = event.location
            const eventSummary = event.summary 
            
            if (eventSummary.split(" ")[0] === "ICBC" || eventSummary.split(" ")[0] === "Icbc" || eventSummary === "home") {
              const icbcObj = {}
              icbcObj["location"] = eventSplit;
              icbcObj["summary"] = eventSummary;
              icbcArr.push(icbcObj)
            } else {
              wsbcArr.push(eventSplit)
            }
          })

          //if icbcArr.length is > 5, then divide icbcArr into two 
          let icbcArrOne;
          let icbcArrTwo;
          if (icbcArr.length > 5) {
            icbcArrOne = icbcArr.slice(0,5)
            icbcArrTwo = icbcArr.slice(4)
          } else {
            icbcArrOne = icbcArr
          }
          //then do return Promise.all(icbcArrOne.map) let it resolve then Promise.all(icbcArrTwo.map)
          //within each Promise.all, set the coordinates State 

          const firstMap = async () => {
            const routePromise = await Promise.all( icbcArrOne.map(event => (axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
            .then(({data})=> data))
            
          ))
          
          return routePromise
        }


          const secondMap = async() => {
            
            const routePromiseTwo = await Promise.all( icbcArrTwo.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
            .then(({data})=> data)))

            return routePromiseTwo;
          }

        const wait = (ms) => new Promise((res) => setTimeout(res, ms));
        
        return firstMap()
        .then((coordinates) => {
              
          
          calculateICBCRoute(coordinates, icbcArrOne);
        
        //proceed with helper function that loops from beginning element of coordinates array to the last element
        //calculateICBCRoute(coordinates, icbcArr)
      })    
            .then(async() => await wait(5000))
            .then(() => {
              console.log("got through one")

              
              //if coordinates.length > 5, proceed with helper function that loops through coordinates from 5 onwards
              //else return
              
              return secondMap();
            })
            .then((coordinates) => {
              console.log("secondmap coordinates", coordinates)
          
              calculateICBCRouteTwo(coordinates, icbcArrTwo);
            
            //proceed with helper function that loops from beginning element of coordinates array to the last element
            //calculateICBCRoute(coordinates, icbcArr)
          })  
            .catch(() => {
              
              return secondMap();
            })
            



      })

    })
  })
}

const handleWsbcClick = function(eventDate){
  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })

    gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    gapi.auth2.getAuthInstance().signIn()
    .then(() => {
      let splitDate = eventDate.split(" ")
      const maxDay = Number(eventDate.split(" ")[0]) + 1;
      splitDate[0] = maxDay;
     const maxDate = splitDate.join(" ");
      
      // get events
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date(`${eventDate} 07:00 UTC`)).toISOString(),
        'timeMax': (new Date(`${maxDate} 6:59 UTC`)).toISOString(),
        'showDeleted': false,
        'singleEvents': true, //shows recurring events
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        const eventsObject = response.result.items
        eventsObject.splice(0,0, {summary: "home", location: "V5S 3J5"})
        eventsObject.push({summary: "home", location: "V5S 3J5"})
        console.log("eventsObject", eventsObject)
        // setEvents(eventsObject);
        return eventsObject
      }).then((eventsObject) => {
        
        let wsbcArr = [];
        console.log("eventsObject", eventsObject)
          eventsObject.forEach(event => {
            const eventSplit = event.location
            const eventSummary = event.summary
            console.log("eventSplit", eventSplit);
            if (eventSummary.split(" ")[0] === "Wsbc" || eventSummary === "home") {
              const icbcObj = {}
              icbcObj["location"] = eventSplit;
              icbcObj["summary"] = eventSummary;
              wsbcArr.push(icbcObj)
            } 
          })

          return Promise.all( wsbcArr.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
            .then(({data})=> data))
        )
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
                      
                      setRoutes(prevState => ([...prevState, travelMileageObj]));
                      setTravelTime(prevState => (prevState + result.data.routes[0].summary.travelTimeInSeconds))
                      setMileage(prevState => (prevState + result.data.routes[0].summary.lengthInMeters))
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                } else {
                  const eventsObj = {};
                  eventsObj["events"] = wsbcArr[y];
                  eventsObj["order"] = y;
                  setRoutes(prevState => ([...prevState, eventsObj]));
                }
                
              }


            })
            



      })



    })
  })
}

return { routesTwo, travelTime, routes, events, inputDate, handleSearchInput, handleIcbcSubmit, handleWsbcSubmit, mileage}
};
