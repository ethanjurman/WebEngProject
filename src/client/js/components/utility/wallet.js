class Wallet {
  constructor(uID, funds) {
    this.uID = uID;
    this.funds = funds;
  }

  get uID() {
    return this.uID();
  }

  get funds() {
    return this.funds();
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

getWallet(uID) {
  /*
  grab shit from database
  get funds
  */
  var funds = 100;
  const wallet = new Wallet(uID, funds);
  return wallet;
}
