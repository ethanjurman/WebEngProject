import express from 'express'; // need to server files and handle requests
import bodyParser from 'body-parser'; // handle json structure
import cors from 'cors';
import request from 'ajax-request';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// host client files as static files
app.use(express.static(__dirname + '/client'));

/*
  WEATHER API INFORMATION
*/
function getAPIurl(key,lat,lng){
  return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
}

let weatherKey = '';
// read the api key from the file system
import fs from 'fs';
fs.readFile(__dirname + '/weather-key', (err, data) => {
	if (err){
		throw err;
	}
	weatherKey = data.toString().trim();
});

// make api request from server
app.get("/weather/:lat/:lng", (req, res) => {
  const {lat, lng} = req.params;
  request({
    url: getAPIurl(weatherKey, lat, lng),
    method: 'GET',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, (error, response, body) => {
    res.send(JSON.parse(body));
  });
});


app.listen(3000, ()=>{
  console.log("listening on port 3000")
});

export default app;
