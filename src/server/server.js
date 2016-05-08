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
app.get("/weather/:zip", (req, res) => {
  const {zip} = req.params;
  request({
    url: getWeatherUrl(zip),
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
