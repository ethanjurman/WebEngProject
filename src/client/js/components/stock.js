import React, { Component } from 'react';
import request from 'ajax-request';

export default class StockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    var nseArray = ["GOOG", "AAPL", "YHOO", "AMZN", "MSFT"];
    for (var i = 0; i < nseArray.length; i++) {
        this.makeRequest(nseArray[i]);
    }
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
    var stocks = this.state.stocks;
    stocks.push(stockObj);
    this.setState({
      stocks: stocks
    });
  }

  render() {
    //Do what you need to make it look nice
    //It might be wise to hide this until all calls have been made because the
    //  user might see it build from 1 to 5 elements in like half a second and
    //  that would be awkward. 
    return (
      <div>
        :REPLACEME:
      </div>
    )
  }
}
