import Wallet from './utility/Wallet';
import StockHolding from './utility/stockholdings';

class TransactionHistory {
  constructor(uID, transHistory) {
    this.uID = uID;
    this.transHistory = transHistory;
  }

  get uID() {
    return this.uID();
  }

  get transHistory() {
    return this.transHistory();
  }

  addTransaction(stockName, count, type, value) {
    var successfulTransaction = updateWallet(this.uID, type, value) &&
        updateStockCount(uID, type, count, stockName);

    if !(successfulTransaction) {
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
    writeToDB();
    return true;
  }

  getToday() {
    var currentDate = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
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

function getTransactionHistory(uID) {
  /*
  grab shit from database
  return some sort of array 'transHistory'
  */

  var transactions = [];
  for (var i = 0; i < transHistory.length; i++) {
      var transaction = {
        stockName: transHistory[i]['stockName'],
        count: transHistory[i]['count'],
        date: transHistory[i]['date'],
        value: transHistory[i]['value'],
        type: transHistory[i]['type']
      }
      transactions.push(transaction);
  }
  const history = new TransactionHistory(uID, transactions);
  return history;
}
