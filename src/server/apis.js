import fs from 'fs';

let weatherKey;
fs.readFile(__dirname + '/weather-key', (err, data) => {
  if (err){
    const error = "No weather-key provided. Please have weather-key in the keys folder, with the correct key string";
    throw error;
  }
  weatherKey = data.toString().trim();
});

export function getWeatherUrl(lat, lng) {
  return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}`;
}

export function getStockChartUrl(params) {
  return `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${params}`;
}

export function getStockUrl(nse) {
  return `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${nse}`;
}
