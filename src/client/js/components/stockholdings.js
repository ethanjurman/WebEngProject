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
    request({
          url: `holdings/write/${this.uID}/${this.stocks}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          //callback(body);
    });
    return false;
  }
}

export function getStockHoldings(uID, callback) {
  request({
        url: `holdings/${uID}`,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        const stockHolding = new StockHolding(uID, JSON.parse(body));
        callback(stockHolding);
  });
}
