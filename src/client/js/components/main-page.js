// main-page.js
import React, { Component } from 'react';
import { WeatherPeek } from './weather';
import { CalendarPeek } from './calendar';
import { StockPeek } from './stock';
import { LoginModal } from './login-modal';
import StockGraphComponent from './stockGraph';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WeatherPeek />
        <CalendarPeek />
        <StockPeek />
        <LoginModal />
      </div>
    )
  }
}
