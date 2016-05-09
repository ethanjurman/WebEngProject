//AddEvent.js
import React, {Component} from 'react';
import Highstock from 'react-highstock';


export class StockHighGraph extends Component{

    shouldComponentUpdate(nextProps, nextState){
      return (nextProps.symbol != this.props.symbol) || (nextProps.config != this.props.config);
    }

    render() {
      return(<Highstock config={this.props.config}></Highstock>);
    }
}
