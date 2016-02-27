import React, { Component } from 'react';
import request  from 'ajax-request';

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
      lastPrice: stockObj.main.LastPrice.0
      dayLow: stockObj.main.Low.0
      dayHigh: stockObj.main.High.0
      dayOpen: stockObj.main.Open.0
      change: stockObj.main.Change.0
    });
  }

  render() {
    //Not sure relaly how to pass proper HTML into here
    return (
      <div>
        Current Price: {this.state.lastPrice} (this.state.change) //Change to red/green based on pos/neg?
        Daily Low: {this.state.dayLow}
        Daily High: {this.state.dayHigh}
        Open: {this.state.dayOpen}
      </div>
    )
  }
}
