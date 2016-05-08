import request from 'ajax-request';

export class Wallet {
  constructor(uID, funds) {
    this.uID = uID;
    this.funds = funds;
  }

  addFunds(funds) {
    this.funds += funds;
    writeToDB();
  }

  removeFunds(funds) {
    this.funds -= funds;
    writeToDB();
  }

  getFunds() {
    return this.funds;
  }

  writeToDB() {
    request({
          url: `wallet/write/${this.uID}/${this.funds}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          //IDK
    });
    return false;
  }
}

export function getWallet(uID, callback) {
  var funds = null;
  request({
        url: 'wallet/'+uID,
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, (error, response, body) => {
        funds = body;
        const wallet = new Wallet(uID, funds);
        callback(wallet);
  });

}
