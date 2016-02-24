import fs from 'fs';

let weatherKey;
fs.readFile(__dirname + '/weather-key', (err, data) => {
  if (err){
    const error = "No weather-key provided. Please have weather-key in the keys folder";
    throw error;
  }
  weatherKey = data.toString().trim();
});

export function getWeatherUrl(lat, lng){
  return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}`;
}
