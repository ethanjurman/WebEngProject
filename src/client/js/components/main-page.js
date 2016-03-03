// main-page.js
import React, { Component } from 'react';
import { WeatherPeek } from './weather';
import { CalendarPeek } from './calendar';
import { browserHistory } from 'react-router';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WeatherPeek history={browserHistory} />
        <CalendarPeek history={browserHistory } />
      </div>
    )
  }
}
