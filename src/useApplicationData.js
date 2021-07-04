import axios from 'axios';
import {useState} from 'react';


export default function useApplicationData() {
const [events, setEvents] = useState([]);
const [inputDate, setInputDate] = useState("");
const [routes, setRoutes] = useState([]);

const handleSearchInput = (e) => {
  setInputDate(e.target.value);
};
const handleSubmit = (e) => {
  e.preventDefault();
  handleClick(inputDate)
  setInputDate("");
};

var gapi = window.gapi
/* 
  Update with your own Client Id and Api key 
*/
var CLIENT_ID = process.env["REACT_APP_CLIENT_ID"]
var API_KEY = process.env["REACT_APP_API_KEY"]
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"


const handleClick = function(eventDate){
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
      
      // var event = {
      //   'summary': 'Awesome Event!',
      //   'location': '800 Howard St., San Francisco, CA 94103',
      //   'description': 'Really great refreshments',
      //   'start': {
      //     'dateTime': '2020-06-21T09:00:00-07:00',
      //     'timeZone': 'America/Los_Angeles'
      //   },
      //   'end': {
      //     'dateTime': '2020-06-21T17:00:00-07:00',
      //     'timeZone': 'America/Los_Angeles'
      //   },
      //   'recurrence': [
      //     'RRULE:FREQ=DAILY;COUNT=2'
      //   ],
      //   'attendees': [
      //     {'email': 'lpage@example.com'},
      //     {'email': 'sbrin@example.com'}
      //   ],
      //   'reminders': {
      //     'useDefault': false,
      //     'overrides': [
      //       {'method': 'email', 'minutes': 24 * 60},
      //       {'method': 'popup', 'minutes': 10}
      //     ]
      //   }
      // }

      // var request = gapi.client.calendar.events.insert({
      //   'calendarId': 'primary',
      //   'resource': event,
      // })

      // request.execute(event => {
      //   console.log(event)
      //   window.open(event.htmlLink)
      // })

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
        // setEvents(eventsObject);
        return eventsObject
      }).then((eventsObject) => {
        let eventsArr = [];
          eventsObject.forEach(event => {
            const eventSplit = event.location
            console.log(eventSplit)
            eventsArr.push(eventSplit);
          })
          return Promise.all( eventsArr.map(event => axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&countryCode=CA&postalCode=${event}`)
            .then(({data})=> data))
          )
            .then((coordinates) => {
              for(let y = 0; y < coordinates.length; y++) {
                console.log("hello")
                if (y !== coordinates.length - 1) {
                  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv`)
                    .then((result) => {
                      const travelMileageObj = {};
                      travelMileageObj["mileage"] = result.data.routes[0].summary.lengthInMeters;
                      travelMileageObj["traveltime"] = result.data.routes[0].summary.travelTimeInSeconds;
                      console.log("travelMileageObj", travelMileageObj)
                      setEvents(eventsObject);
                      setRoutes(prevState => ([...prevState, travelMileageObj]));
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
              }
            })



      })



    })
  })
}

return { routes, events, inputDate, handleSearchInput, handleSubmit}
};
