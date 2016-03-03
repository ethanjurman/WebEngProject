import React, { Component } from 'react';
import request from 'ajax-request';

var Highstock = require('react-highstock');

export default class StockGraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: null
    }
  }


  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    this.makeRequest(this.generateParams());
  }

  generateParams(){
    return {
        Normalized: false,
        NumberOfDays: 365,
        DataPeriod: "Day",
        Elements: [
            {
                Symbol: "GOOG",
                Type: "price",
                Params: ["ohlc"] //ohlc, c = close only
            },
            {
                Symbol: "GOOG",
                Type: "volume"
            }
        ]
    }
  }

  fixDate(date) {
    var dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
  }

  getVolume(stockObj) {
    var dates = stockObj.Dates || [];
    var elements = stockObj.Elements || [];
    var chartSeries = [];

    if (elements[1]){

      for (var i = 0, datLen = dates.length; i < datLen; i++) {
          var dat = this._fixDate( dates[i] );
          var pointData = [
              dat,
              elements[1].DataSeries['volume'].values[i]
          ];
          chartSeries.push( pointData );
      };
    }
    return chartSeries;
    }

  getOHLC(stockObj) {
    var dates = stockObj.Dates || [];
    var elements = stockObj.Elements || [];
    var chartSeries = [];

    if (elements[0]){

        for (var i = 0, datLen = dates.length; i < datLen; i++) {
            var dat = this._fixDate( dates[i] );
            var pointData = [
                dat,
                elements[0].DataSeries['open'].values[i],
                elements[0].DataSeries['high'].values[i],
                elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
  }

  generateMapConfig(stockObj) {
    var ohlc = this.getOHLC(stockObj);
    var volume = this.getVolume(stockObj);
    console.log("Title: " + stockObj.symbol);

    var groupingUnits = [[
      'week',
      [1]
    ],[
      'month',
      [1,2,3,4,6]
    ]];
    var config = {

      rangeSelector: {
        selected: 1
      },

      title: {
        text: stockObj.symbol + ' Historical Price'
      },

      yAxis: [{
        title: {
          text: 'OHLC'
        },
        height: 200,
        lineWidth: 2
      }, {
        title: {
          text: 'Volume'
        },
        top: 300,
        height: 100,
        offset: 0,
        lineWidth: 2
      }],

      series: [{
        type: 'candlestick',
        name: stockObj.symbol,
        data: ohlc,
        dataGrouping: {
          units: groupingUnits
        }
      }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      }],
      credits: {
        enabled: false
      }

    };

    return config;
  }

  makeRequest(params) {
    params = JSON.stringify(params);
    params = encodeURIComponent(params);
    request({
          url: `stockChart/${params}`,
          method: 'GET',
        }, (error, response, body) => {
          console.log(error);
          console.log(response);
          console.log("body" + body);
          this.setState({
            stockData: this.generateMapConfig(body)
          });
        });
  }

  render() {
    if ( !this.state.stockData ) {
      return <div>Creating graph...</div>
    }
    return (
      <div>
        <Highstock config = {this.state.stockData}></Highstock>
      </div>
    )
  }
}
