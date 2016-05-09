import React, { Component } from 'react';
import request from 'ajax-request';
import TransactionHistory, {getTransactionHistory} from './transactionhistory';

export default class Transactions extends Component {
  constructor(props) {
    var uID = 10; /*how we getting userID? */
    const transactions = getTransactionHistory(uID);
    super(props);
    this.state = {
      transactions: transactions
    }
  }

  componentDidMount() {
    /* REPLACEME */
  }

  makeTransaction(stock, isBuying, amount) {
    var cost = calculateCost(stock, amount);
    if (isBuying) {
      /* do I have to set state here? */
      this.state.transactions.addTransaction(stock['stockName'], count, "buy", amount);
    } else {
      /* do I have to set state here? */
      this.state.transactions.addTransaction(stock['stockName'], count, "sell", amount);
    }
  }

  calculateCost(stock, amount) {
    var cost = stock['lastPrice'];
    return cost*amount;
  }

  render() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }

}
