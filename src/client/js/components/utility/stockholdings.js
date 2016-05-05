class StockHolding {
  constructor(uID, stocks) {
    this.uID = uID;
    this.stocks = stocks;
  }

  get uID() {
    return this.uID;
  }

  get stocks() {
    return this.stocks;
  }

  updateStock(stockName, count, isAdding) {
    for( var name in this.stocks ) {
       if( typeof this.stocks[name] === 'stockName' ){
           if (isAdding) {
             this.stocks[name] += count;
           } else {
             this.stocks[name] -= count;
           }
           writeToDB();
           return;
       }
    }
    if (isAdding) {
      this.stocks[name] += count;
    } else {
      this.stocks[name] -= count;
    }
    writeToDB();
  }

  writeToDB() {
    /* REPLACEME */
    return false;
  }
}

function getStockHoldings(uID) {
  /*
  grab shit from database
  get funds
  */
  // I'm no JS wizard but what we want to do is dybamically create a
  // stockobject that is in format:
  // var stocks = {
  //   stockName0: count,
  //   stockName1: count,
  //   etc...
  // }
  const stockHolding = new StockHolding(uID, stocks);
  return stockHolding;
}
