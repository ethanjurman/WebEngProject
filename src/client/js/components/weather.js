import React, { Component } from 'react';
import request from 'ajax-request';

export default class WeatherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    }
  }

  convertKelvinToFarhenheit(kelvin,sigfigs){
    return ((kelvin - 273.15)*1.8000 + 32).toFixed(sigfigs);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        const lat = result.coords.latitude;
        const lng = result.coords.longitude;

        request({
          url: `weather/${lat}/${lng}`,
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }, (error, response, body) => {
          const weatherObj = JSON.parse(body);
          this.setState({
            temp:this.convertKelvinToFarhenheit(weatherObj.main.temp,0)
          });
        });

      },
      (error)=>{
        console.error("could not get the geolocation of client machine");
      }
    );
  }

  render() {
    return (
      <div>
        The temperture outside is: {this.state.temp}°F!
      </div>
    )
  }
}
