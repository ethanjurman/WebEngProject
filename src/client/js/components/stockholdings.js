import request from 'ajax-request';

export class StockHolding {
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

export function getStockHoldings(uID) {
  var stocks = null;
  request({
        url: `stock/holdings/${uID}`,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        stocks = body;
  });
  const stockHolding = new StockHolding(uID, stocks);
  return stockHolding;
}
