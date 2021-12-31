import axios from 'axios';

//calculates the "to" date 
const calculateTimeMax = (eventDate) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let maxDay;
  let maxMonth;
  let splitDate = eventDate.split(" ")
  if (Number(eventDate.split(" ")[0]) === 31 && (eventDate.split(" ")[1] === "January" || eventDate.split(" ")[1] === "March" || eventDate.split(" ")[1] === "May" || eventDate.split(" ")[1] === "July" || eventDate.split(" ")[1] === "August" || eventDate.split(" ")[1] === "October" || eventDate.split(" ")[1] === "December")) {
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split(" ")[1]) === 11 ? months[0] : (months.indexOf(eventDate.split(" ")[1]) + 1)]
  } else if (Number(eventDate.split(" ")[0]) === 30 && (eventDate.split(" ")[1] === "February" || eventDate.split(" ")[1] === "April" || eventDate.split(" ")[1] === "June" || eventDate.split(" ")[1] === "September" || eventDate.split(" ")[1] === "November")){
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split(" ")[1]) === 11 ? months[0] : (months.indexOf(eventDate.split(" ")[1]) + 1)]
  } else {
    maxDay = Number(eventDate.split(" ")[0]) + 1;
    maxMonth = splitDate[1];
  }
  splitDate[0] = maxDay;
  splitDate[1] = maxMonth;
  console.log("splitDate", splitDate);
  return splitDate.join(" ");
}

//obtain addresses for all icbc clients
const obtainIcbcAddress = async (icbcArrOne) => {
  console.log("firstMap icbcArrOne", icbcArrOne);
  const eventLocation = await Promise.all(icbcArrOne.map(event => (axios.get(`https://travel-calculator-server.herokuapp.com/client/find/icbc/${event.summary}`)
    .then(({data})=> data))
  ))
  // console.log("eventLocation-from-first-map",eventLocation[0].data.rows[0].address);
  return eventLocation;
}

//obtain addresses for all wsbc clients
const obtainWsbcAddress = async (icbcArrOne) => {
  console.log("firstMap icbcArrOne", icbcArrOne);
  const eventLocation = await Promise.all(icbcArrOne.map(event => (axios.get(`https://travel-calculator-server.herokuapp.com/client/find/wsbc/${event.summary}`)
    .then(({data})=> data))
  ))
  // console.log("eventLocation-from-first-map",eventLocation[0].data.rows[0].address);
  return eventLocation;
}

//fetches coordinates for first batch
const firstMap = async (eventLocations) => {  
  console.log("firstMap eventLocations", eventLocations);
  // const routePromise = await Promise.all( icbcArrOne.map(event => (axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
  // .then(({data})=> data))

  const routePromise = await Promise.all( eventLocations.map(event => (axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.rows[0].address}`)
  .then(({data})=> data))
  
))

  return routePromise
}

//fetches coordinates for second batch 
const secondMap = async(eventLocations) => {
  // const routePromiseTwo = await Promise.all( icbcArrTwo.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event[0].data.rows[0].address}`)
  // .then(({data})=> data)))
  console.log("second map eventlocations", eventLocations);
  const routePromiseTwo = await Promise.all( eventLocations.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.rows[0].address}`)
  .then(({data})=> data)))

  return routePromiseTwo;
}

//sets delay between first fetch and second fetch 
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

//filters out icbc appointments only and sets event information for them
const createEvents = (clientsObject) => {
  let icbcArr = [];
  //filters out undefined clients and parses out their name
  const filterClients = clientsObject.eventLocation.filter(x => x !== undefined).map(x => x.name);

  console.log("filterIcbcClients", filterClients);
  
  clientsObject.eventsObject.forEach(event => {
    const eventSplit = event.location;
    const eventSummary = event.summary;
    const startTime = event.start.dateTime;

    if (filterClients.indexOf(event.summary) >= 0) {
      const icbcObj = {}
      icbcObj["location"] = eventSplit;
      icbcObj["summary"] = eventSummary;
      icbcObj["startTime"] = startTime;
      icbcArr.push(icbcObj)
    }
  })

  return icbcArr;
}


//fetches all appointments - if ICBC, it will return data, if WSBC it will return undefined
const fetchAppointmentsIcbc = async(eventsObject) => {
  const eventLocation = await Promise.all(eventsObject.map(event => (axios.get(`https://travel-calculator-server.herokuapp.com/client/find/icbc/${event.summary}`)
    .then((data)=> data.data.rows[0]))
  ))
  const emptyObj = {};
  emptyObj["eventsObject"] = eventsObject;
  emptyObj["eventLocation"] = eventLocation;
  // console.log("eventLocation-from-first-map",eventLocation[0].data.rows[0].address);
  return emptyObj;
}

//fetches all appointments - if WSBC, it will return data, if ICBC it will return undefined
const fetchAppointmentsWsbc = async(eventsObject) => {
  const eventLocation = await Promise.all(eventsObject.map(event => (axios.get(`https://travel-calculator-server.herokuapp.com/client/find/wsbc/${event.summary}`)
    .then((data)=> data.data.rows[0]))
  ))
  const emptyObj = {};
  emptyObj["eventsObject"] = eventsObject;
  emptyObj["eventLocation"] = eventLocation;
  // console.log("eventLocation-from-first-map",eventLocation[0].data.rows[0].address);
  return emptyObj;
}




export { calculateTimeMax, firstMap, secondMap, wait, createEvents, obtainIcbcAddress, fetchAppointmentsIcbc, fetchAppointmentsWsbc, obtainWsbcAddress };