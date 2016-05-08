import React, { Component } from 'react';
import request from 'ajax-request';
import { Paper, CardTitle, CardText, FontIcon, FlatButton, TextField } from 'material-ui';

export class WeatherPeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      name: null,
      weather: null,
      zipCode: "14623"
    }
  }

  convertKelvinToFarhenheit(kelvin,sigfigs){
    return ((kelvin - 273.15)*1.8000 + 32).toFixed(sigfigs);
  }

  componentDidMount() {
      this.getWeather();
  }

  getWeather() {
      const zipCode = this.state.zipCode;
      request({
        url: `weather/${zipCode}`,
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
        <TextField
            type="number"
            defaultValue={this.state.zipCode}
            onChange = { (event) => {
                this.setState({
                    zipCode: event.target.value
                });
            }}
        />
        <FlatButton
            label="Search"
            onClick={ ()=>{
                this.getWeather();
            }}
            style={{float: 'right'}}
            secondary={true}
        />

      </Paper>
    )
  }
}

export default WeatherPeek;
