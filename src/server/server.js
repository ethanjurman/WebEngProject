import express from 'express'; // need to server files and handle requests
import bodyParser from 'body-parser'; // handle json structure
import cors from 'cors';
import request from 'ajax-request';
import { getWeatherUrl, getStockChartUrl, getStockUrl } from './apis';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// host client files as static files
app.use(express.static(__dirname + '/client'));

// make api request from server
app.get("/weather/:lat/:lng", (req, res) => {
  const {lat, lng} = req.params;
  request({
    url: getWeatherUrl(lat, lng),
    method: 'GET',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, (error, response, body) => {
    res.send(JSON.parse(body));
  });
});

app.get("/stock/:nse", (req, res) => {
  const {nse} = req.params;
  request({
    url: getStockUrl(nse),
    method: 'GET',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, (error, response, body) => {
    res.send(body);
  });
});


/*
grab shit from database
return some sort of array 'transHistory'
that is formatted like
transhistory[0] = {
  stockName: name,
  count: count,
  date: date,
  value: value,
  type: type
}
*/
app.get("/stock/transactions/:uid", (req, res) => {
  console.log(req.params);
  var transacton = {
    stockName: "MSFT",
    count: 10,
    date: 101,
    value: 666,
    type: "sell"
  };
  var transhistory = []
  transhistory[0] = transacton;
  console.log(transhistory);
  res.send(transhistory);
});

// I'm no JS wizard but what we want to do is dybamically create a
// stockobject/array that is in format:
// var stocks = {
//   stockName0: count,
//   stockName1: count,
//   etc...
// }
app.get("/stock/holdings/:uid", (req, res) => {
var stocks = {
  MSFT: 100,
  AAPL: 22
}
res.send(stocks);
});

/*
grab shit from database
get funds
*/
app.get("/stock/wallet/:uid", (req, res) => {
res.send(100000);
});

app.get("/stocks/stockChart/:params", (req, res) => {
  request({
    url: getStockChartUrl(req.params.params),
    method: 'GET',
  }, (error, response, body) => {
    res.send(body);
  });
});

app.use((req, res, next)=>{
  res.redirect('/');
});


app.listen(3000, ()=>{
  console.log("listening on port 3000")
});

export default app;
