import React, { Component } from 'react';
import request from 'ajax-request';
import { Paper, CardTitle, CardText, FontIcon, FlatButton } from 'material-ui';

export class WeatherPeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      name: null,
      weather: null
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
            temp:this.convertKelvinToFarhenheit(weatherObj.main.temp,0),
            name: weatherObj.name,
            weather: weatherObj.weather[0].description
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
      <Paper style={{margin:'10px'}}>
        <CardTitle style={{fontSize: '2.5em', float:'right'}}> {this.state.temp}°F </CardTitle>
        <CardTitle style={{fontSize: '2.5em'}}> {this.state.weather} </CardTitle>
        <FlatButton
          label="See Weather Details"
          linkButton={true}
          secondary={true}
          onClick={()=>{}}
          style={{float:'right'}}
        />
        <CardText> from {this.state.name} </CardText>

      </Paper>
    )
  }
}

export default WeatherPeek;
