import axios from 'axios';

//calculates the "to" date 
const calculateTimeMax = (eventDate) => {
  let splitDate = eventDate.split(" ")
  const maxDay = Number(eventDate.split(" ")[0]) + 1;
  splitDate[0] = maxDay;
  return splitDate.join(" ");
}

//fetches coordinates for first batch
const firstMap = async (icbcArrOne) => {
  const routePromise = await Promise.all( icbcArrOne.map(event => (axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
  .then(({data})=> data))
  
))

return routePromise
}

//fetches coordinates for second batch 
const secondMap = async(icbcArrTwo) => {
  
  const routePromiseTwo = await Promise.all( icbcArrTwo.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event.location}`)
  .then(({data})=> data)))

  return routePromiseTwo;
}

//sets delay between first fetch and second fetch 
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const icbcEvents = (eventsObject) => {
  let icbcArr = [];
  
  eventsObject.forEach(event => {
    const eventSplit = event.location
    const eventSummary = event.summary 
    
    if (eventSummary.split(" ")[0] === "ICBC" || eventSummary.split(" ")[0] === "Icbc" || eventSummary === "home") {
      const icbcObj = {}
      icbcObj["location"] = eventSplit;
      icbcObj["summary"] = eventSummary;
      icbcArr.push(icbcObj)
    }
  })

  return icbcArr;
}


export { calculateTimeMax, firstMap, secondMap, wait, icbcEvents };