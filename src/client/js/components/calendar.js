import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Paper, CardTitle, CardText, FontIcon, FlatButton } from 'material-ui';

BigCalendar.momentLocalizer(moment);

export class CalendarPeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      month: null
    }
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
          onClick={()=>{this.props.history.push("/calendar")}}
          style={{float:'right'}}
        />
        <CardText> for {this.state.month} </CardText>

      </Paper>
    )
  }
}

export default class CalendarPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height:'300px'}}>
        <BigCalendar
          events={[]}
          startAccessor='startDate'
          endAccessor='endDate'
        />
      </div>
    )
  }
}
