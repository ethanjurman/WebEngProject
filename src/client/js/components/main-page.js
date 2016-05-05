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

  componentDidMount() {

      window.fbAsynchInit = () => {
          FB.init({
              appId: '902633069835365',
              xfbml: true,
              version: 'v2.5',
          });
      };

      // Load the SDK asynchronously
      ((d, s, id) => {
          const element = d.getElementsByTagName(s)[0];
          const fjs = element;
          let js = element;
          if(d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=902633069835365";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebood-jssdk'));


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
