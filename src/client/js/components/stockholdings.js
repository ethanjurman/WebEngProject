import request from 'ajax-request';

export class StockHolding {
  constructor(uID, stocks) {
    this.uID = uID;
    this.stocks = stocks;
  }

  getStocks() {
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
  request({
        url: `stock/holdings/${uID}`,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        const stockHolding = new StockHolding(uID, body);
        return stockHolding;
  });
}
