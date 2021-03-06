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

app.get("/stocks/:nse", (req, res) => {
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


app.get("/stocks/transactions/:uid", (req, res) => {
  const {uid} =  req.params
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  connection.connect();
  connection.query('SELECT * FROM `transactions` WHERE `userId` = ?', [uid], function (err, rows, fields) {
    if (err) throw err;
    //res.send(rows[0].solution);
    var transactions = [];
    for (var i = 0; i < rows.length; i++) {
      transactions[i] = {
        stockName: rows[i]["name"],
        count: rows[i]["count"],
        date: rows[i]["date"],
        value: rows[i]["value"],
        type: rows[i]["type"]
      };
    }
    console.log('transactions: ', transactions);
    res.send(transactions);
  });

  connection.end();
});

app.get("/stocks/holdings/:uid", (req, res) => {
  const {uid} =  req.params
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  connection.connect();

  connection.query('SELECT * FROM `holdings` WHERE `userId` = ?', [uid], function (err, rows, fields) {
    if (err) throw err;
    var holdings = [];

    for(var i = 0; i < rows.length; i++) {
      var item = {
          "stockName": rows[i].stockName,
          "amount": rows[i].amount
      };
      holdings.push(item);
    }

    res.send(holdings);
    console.log('Rows: ', rows);
    console.log('Row TEST: ', rows[0].stockName);
    console.log('History: ', holdings);
  });

  connection.end();
});

/*
grab shit from database
get funds
*/
app.get("/stocks/wallet/:uid", (req, res) => {
  const {uid} =  req.params
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  connection.connect();

  connection.query('SELECT * FROM `users` WHERE `userId` = ?', [uid], function (err, rows, fields) {
    if (err) throw err;
    res.send(rows[0].funds.toString());
    console.log('funds: ', rows[0].funds);
  });

  connection.end();
});

app.get("/stocks/wallet/write/:uid/:funds", (req, res) => {
  const {uid, funds} = req.params;

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  connection.connect();

  connection.query('UPDATE `users` SET `funds` ? WHERE `userId` = ?', [funds, uid], function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
  });

  connection.end();

});

app.get("/stocks/holdings/write/:uid/:holdings", (req, res) => {
  const {uid, holdings} = req.params;

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  // CHECK IF THEY DO OR DONT HAVE THE STOCK
  connection.connect();
  for (var i = 0; i < holdings.length; i++) {
    connection.query('UPDATE `holdings` SET `stockName` ?, `count` ? WHERE `userId` = ?', [Object.keys(holdings)[i], Object.values(holdings)[i], uid], function(err, rows, fields) {
      if (err) throw err;
    });
  }


  connection.end();


  res.send(true);
});

app.get("/stocks/transactions/write/:uid/:transactions", (req, res) => {
  const {uid, transactions} = req.params;

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'iePohthad3',
    database : 'comicsans'
  });

  connection.connect();

  for (var i = 0; i < holdings.length; i++) {
    connection.query('INSERT INTO `transactions` VALUES (?, ?, ?,  ?, ?, ?)',  [transactions[i]["stockName"], transactions[i]["value"], transactions[i]["date"],
        transactions[i]["userId"], transactions[i]["count"], transactions[i]["type"]], function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });
  }

  connection.end();


  res.send(true);
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
