import React, { Component } from 'react';
import request  from 'ajax-request';

export default class StockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  componentDidMount() {

    request({
          url: `stock/${nse}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const stockObj = JSON.parse(body);
          this.setState({
            value: {nse}
          });
        });
    }

    jsonToStockArray(stockObj) {
      //
      return null;
    }

    render() {
      return (
        //loop here?
        <div>
          Your stock price is: {this.state.value}
        </div>
      )
    }
}
