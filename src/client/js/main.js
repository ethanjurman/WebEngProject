import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/main-page';
import { CalendarPage } from './components/calendar';
import { Router, Route, Link, browserHistory } from 'react-router'

// no need to mess with this logic unless we want to make more pages,
// or have a store component

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Router path="/" component={MainPage}>
      <Router path="calendar" component={CalendarPage}/>
    </Router>
  </Router>
), document.getElementById("main"));
