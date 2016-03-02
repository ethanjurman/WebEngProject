// main-page.js
import React, { Component } from 'react';
import List from './list';
import WeatherComponent from './weather';
import StockComponent from './stock';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    // this component has state text
    this.state = {
      text:""
    }
  }

  componentDidMount() {
    // gets called once when the component is properly loaded on the page

    // to change state of this instance, call this.setState({stateKey:stateValue})
    this.setState({text:"Hello World"});
  }

  render() {
    return (
      <div>
        <div className="title">
          {/*
            This is a section of javascript code executed on render
            which gets updated on when the state and props get updated
          */}
          {this.state.text}
        </div>
        <List array={["Weather","Chat","Stocks","Facebook"]} title="The List:"/>
        <StockComponent />
        <WeatherComponent />
      </div>
    )
  }
}
