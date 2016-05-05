import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { Paper, CardTitle, CardText, FontIcon, FlatButton, RaisedButton } from 'material-ui';
import { AddEvent } from './add-event';

BigCalendar.momentLocalizer(moment);

export class CalendarPeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      month: null
    }
  }

  contextTypes: {
    router: React.PropTypes.func
  }

  getDatePostfix(date) {
    let postfix = 'th';
    if ((date % 10 == 1) && (date !== 11)) {
      postfix = "st";
    }
    else if (date % 10 == 2) {
      postfix = "nd";
    }
    else if (date % 10 == 3) {
      postfix = "rd";
    }
    return (<span>{date}<sup>{postfix}</sup></span>);

  }

  componentDidMount() {
    const dateObj = new Date;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.setState({
      date: this.getDatePostfix(dateObj.getDate()),
      month: months[dateObj.getMonth()]
    });
  }

  render() {
    return (
      <Paper style={{margin:'10px'}}>
        <CardTitle style={{fontSize: '2em', float:'right'}}> {this.state.month} {this.state.date} </CardTitle>
        <CardTitle style={{fontSize: '2.5em', marginBottom:'10px'}}> No Events </CardTitle>
        <FlatButton
          label="See Calendar Details"
          linkButton={true}
          secondary={true}
          onClick={()=>{browserHistory.push('/calendar')}}
          style={{float:'right'}}
        />
        <CardText> for {this.state.month} </CardText>

      </Paper>
    )
  }
}

export class CalendarPage extends Component {
  constructor(props) {
    super(props);

    const date = new Date();

    this.state = {
      addEvent: false,
      events: []
    };
  }

  addEventObject(eventObject) {
    this.setState({ events: this.state.events.concat(eventObject) });
  }

  toggleDialog() {
    this.setState({addEvent: !this.state.addEvent});
  }

  render() {
    return (
      <Paper style={{height:'800px', padding:'10px', margin:'10px'}}>
        <FlatButton
          label="Back to Home"
          linkButton={true}
          secondary={true}
          onClick={()=>{browserHistory.push('/')}}
        />
        <RaisedButton
          label="Add Event"
          secondary={true}
          onClick={this.toggleDialog.bind(this)}
        />
        <BigCalendar
          events={this.state.events}
        />
        <AddEvent
          open={this.state.addEvent}
          toggleDialog={this.toggleDialog.bind(this)}
          addEventObject={this.addEventObject.bind(this)}/>
      </Paper>
    )
  }
}

export default CalendarPeek;
