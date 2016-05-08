import React, { Component } from 'react';
import request from 'ajax-request';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { Wallet, getWallet } from './wallet';
import { TransactionHistory, getTransactionHistory } from './transactionhistory';
import { StockHolding, getStockHoldings } from './stockholdings';

var Highstock = require('react-highstock');

export default class StockGraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: null,
      wallet: null,
      transactionHistory: null,
      symbol: null,
      stockHoldings: null,
      value: null,
      calcAmount: null
    }
  }

  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    this.makeRequest(this.generateParams(this.props.params.symbol));
    this.updateSymbol(this.props.params.symbol);
    getWallet(0, this.updateWallet.bind(this));
    getTransactionHistory(0, this.updateTransactionHistory.bind(this));
    getStockHoldings(0, this.updateStockHoldings.bind(this));
  }

  generateParams(symbol){
    return {
        Normalized: false,
        NumberOfDays: 365,
        DataPeriod: "Day",
        Elements: [
            {
                Symbol: symbol, //This decides what stock the graph is generated for. Should be a variable, not static.
                                //  Change when you put everything together
                Type: "price",
                Params: ["ohlc"] //ohlc, c = close only
            },
            {
                Symbol: symbol,
                Type: "volume"
            }
        ]
    }
  }

  fixDate(date) {
    var dat = new Date(date);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
  }

  getVolume(stockObj) {
    var dates = stockObj.Dates || [];
    var elements = stockObj.Elements || [];
    var chartSeries = [];

    if (elements[1]){

      for (var i = 0, datLen = dates.length; i < datLen; i++) {
          var dat = this.fixDate( dates[i] );
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
            var dat = this.fixDate( dates[i] );
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
        text: stockObj.Elements[1].Symbol + ' Historical Price'
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
        name: stockObj.Elements[1].Symbol,
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
    const encodedParams = encodeURIComponent(params);
    request({
          url: `stockChart/${encodedParams}`,
          method: 'GET',
        }, (error, response, body) => {
          const stockJson = JSON.parse(body);
          this.setState({
            stockData: this.generateMapConfig(stockJson)
          });
        });
  }

  updateWallet(wallet) {
    this.setState({
      wallet
    });
  }

  updateTransactionHistory(transactionHistory) {
    this.setState({
      transactionHistory
    });
  }

  updateSearch(event) {
    this.updateSymbol(event.target.value);
  };

  updateSymbol(symbol) {
    this.getStockPrice(symbol);
    this.setState({
      symbol
    });
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      this.updateSymbol(event.target.value);
      this.makeRequest(this.generateParams(event.target.value));
    }
  }

  updateStockHoldings(stockHoldings){
    this.setState({
      stockHoldings
    });
  }

  doesOwn(){
    return Object.keys(this.state.stockHoldings.stocks).find((stock)=>{
      return stock == this.state.symbol;
    });
  }

  getStockPrice(nse) {
    request({
          url: `${nse}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const stockJson = JSON.parse(body);
          this.setState({
            value:stockJson.LastPrice
          })
        });
  }

  updateAmount(event){
    this.setState({
      calcAmount: parseInt(event.target.value) * this.state.value
    })
  }

  render() {
    if ( !this.state.stockData ) {
      return (<div>Creating graph...</div>);
    }
    // does user have stuff
    let buysell = this.doesOwn() ? "SELL" : "BUY";
    console.log(this.state.transactionHistory);
    console.log(this.state.stockHoldings);
    return (
      <Paper style={{margin:'10px',padding:'10px'}}>
        FUNDS: { this.state.wallet.getFunds() }
        { /* TRANSACTION HISTORY INFORMATION */ }
        <br />
        <TextField
          hintText="Search"
          onBlur={this.updateSearch.bind(this)}
          onKeyDown={this.keyPress.bind(this)}
        />
        <br />
        <RaisedButton label={buysell} />
        <TextField
          hintText="Amount"
          onChange={this.updateAmount.bind(this)}
        />
        <TextField
          hintText=""
          disabled={true}
          value={this.state.calcAmount}
        />
        {<Highstock config = {this.state.stockData}></Highstock>}
      </Paper>
    )
  }
}
