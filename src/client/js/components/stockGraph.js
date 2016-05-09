import React, { Component } from 'react';
import request from 'ajax-request';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { StockHighGraph } from './stockHighGraph';
import { Wallet, getWallet } from './wallet';
import { TransactionHistory, getTransactionHistory } from './transactionhistory';
import { StockHolding, getStockHoldings } from './stockholdings';
import { TransactionTable } from './transactionTable';

const buyingStyling = {
  maxWidth: '30%',
  padding: '4px',
  margin: '4px'
}

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
      amount: null,
      calcAmount: null
    }
  }

  componentDidMount() {
    //Not sure how we're going to pass the stock info here
    this.makeRequest(this.generateParams(this.props.params.symbol));
    this.updateSymbol(this.props.params.symbol);
    getWallet(1, this.updateWallet.bind(this));
    getTransactionHistory(1, this.updateTransactionHistory.bind(this));
    getStockHoldings(1, this.updateStockHoldings.bind(this));
    ga('set', 'page', '/stock');
    ga('send', 'pageview');
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
    if (symbol == "") { return; }
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
    return this.state.stockHoldings.stocks.find((stock)=>{
      return stock.stockName == this.state.symbol;
    });
  }

  updateValue(value){
    this.setState({
      value
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
          this.updateValue(JSON.parse(body).LastPrice);
        });
  }

  updateAmount(event){
    this.setState({
      amount: parseInt(event.target.value),
      calcAmount: parseInt(event.target.value) * this.state.value
    });
  }

  buysellAction(){
     if(this.doesOwn()){
       this.state.wallet.addFunds(this.state.calcAmount);
       this.state.transactionHistory.addTransaction(
         this.state.symbol,
         this.state.amount,
         "ADD",
         this.state.calcAmount
       );
     } else {
       this.state.wallet.removeFunds(this.state.calcAmount);
       this.state.transactionHistory.addTransaction(
         this.state.symbol,
         this.state.amount,
         "REMOVE",
         this.state.calcAmount
       );
     }
  }

  render() {
    if ( !this.state.stockData ) {
      return (<div>Creating graph...</div>);
    }
    // does user have stuff
    let buysell = this.doesOwn() ? "SELL" : "BUY";
    let transactionHistory = this.state.transactionHistory;
    return (
      <Paper style={{margin:'10px',padding:'10px'}}>
        FUNDS: { this.state.wallet.getFunds() }
        <TransactionTable
          transactionHistory={transactionHistory}/>

        <br />
        <TextField
          hintText="Search"
          onBlur={this.updateSearch.bind(this)}
          onKeyDown={this.keyPress.bind(this)}/>
        <br />

        <TextField
          style={buyingStyling}
          hintText="Amount"
          onChange={this.updateAmount.bind(this)}/>
        <TextField
          style={buyingStyling}
          hintText="calculated price"
          disabled={true}
          value={`$ ${this.state.calcAmount}`}/>
        <RaisedButton
          style={buyingStyling}
          label={buysell}
          onClick={this.buysellAction.bind(this)} />

        <StockHighGraph symbol={this.state.symbol} config={this.state.stockData}/>
      </Paper>
    )
  }
}
