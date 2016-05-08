import Wallet, {getWallet} from './wallet';
import StockHolding, {getStockHoldings} from './stockholdings';
import request from 'ajax-request';

export class TransactionHistory {
  constructor(uID, transHistory) {
    this.uID = uID;
    this.transHistory = transHistory;
  }

  addTransaction(stockName, count, type, value) {
    var successfulTransaction = updateWallet(this.uID, type, value) && updateStockCount(uID, type, count, stockName);

    if (!successfulTransaction) {
      return false;
    }

    var currentDate = getToday();
    var transaction = {
      stockName: stockName,
      count: count,
      date: currentDate,
      value: value,
      type: type
    }

    this.transHistory.push(transaction);
    this.writeToDB();
    return true;
  }

  getToday() {
    var currentDate = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    currentDate = mm+'/'+dd+'/'+yyyy;
    return currentDate;
  }

  updateStockCount(uID, type, count, stockName) {
    const stocks = getStockHoldings(uID);

    if (type == "buy") {
      stocks.updateStock(stockName, count, true);
      return true;
    } else if (type == 'sell') {
      stocks.updateStock(stockName, count, false);
      return true;
    }
    return false;
  }

  updateWallet(uID, type, value) {
    const wallet = getWallet(uID);

    if (type == "buy") {
      wallet.removeFunds(value);
      return true;
    } else if (type == 'sell') {
      wallet.addFunds(value);
      return true;
    }
    return false;
  }

  writeToDB() {
    /* REPLACEME */
    return false;
  }
}

export function getTransactionHistory(uID, callback) {
  request({
        url: `transactions/${uID}`,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        var transHistory = JSON.parse(body);
        const history = new TransactionHistory(uID, transHistory);
        callback(history);
      });
}
