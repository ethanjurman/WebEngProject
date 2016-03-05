import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/login-page';
import MainPage from './components/main-page';
import { CalendarPage } from './components/calendar';
import StockGraphComponent from './components/stockGraph';
import { Router, Route, Link, browserHistory } from 'react-router'

// no need to mess with this logic unless we want to make more pages,
// or have a store component

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainPage}/>
    <Route path="calendar" component={CalendarPage}/>
    <Route path="stocks/:symbol" component={StockGraphComponent}/>
    <Route path="login" component={LoginPage}/>
  </Router>
), document.getElementById("main"));
