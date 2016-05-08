import React, { Component } from 'react';
import request from 'ajax-request';
import { browserHistory } from 'react-router';
import { Paper, CardTitle, CardText, FontIcon, FlatButton } from 'material-ui';
import { StockHolding, getStockHoldings } from './stockholdings';

export class StockPeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    var uID = 1; //get this somehow
    request({
          url: `stocks/holdings/${uID}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const stockHolding = new StockHolding(uID, body);
          var stocks = stockHolding.getStocks();
          var nseArray = Object.keys(JSON.parse(stocks));
          for (var i = 0; i < nseArray.length || i < 4; i++) {
            console.log(i);
              this.makeRequest(nseArray[i]);
          }
    });
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  makeRequest(nse) {
    request({
          url: `stock/${nse}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const stockJson = JSON.parse(body);
          var stockObj = {
            stockName: stockJson.Name,
            symbol: stockJson.Symbol,
            lastPrice: stockJson.LastPrice,
            dayLow: stockJson.Low,
            dayHigh: stockJson.High,
            dayOpen: stockJson.Open,
            change: stockJson.Change
          };
          this.setStockState(stockObj);
        });
  }

  setStockState(stockObj) {
    this.setState({
      stocks: this.state.stocks.concat(stockObj)
    });
  }

  render() {
    const stocks = this.state.stocks.map((stock)=>{
      return (
        <FlatButton
          key={stock.symbol}
          style={{fontSize:'2em', display:'block'}}
          linkButton={true}
          secondary={true}
          label={`${stock.symbol}: ${stock.lastPrice} (${stock.change.toFixed(2)})`}
          onClick={()=>{browserHistory.push(`/stocks/${stock.symbol}`)}}
        />
      );
    });
    return (
      <Paper style={{margin:'10px'}}>
        { stocks }
        <FlatButton
          label="See Stock Details"
          linkButton={true}
          secondary={true}
          onClick={()=>{}}
          style={{float:'right'}}
        />
        <CardText> from markitondemand.com </CardText>
      </Paper>
    )
  }
}

export default StockPeek;
