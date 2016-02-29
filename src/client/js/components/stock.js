import React, { Component } from 'react';
import request from 'ajax-request';

export default class StockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPrice: null,
      dayLow: null,
      dayHigh: null,
      dayOpen: null,
      change: null
    }
  }

  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    var nse = "GOOG";
    stockObj = this.makeRequest(nse);
    setStockState(stockObj);
  }

  makeRequest(nse) {
    request({
          url: `stock/${nse}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const stockObj = JSON.parse(body);
          return stockObj
        });
  }

  setStockState(stockObj) {
    this.setState({
      lastPrice:stockObj.main.LastPrice,
      dayLow:stockObj.main.Low,
      dayHigh:stockObj.main.High,
      dayOpen:stockObj.main.Open,
      change:stockObj.main.Change
    });
  }

  render() {
    //Not sure relaly how to pass proper HTML into here
    return (
      <div>
        Current Price: {this.state.lastPrice} (this.state.change) //Change to red/green based on pos/neg?
        //Daily Low: {this.state.dayLow}
        //Daily High: {this.state.dayHigh}
        //Open: {this.state.dayOpen}
      </div>
    )
  }
}
