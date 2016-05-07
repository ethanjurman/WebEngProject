import request from 'ajax-request';

export class Wallet {
  constructor(uID, funds) {
    this.uID = uID;
    this.funds = funds;
  }

  get uID() {
    return this.uID;
  }

  get funds() {
    return this.funds;
  }

  addFunds(funds) {
    this.funds += funds;
    writeToDB();
  }

  removeFunds(funds) {
    this.funds -= funds;
    writeToDB();
  }

  writeToDB() {
    /* REPLACEME */
    return false;
  }
}

export function getWallet(uID) {
  var funds = null;
  request({
        url: `stock/wallet/${uID}`,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        funds = body;
  });
  const wallet = new Wallet(uID, funds);
  return wallet;
}
